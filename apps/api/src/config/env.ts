import path from 'node:path';
import { loadEnv } from '../db/load-env.js';

export type FileStorageDriver = 'local' | 's3';

export type S3Env = {
	bucket: string;
	region: string;
	prefix: string | undefined;
	endpoint: string | undefined;
	forcePathStyle: boolean;
	accessKeyId: string;
	secretAccessKey: string;
};

export type ApiEnv = {
	nodeEnv: string;
	apiPort: number;
	databaseUrl: string | undefined;
	fileStorageRoot: string;
	fileStorageDriver: FileStorageDriver;
	/** Present only when driver is s3 and required fields are complete. */
	s3: S3Env | undefined;
};

/** Resolve API env. Storage root defaults under repo `var/file-store` (outside web static). */
export function loadApiEnv(
	env: NodeJS.ProcessEnv = process.env,
	cwd: string = process.cwd()
): ApiEnv {
	loadEnv();
	const fileStorageRoot = path.resolve(
		env.FILE_STORAGE_ROOT?.trim() || path.join(cwd, 'var', 'file-store')
	);

	const driverRaw = (env.FILE_STORAGE_DRIVER?.trim() || 'local').toLowerCase();
	const fileStorageDriver: FileStorageDriver = driverRaw === 's3' ? 's3' : 'local';

	return {
		nodeEnv: env.NODE_ENV?.trim() || 'development',
		apiPort: Number(env.API_PORT || 3000),
		databaseUrl: env.DATABASE_URL?.trim() || undefined,
		fileStorageRoot,
		fileStorageDriver,
		s3: fileStorageDriver === 's3' ? parseS3Env(env) : undefined
	};
}

function parseS3Env(env: NodeJS.ProcessEnv): S3Env | undefined {
	const bucket = env.S3_BUCKET?.trim();
	const accessKeyId = env.AWS_ACCESS_KEY_ID?.trim() || env.S3_ACCESS_KEY_ID?.trim();
	const secretAccessKey =
		env.AWS_SECRET_ACCESS_KEY?.trim() || env.S3_SECRET_ACCESS_KEY?.trim();

	if (!bucket || !accessKeyId || !secretAccessKey) {
		return undefined;
	}

	const forcePathStyleRaw = env.S3_FORCE_PATH_STYLE?.trim().toLowerCase();
	const forcePathStyle =
		forcePathStyleRaw === '1' ||
		forcePathStyleRaw === 'true' ||
		forcePathStyleRaw === 'yes';

	return {
		bucket,
		region: env.S3_REGION?.trim() || env.AWS_REGION?.trim() || 'us-east-1',
		prefix: env.S3_PREFIX?.trim() || undefined,
		endpoint: env.S3_ENDPOINT?.trim() || undefined,
		forcePathStyle,
		accessKeyId,
		secretAccessKey
	};
}
