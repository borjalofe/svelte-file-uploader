import path from 'node:path';
import { loadEnv } from '../db/load-env.js';

export type ApiEnv = {
	nodeEnv: string;
	apiPort: number;
	databaseUrl: string | undefined;
	fileStorageRoot: string;
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

	return {
		nodeEnv: env.NODE_ENV?.trim() || 'development',
		apiPort: Number(env.API_PORT || 3000),
		databaseUrl: env.DATABASE_URL?.trim() || undefined,
		fileStorageRoot
	};
}
