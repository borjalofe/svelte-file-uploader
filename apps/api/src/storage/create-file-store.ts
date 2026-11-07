import { Logger } from '@nestjs/common';
import type { ApiEnv } from '../config/env.js';
import type { FileStore } from './file-store.js';
import { FallbackFileStore } from './fallback-file.store.js';
import { LocalFileStore } from './local-file.store.js';
import { S3ObjectStore } from './s3-object.store.js';

const logger = new Logger('createFileStore');

/**
 * Build the process FileStore from env.
 * - `local` (default): filesystem under FILE_STORAGE_ROOT
 * - `s3` with complete credentials: S3 primary + local fallback
 * - `s3` with incomplete credentials: local only (documented fallback)
 */
export function createFileStore(env: ApiEnv): FileStore {
	const local = new LocalFileStore(env.fileStorageRoot);

	if (env.fileStorageDriver !== 's3') {
		return local;
	}

	if (!env.s3) {
		logger.warn(
			'FILE_STORAGE_DRIVER=s3 but S3_BUCKET / credentials are incomplete; using local FILE_STORAGE_ROOT'
		);
		return local;
	}

	const s3 = new S3ObjectStore({
		bucket: env.s3.bucket,
		region: env.s3.region,
		prefix: env.s3.prefix,
		endpoint: env.s3.endpoint,
		forcePathStyle: env.s3.forcePathStyle,
		accessKeyId: env.s3.accessKeyId,
		secretAccessKey: env.s3.secretAccessKey
	});

	return new FallbackFileStore(s3, local);
}
