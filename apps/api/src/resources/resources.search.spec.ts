import 'reflect-metadata';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import type { ResourceCreate } from '@pack-challenge/domain';
import { LocalFileStore } from '../storage/local-file.store.js';
import { ResourcesController } from './resources.controller.js';
import { MemoryResourcesRepository } from './resources.repository.js';
import { ResourcesService } from './resources.service.js';
import { RESOURCES_REPOSITORY } from './resources.tokens.js';

const baseCreate = {
	category: 'conflict-resolution' as const,
	language: 'en' as const,
	provider: 'pack' as const,
	roles: ['mentor-coach'] as const,
	file: {
		originalName: 'doc.pdf',
		mimeType: 'application/pdf' as const,
		size: 128
	}
};

async function seed(
	repo: MemoryResourcesRepository,
	title: string,
	description: string
): Promise<void> {
	const row: ResourceCreate = { ...baseCreate, title, description, roles: [...baseCreate.roles] };
	await repo.insert({ ...row, storagePath: `resources/${title.replace(/\s+/g, '-')}.pdf` });
}

describe('GET /resources?q= (#71)', () => {
	let app: INestApplication;
	let root: string;
	let repo: MemoryResourcesRepository;

	beforeEach(async () => {
		root = await mkdtemp(path.join(os.tmpdir(), 'pack-search-'));
		repo = new MemoryResourcesRepository();
		const store = new LocalFileStore(root);

		await seed(repo, 'Conflict Resolution Basics', 'Workplace mediation primer.');
		await seed(repo, 'Leadership 101', 'Coaching habits for mentors.');
		await seed(repo, 'Quiet Title', 'Contains the word conflict only here.');

		const moduleRef = await Test.createTestingModule({
			controllers: [ResourcesController],
			providers: [
				{ provide: LocalFileStore, useValue: store },
				{ provide: RESOURCES_REPOSITORY, useValue: repo },
				{
					provide: ResourcesService,
					useFactory: () => new ResourcesService(store, repo)
				}
			]
		}).compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	afterEach(async () => {
		await app.close();
		await rm(root, { recursive: true, force: true });
	});

	it('match: q finds resources by title (case-insensitive)', async () => {
		const response = await request(app.getHttpServer())
			.get('/resources')
			.query({ q: 'leadership' })
			.expect(200);

		expect(response.body.total).toBe(1);
		expect(response.body.items).toHaveLength(1);
		expect(response.body.items[0].title).toBe('Leadership 101');
		expect(response.body.limit).toBe(20);
		expect(response.body.offset).toBe(0);
	});

	it('match: q finds resources by description', async () => {
		const response = await request(app.getHttpServer())
			.get('/resources')
			.query({ q: 'mediation' })
			.expect(200);

		expect(response.body.total).toBe(1);
		expect(response.body.items[0].title).toBe('Conflict Resolution Basics');
	});

	it('match: q matches title OR description', async () => {
		const response = await request(app.getHttpServer())
			.get('/resources')
			.query({ q: 'conflict' })
			.expect(200);

		const titles = response.body.items.map((item: { title: string }) => item.title).sort();
		expect(response.body.total).toBe(2);
		expect(titles).toEqual(['Conflict Resolution Basics', 'Quiet Title']);
	});

	it('no-match: q with no hits returns empty items', async () => {
		const response = await request(app.getHttpServer())
			.get('/resources')
			.query({ q: 'quantum-zebra-not-present' })
			.expect(200);

		expect(response.body.total).toBe(0);
		expect(response.body.items).toEqual([]);
	});

	it('rejects invalid query params', async () => {
		await request(app.getHttpServer())
			.get('/resources')
			.query({ limit: 0 })
			.expect(400);
	});
});
