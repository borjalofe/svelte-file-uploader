import 'reflect-metadata';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { LocalFileStore } from '../storage/local-file.store.js';
import { toResourceListItem } from './resource-list.dto.js';
import { ResourcesController } from './resources.controller.js';
import { MemoryResourcesRepository } from './resources.repository.js';
import { ResourcesService } from './resources.service.js';
import { RESOURCES_REPOSITORY } from './resources.tokens.js';

describe('toResourceListItem (#70)', () => {
	it('omits storagePath from the public list item', () => {
		const item = toResourceListItem({
			id: '550e8400-e29b-41d4-a716-446655440000',
			title: 'Conflict Basics',
			description: 'Intro',
			category: 'conflict-resolution',
			language: 'en',
			provider: 'pack',
			roles: ['mentor-coach'],
			file: {
				originalName: 'guide.pdf',
				mimeType: 'application/pdf',
				size: 2048
			},
			storagePath: 'resources/550e8400-e29b-41d4-a716-446655440000.pdf',
			createdAt: new Date('2026-11-07T12:00:00.000Z'),
			updatedAt: new Date('2026-11-07T12:00:00.000Z')
		});

		expect(item).not.toHaveProperty('storagePath');
		expect(item.file.originalName).toBe('guide.pdf');
		expect(JSON.stringify(item)).not.toContain('resources/');
	});
});

describe('GET /resources (#70)', () => {
	let app: INestApplication;
	let root: string;
	let repo: MemoryResourcesRepository;
	let store: LocalFileStore;

	beforeEach(async () => {
		root = await mkdtemp(path.join(os.tmpdir(), 'pack-api-list-'));
		repo = new MemoryResourcesRepository();
		store = new LocalFileStore(root);

		await repo.insert({
			title: 'Conflict Basics',
			description: 'Intro',
			category: 'conflict-resolution',
			language: 'en',
			provider: 'pack',
			roles: ['mentor-coach'],
			file: {
				originalName: 'guide.pdf',
				mimeType: 'application/pdf',
				size: 2048
			},
			storagePath: 'resources/internal-only.pdf'
		});

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

	it('returns form fields + safe file meta without storage paths', async () => {
		const res = await request(app.getHttpServer()).get('/resources').expect(200);

		expect(res.body.total).toBe(1);
		expect(res.body.limit).toBe(20);
		expect(res.body.offset).toBe(0);
		expect(res.body.items).toHaveLength(1);
		expect(res.body.items[0].title).toBe('Conflict Basics');
		expect(res.body.items[0].file).toEqual({
			originalName: 'guide.pdf',
			mimeType: 'application/pdf',
			size: 2048
		});
		expect(res.body.items[0]).not.toHaveProperty('storagePath');
		expect(JSON.stringify(res.body)).not.toMatch(
			/storagePath|storage_path|internal-only|\.\.\/|\/var\/|\/tmp\//
		);
	});

	it('applies pagination query defaults and overrides', async () => {
		const res = await request(app.getHttpServer())
			.get('/resources?limit=10&offset=0')
			.expect(200);
		expect(res.body.limit).toBe(10);
		expect(res.body.offset).toBe(0);
	});

	it('rejects invalid limit', async () => {
		await request(app.getHttpServer()).get('/resources?limit=0').expect(400);
	});

	it('does not expose a directory listing route', async () => {
		await request(app.getHttpServer()).get('/uploads').expect(404);
		await request(app.getHttpServer()).get('/files').expect(404);
	});
});
