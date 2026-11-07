import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import type { ApiEnv } from '../config/env.js';
import { createFileStore } from './create-file-store.js';
import { FallbackFileStore } from './fallback-file.store.js';
import { LocalFileStore } from './local-file.store.js';

describe('createFileStore (#84)', () => {
	let root: string;

	afterEach(async () => {
		if (root) {
			await rm(root, { recursive: true, force: true });
		}
	});

	async function baseEnv(overrides: Partial<ApiEnv> = {}): Promise<ApiEnv> {
		root = await mkdtemp(path.join(os.tmpdir(), 'pack-create-store-'));
		return {
			nodeEnv: 'test',
			apiPort: 3000,
			databaseUrl: undefined,
			fileStorageRoot: root,
			fileStorageDriver: 'local',
			s3: undefined,
			...overrides
		};
	}

	it('defaults to LocalFileStore', async () => {
		const store = createFileStore(await baseEnv());
		expect(store).toBeInstanceOf(LocalFileStore);
	});

	it('falls back to local when s3 driver lacks credentials', async () => {
		const store = createFileStore(
			await baseEnv({ fileStorageDriver: 's3', s3: undefined })
		);
		expect(store).toBeInstanceOf(LocalFileStore);
	});

	it('wraps S3 + local in FallbackFileStore when s3 is complete', async () => {
		const store = createFileStore(
			await baseEnv({
				fileStorageDriver: 's3',
				s3: {
					bucket: 'pack-uploads',
					region: 'eu-west-1',
					prefix: 'dev/',
					endpoint: undefined,
					forcePathStyle: false,
					accessKeyId: 'AKIA_TEST',
					secretAccessKey: 'secret_test'
				}
			})
		);
		expect(store).toBeInstanceOf(FallbackFileStore);
	});
});
