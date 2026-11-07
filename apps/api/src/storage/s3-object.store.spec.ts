import { Readable } from 'node:stream';
import { describe, expect, it, vi } from 'vitest';
import { S3ObjectStore } from './s3-object.store.js';

function mockClient(handlers: {
	put?: (input: unknown) => Promise<unknown>;
	head?: (input: unknown) => Promise<unknown>;
	get?: (input: unknown) => Promise<unknown>;
	del?: (input: unknown) => Promise<unknown>;
}) {
	return {
		send: vi.fn(async (command: { constructor: { name: string }; input: unknown }) => {
			const name = command.constructor.name;
			if (name === 'PutObjectCommand') {
				return handlers.put?.(command.input) ?? {};
			}
			if (name === 'HeadObjectCommand') {
				return handlers.head?.(command.input) ?? {};
			}
			if (name === 'GetObjectCommand') {
				return handlers.get?.(command.input) ?? { Body: Readable.from([Buffer.from('x')]) };
			}
			if (name === 'DeleteObjectCommand') {
				return handlers.del?.(command.input) ?? {};
			}
			throw new Error(`unexpected command ${name}`);
		})
	};
}

describe('S3ObjectStore (#84)', () => {
	it('puts private objects under the configured prefix', async () => {
		const puts: Array<{
			Bucket?: string;
			Key?: string;
			ContentType?: string;
			ACL?: string;
		}> = [];
		const client = mockClient({
			put: async (input) => {
				puts.push(input as (typeof puts)[number]);
				return {};
			}
		});
		const store = new S3ObjectStore({
			bucket: 'pack-uploads',
			region: 'eu-west-1',
			prefix: 'app/',
			// @ts-expect-error test double
			client
		});

		const stored = await store.writeResourceFile(
			'application/pdf',
			Buffer.from('%PDF-1.4 cloud')
		);

		expect(stored.storagePath).toMatch(/^resources\/.+\.pdf$/);
		expect(puts).toHaveLength(1);
		expect(puts[0]?.Bucket).toBe('pack-uploads');
		expect(puts[0]?.Key).toBe(`app/${stored.storagePath}`);
		expect(puts[0]?.ContentType).toBe('application/pdf');
		expect(puts[0]?.ACL).toBeUndefined();
	});

	it('rejects traversal keys on read/exists', async () => {
		const client = mockClient({});
		const store = new S3ObjectStore({
			bucket: 'pack-uploads',
			region: 'us-east-1',
			// @ts-expect-error test double
			client
		});

		expect(await store.exists('../etc/passwd')).toBe(false);
		expect(await store.openReadStream('/absolute')).toBeNull();
		expect(client.send).not.toHaveBeenCalled();
	});

	it('streams GetObject body when present', async () => {
		const body = Buffer.from('hello-s3');
		const client = mockClient({
			get: async () => ({ Body: Readable.from([body]) })
		});
		const store = new S3ObjectStore({
			bucket: 'pack-uploads',
			region: 'us-east-1',
			// @ts-expect-error test double
			client
		});

		const opened = await store.openReadStream('resources/ok.pdf');
		expect(opened).not.toBeNull();
		const chunks: Buffer[] = [];
		for await (const chunk of opened!.stream) {
			chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
		}
		expect(Buffer.concat(chunks).toString('utf8')).toBe('hello-s3');
	});
});
