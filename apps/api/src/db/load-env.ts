import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { config } from 'dotenv';

/** Load repo-root `.env` whether cwd is monorepo root or `apps/api`. */
export function loadEnv(): void {
	const candidates = [
		resolve(process.cwd(), '.env'),
		resolve(process.cwd(), '../../.env'),
		resolve(import.meta.dirname, '../../../../.env')
	];
	for (const path of candidates) {
		if (existsSync(path)) {
			config({ path });
			return;
		}
	}
}
