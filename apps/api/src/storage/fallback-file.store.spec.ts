import { Readable } from 'node:stream';
import { describe, expect, it, vi } from 'vitest';
import type { FileStore } from './file-store.js';
import { FallbackFileStore } from './fallback-file.store.js';

function stubStore(overrides: Partial<FileStore> = {}): FileStore {
	return {
		writeResourceFile: vi.fn(async () => ({ storagePath: 'resources/primary.pdf' })),
		exists: vi.fn(async () => false),
		openReadStream: vi.fn(async () => null),
		delete: vi.fn(async () => undefined),
		...overrides
	};
}

describe('FallbackFileStore (#84)', () => {
	it('uses primary when write succeeds', async () => {
		const primary = stubStore({
			writeResourceFile: vi.fn(async () => ({ storagePath: 'resources/cloud.pdf' }))
		});
		const secondary = stubStore();
		const store = new FallbackFileStore(primary, secondary);

		const stored = await store.writeResourceFile(
			'application/pdf',
			Buffer.from('%PDF')
		);
		expect(stored.storagePath).toBe('resources/cloud.pdf');
		expect(secondary.writeResourceFile).not.toHaveBeenCalled();
	});

	it('falls back to secondary when primary write fails', async () => {
		const primary = stubStore({
			writeResourceFile: vi.fn(async () => {
				throw new Error('S3 unavailable');
			})
		});
		const secondary = stubStore({
			writeResourceFile: vi.fn(async () => ({ storagePath: 'resources/local.pdf' }))
		});
		const store = new FallbackFileStore(primary, secondary);

		const stored = await store.writeResourceFile(
			'application/pdf',
			Buffer.from('%PDF')
		);
		expect(stored.storagePath).toBe('resources/local.pdf');
		expect(secondary.writeResourceFile).toHaveBeenCalledOnce();
	});

	it('reads from secondary when primary misses', async () => {
		const primary = stubStore({
			openReadStream: vi.fn(async () => null)
		});
		const secondary = stubStore({
			openReadStream: vi.fn(async () => ({
				stream: Readable.from([Buffer.from('local-bytes')])
			}))
		});
		const store = new FallbackFileStore(primary, secondary);

		const opened = await store.openReadStream('resources/x.pdf');
		expect(opened).not.toBeNull();
		expect(secondary.openReadStream).toHaveBeenCalledOnce();
	});
});
