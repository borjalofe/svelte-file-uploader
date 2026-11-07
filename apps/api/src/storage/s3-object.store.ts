import {
	DeleteObjectCommand,
	GetObjectCommand,
	HeadObjectCommand,
	PutObjectCommand,
	S3Client,
	type S3ClientConfig
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { Readable } from 'node:stream';
import type { ResourceFileMimeType } from '@pack-challenge/domain';
import type { FileStore, OpenedObject, StoredObject } from './file-store.js';
import { buildResourceObjectKey } from './object-key.js';

export type S3ObjectStoreOptions = {
	bucket: string;
	region: string;
	/** Optional prefix inside the bucket (least-privilege scope). No leading slash. */
	prefix?: string;
	endpoint?: string;
	forcePathStyle?: boolean;
	accessKeyId?: string;
	secretAccessKey?: string;
	/** Injected for tests; production builds a real client. */
	client?: S3Client;
};

/**
 * S3-compatible object store (AWS S3, MinIO, R2, …).
 * Private objects only — never sets a public ACL.
 */
@Injectable()
export class S3ObjectStore implements FileStore {
	private readonly logger = new Logger(S3ObjectStore.name);
	private readonly client: S3Client;
	private readonly bucket: string;
	private readonly prefix: string;

	constructor(options: S3ObjectStoreOptions) {
		this.bucket = options.bucket;
		this.prefix = normalizePrefix(options.prefix);
		this.client =
			options.client ??
			new S3Client(buildClientConfig(options));
	}

	async writeResourceFile(
		mimeType: ResourceFileMimeType,
		bytes: Buffer
	): Promise<StoredObject> {
		const storagePath = buildResourceObjectKey(mimeType);
		const key = this.toObjectKey(storagePath);
		if (!key) {
			throw new Error('Refusing to write an unsafe object key');
		}

		await this.client.send(
			new PutObjectCommand({
				Bucket: this.bucket,
				Key: key,
				Body: bytes,
				ContentType: mimeType
				// No ACL — bucket default (private). Never public-read.
			})
		);
		return { storagePath };
	}

	async exists(storagePath: string): Promise<boolean> {
		const key = this.toObjectKey(storagePath);
		if (!key) {
			return false;
		}
		try {
			await this.client.send(
				new HeadObjectCommand({ Bucket: this.bucket, Key: key })
			);
			return true;
		} catch {
			return false;
		}
	}

	async openReadStream(storagePath: string): Promise<OpenedObject | null> {
		const key = this.toObjectKey(storagePath);
		if (!key) {
			return null;
		}
		try {
			const result = await this.client.send(
				new GetObjectCommand({ Bucket: this.bucket, Key: key })
			);
			const body = result.Body;
			if (!body) {
				return null;
			}
			return { stream: bodyToReadable(body) };
		} catch (error) {
			this.logger.debug(
				`S3 get failed for key=${key}: ${error instanceof Error ? error.message : String(error)}`
			);
			return null;
		}
	}

	async delete(storagePath: string): Promise<void> {
		const key = this.toObjectKey(storagePath);
		if (!key) {
			return;
		}
		await this.client
			.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }))
			.catch(() => undefined);
	}

	/** Map a relative storagePath to a bucket key under the optional prefix. */
	toObjectKey(storagePath: string): string | null {
		const trimmed = storagePath.trim();
		if (!trimmed || trimmed.startsWith('/') || trimmed.includes('\\')) {
			return null;
		}
		if (trimmed.split('/').some((segment) => segment === '' || segment === '..')) {
			return null;
		}
		return this.prefix ? `${this.prefix}${trimmed}` : trimmed;
	}
}

function normalizePrefix(prefix: string | undefined): string {
	if (!prefix?.trim()) {
		return '';
	}
	const cleaned = prefix.trim().replace(/^\/+/, '').replace(/\/+$/, '');
	return cleaned ? `${cleaned}/` : '';
}

function buildClientConfig(options: S3ObjectStoreOptions): S3ClientConfig {
	const config: S3ClientConfig = {
		region: options.region
	};
	if (options.endpoint) {
		config.endpoint = options.endpoint;
	}
	if (options.forcePathStyle) {
		config.forcePathStyle = true;
	}
	if (options.accessKeyId && options.secretAccessKey) {
		config.credentials = {
			accessKeyId: options.accessKeyId,
			secretAccessKey: options.secretAccessKey
		};
	}
	return config;
}

function bodyToReadable(body: unknown): Readable {
	if (body instanceof Readable) {
		return body;
	}
	if (body && typeof body === 'object' && Symbol.asyncIterator in body) {
		return Readable.from(body as AsyncIterable<Uint8Array>);
	}
	// AWS SDK v3 may expose transformToByteArray on SdkStreamMixin.
	if (
		body &&
		typeof body === 'object' &&
		'transformToByteArray' in body &&
		typeof (body as { transformToByteArray: () => Promise<Uint8Array> }).transformToByteArray ===
			'function'
	) {
		const transform = (
			body as { transformToByteArray: () => Promise<Uint8Array> }
		).transformToByteArray;
		return Readable.from(
			(async function* () {
				yield Buffer.from(await transform());
			})()
		);
	}
	throw new Error('Unsupported S3 Body stream type');
}
