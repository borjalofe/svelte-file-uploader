import 'reflect-metadata';
import { describe, expect, it } from 'vitest';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { HealthController } from './health.controller.js';

describe('GET /health (#80)', () => {
	it('returns ok for compose healthchecks', async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [HealthController]
		}).compile();
		const app: INestApplication = moduleRef.createNestApplication();
		await app.init();

		const response = await request(app.getHttpServer()).get('/health').expect(200);
		expect(response.body).toEqual({ status: 'ok' });

		await app.close();
	});
});
