import { Injectable } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { access, mkdir, writeFile } from 'node:fs/promises';
import type { ReadStream } from 'node:fs';
import path from 'node:path';
import type { ResourceFileMimeType } from '@pack-challenge/domain';
import { buildResourceObjectKey, resolveStoragePath } from './object-key.js';

export type StoredObject = {
	/** Relative key persisted as `storagePath` (e.g. `resources/<uuid>.pdf`). */
	storagePath: string;
	absolutePath: string;
};

export type OpenedObject = {
	absolutePath: string;
	stream: ReadStream;
};

@Injectable()
export class LocalFileStore {
	constructor(private readonly root: string) {}

	getRoot(): string {
		return this.root;
	}

	async writeResourceFile(
		mimeType: ResourceFileMimeType,
		bytes: Buffer
	): Promise<StoredObject> {
		const storagePath = buildResourceObjectKey(mimeType);
		const absolutePath = resolveStoragePath(this.root, storagePath);
		if (!absolutePath) {
			throw new Error('Refusing to write outside the file storage root');
		}

		await mkdir(path.dirname(absolutePath), { recursive: true });
		await writeFile(absolutePath, bytes, { flag: 'wx' });
		return { storagePath, absolutePath };
	}

	async exists(storagePath: string): Promise<boolean> {
		const absolutePath = resolveStoragePath(this.root, storagePath);
		if (!absolutePath) {
			return false;
		}
		try {
			await access(absolutePath);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Open a stored object for reading. Returns `null` when the key is unsafe
	 * (traversal / absolute) or the file is missing — fail closed.
	 */
	async openReadStream(storagePath: string): Promise<OpenedObject | null> {
		const absolutePath = resolveStoragePath(this.root, storagePath);
		if (!absolutePath) {
			return null;
		}
		try {
			await access(absolutePath);
		} catch {
			return null;
		}
		return { absolutePath, stream: createReadStream(absolutePath) };
	}
}
