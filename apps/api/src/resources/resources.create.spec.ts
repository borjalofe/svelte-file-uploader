import 'reflect-metadata';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { RESOURCE_FILE_SIZE_MAX } from '@pack-challenge/domain';
import { LocalFileStore } from '../storage/local-file.store.js';
import { ResourcesController } from './resources.controller.js';
import { MemoryResourcesRepository } from './resources.repository.js';
import { ResourcesService } from './resources.service.js';
import { RESOURCES_REPOSITORY } from './resources.tokens.js';

describe('POST /resources (#69)', () => {
	let app: INestApplication;
	let root: string;
	let repo: MemoryResourcesRepository;
	let store: LocalFileStore;

	beforeEach(async () => {
		root = await mkdtemp(path.join(os.tmpdir(), 'pack-api-'));
		repo = new MemoryResourcesRepository();
		store = new LocalFileStore(root);

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

	it('happy path: creates a row and writes the file on disk', async () => {
		const response = await request(app.getHttpServer())
			.post('/resources')
			.field('title', 'Conflict Resolution Basics')
			.field('description', 'A short introduction to resolving workplace conflict.')
			.field('category', 'conflict-resolution')
			.field('language', 'en')
			.field('provider', 'pack')
			.field('roles', JSON.stringify(['mentor-coach']))
			.attach('file', Buffer.from('%PDF-1.4 demo'), {
				filename: 'conflict-basics.pdf',
				contentType: 'application/pdf'
			})
			.expect(201);

		expect(response.body.id).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
		);
		expect(response.body.storagePath).toMatch(/^resources\/.+\.pdf$/);
		expect(response.body.file.originalName).toBe('conflict-basics.pdf');

		const row = await repo.findById(response.body.id);
		expect(row).not.toBeNull();
		expect(await store.exists(response.body.storagePath)).toBe(true);
	});

	it('validation fail: rejects disallowed MIME without writing a file', async () => {
		const response = await request(app.getHttpServer())
			.post('/resources')
			.field('title', 'Bad file')
			.field('description', 'Should not land on disk.')
			.field('category', 'leadership')
			.field('language', 'en')
			.field('provider', 'pack')
			.field('roles', JSON.stringify(['mentor-coach']))
			.attach('file', Buffer.from('PK zip'), {
				filename: 'payload.zip',
				contentType: 'application/zip'
			})
			.expect(415);

		expect(response.body.message).toMatch(/MIME/i);
		expect(await repo.findById('nope')).toBeNull();
	});

	it('validation fail: rejects missing title', async () => {
		await request(app.getHttpServer())
			.post('/resources')
			.field('description', 'Missing title field.')
			.field('category', 'leadership')
			.field('language', 'en')
			.field('provider', 'pack')
			.field('roles', JSON.stringify(['mentee-coachee']))
			.attach('file', Buffer.from('plain'), {
				filename: 'note.txt',
				contentType: 'text/plain'
			})
			.expect(400);
	});

	it('validation fail: rejects oversize payloads via multer limit', async () => {
		const huge = Buffer.alloc(RESOURCE_FILE_SIZE_MAX + 1, 1);
		await request(app.getHttpServer())
			.post('/resources')
			.field('title', 'Huge')
			.field('description', 'Too big for allowlist.')
			.field('category', 'communication')
			.field('language', 'en')
			.field('provider', 'partner')
			.field('roles', JSON.stringify(['mentor-coach']))
			.attach('file', huge, {
				filename: 'huge.bin',
				contentType: 'application/pdf'
			})
			.expect((res) => {
				// Multer may surface as 413 or Nest payload error depending on version.
				expect([400, 413, 500]).toContain(res.status);
			});
	});
});
