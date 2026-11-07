import 'reflect-metadata';
import { randomUUID } from 'node:crypto';
import { mkdtemp, rm, unlink } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { LocalFileStore } from '../storage/local-file.store.js';
import { ResourcesController } from './resources.controller.js';
import { MemoryResourcesRepository } from './resources.repository.js';
import { ResourcesService } from './resources.service.js';
import { RESOURCES_REPOSITORY } from './resources.tokens.js';

describe('GET /resources/:id/file (#72)', () => {
	let app: INestApplication;
	let root: string;
	let repo: MemoryResourcesRepository;
	let store: LocalFileStore;

	beforeEach(async () => {
		root = await mkdtemp(path.join(os.tmpdir(), 'pack-dl-'));
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

	async function createSample(): Promise<{ id: string; body: Buffer }> {
		const body = Buffer.from('%PDF-1.4 download-me');
		const response = await request(app.getHttpServer())
			.post('/resources')
			.field('title', 'Downloadable Resource')
			.field('description', 'File download smoke fixture.')
			.field('category', 'leadership')
			.field('language', 'en')
			.field('provider', 'pack')
			.field('roles', JSON.stringify(['mentor-coach']))
			.attach('file', body, {
				filename: 'download-me.pdf',
				contentType: 'application/pdf'
			})
			.expect(201);

		return { id: response.body.id as string, body };
	}

	it('download: streams the file for a known resource id', async () => {
		const { id, body } = await createSample();

		const response = await request(app.getHttpServer())
			.get(`/resources/${id}/file`)
			.buffer(true)
			.parse((res, callback) => {
				const chunks: Buffer[] = [];
				res.on('data', (chunk: Buffer) => chunks.push(chunk));
				res.on('end', () => callback(null, Buffer.concat(chunks)));
			})
			.expect(200);

		expect(response.headers['content-type']).toMatch(/application\/pdf/);
		expect(response.headers['content-disposition']).toMatch(/download-me\.pdf/);
		expect(Buffer.from(response.body)).toEqual(body);
	});

	it('missing id: unknown UUID returns 404 (fail-closed)', async () => {
		await request(app.getHttpServer())
			.get(`/resources/${randomUUID()}/file`)
			.expect(404);
	});

	it('missing id: non-UUID path param returns 404 (fail-closed)', async () => {
		await request(app.getHttpServer())
			.get('/resources/not-a-uuid/file')
			.expect(404);
	});

	it('missing object: row without file on disk returns 404', async () => {
		const { id } = await createSample();
		const row = await repo.findById(id);
		expect(row).not.toBeNull();
		const absolute = path.join(root, row!.storagePath);
		await unlink(absolute);

		await request(app.getHttpServer()).get(`/resources/${id}/file`).expect(404);
	});
});
