import 'reflect-metadata';
import { pathToFileURL } from 'node:url';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { loadApiEnv } from './config/env.js';

export async function bootstrap(): Promise<void> {
	const env = loadApiEnv();
	const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
	// Browser on the host (Compose `web` / Vite) calls published API_PORT cross-origin.
	app.enableCors({
		origin: true,
		methods: ['GET', 'POST', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Accept']
	});
	await app.listen(env.apiPort);
}

/** Kept for smoke tests / package identity. */
export function apiStub(): string {
	return '@pack-challenge/api';
}

const entry = process.argv[1];
if (entry && import.meta.url === pathToFileURL(entry).href) {
	bootstrap().catch((error: unknown) => {
		console.error(error);
		process.exit(1);
	});
}
