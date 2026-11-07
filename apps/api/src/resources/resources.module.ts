import { Module } from '@nestjs/common';
import { loadApiEnv } from '../config/env.js';
import { createDb } from '../db/client.js';
import { createFileStore } from '../storage/create-file-store.js';
import type { FileStore } from '../storage/file-store.js';
import { DrizzleResourcesRepository } from './drizzle-resources.repository.js';
import { ResourcesController } from './resources.controller.js';
import { MemoryResourcesRepository, type ResourcesRepository } from './resources.repository.js';
import { ResourcesService } from './resources.service.js';
import { FILE_STORE, RESOURCES_REPOSITORY } from './resources.tokens.js';

@Module({
	controllers: [ResourcesController],
	providers: [
		{
			provide: FILE_STORE,
			useFactory: (): FileStore => createFileStore(loadApiEnv())
		},
		{
			provide: RESOURCES_REPOSITORY,
			useFactory: () => {
				const env = loadApiEnv();
				if (!env.databaseUrl) {
					return new MemoryResourcesRepository();
				}
				const { db } = createDb(env.databaseUrl);
				return new DrizzleResourcesRepository(db);
			}
		},
		{
			provide: ResourcesService,
			inject: [FILE_STORE, RESOURCES_REPOSITORY],
			useFactory: (files: FileStore, resources: ResourcesRepository) =>
				new ResourcesService(files, resources)
		}
	]
})
export class ResourcesModule {}
