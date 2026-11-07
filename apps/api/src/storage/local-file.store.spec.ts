import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { LocalFileStore } from './local-file.store.js';

describe('LocalFileStore (#69)', () => {
	let root: string;

	afterEach(async () => {
		if (root) {
			await rm(root, { recursive: true, force: true });
		}
	});

	it('writes bytes under the storage root with a random object key', async () => {
		root = await mkdtemp(path.join(os.tmpdir(), 'pack-files-'));
		const store = new LocalFileStore(root);
		const bytes = Buffer.from('%PDF-1.4 test');
		const stored = await store.writeResourceFile('application/pdf', bytes);

		expect(stored.storagePath.startsWith('resources/')).toBe(true);
		expect(stored.absolutePath.startsWith(root)).toBe(true);
		expect(await readFile(stored.absolutePath)).toEqual(bytes);
		expect(await store.exists(stored.storagePath)).toBe(true);
	});
});
