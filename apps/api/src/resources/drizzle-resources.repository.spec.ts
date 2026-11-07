import { randomUUID } from 'node:crypto';
import { afterAll, describe, expect, it } from 'vitest';
import { createDb } from '../db/client.js';
import { loadEnv } from '../db/load-env.js';
import { DrizzleResourcesRepository } from './drizzle-resources.repository.js';

loadEnv();
const databaseUrl = process.env.DATABASE_URL?.trim();

describe.skipIf(!databaseUrl)('DrizzleResourcesRepository (#69)', () => {
	const { db, client } = createDb(databaseUrl!);
	const repo = new DrizzleResourcesRepository(db);

	afterAll(async () => {
		await client.end({ timeout: 5 });
	});

	it('inserts a DB row mapped to resourceSchema', async () => {
		const storagePath = `resources/${randomUUID()}.pdf`;
		const row = await repo.insert({
			title: 'Drizzle create smoke',
			description: 'Persisted against Compose Postgres via #68 schema.',
			category: 'leadership',
			language: 'en',
			provider: 'pack',
			roles: ['mentor-coach'],
			file: {
				originalName: 'smoke.pdf',
				mimeType: 'application/pdf',
				size: 12
			},
			storagePath
		});

		expect(row.id).toBeTruthy();
		const found = await repo.findById(row.id);
		expect(found?.storagePath).toBe(storagePath);
		expect(found?.file.originalName).toBe('smoke.pdf');
		expect(found?.title).toBe('Drizzle create smoke');
	});
});
