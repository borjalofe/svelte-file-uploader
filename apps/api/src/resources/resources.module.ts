import { Module } from '@nestjs/common';
import { loadApiEnv } from '../config/env.js';
import { createDb } from '../db/client.js';
import { LocalFileStore } from '../storage/local-file.store.js';
import { DrizzleResourcesRepository } from './drizzle-resources.repository.js';
import { ResourcesController } from './resources.controller.js';
import { MemoryResourcesRepository, type ResourcesRepository } from './resources.repository.js';
import { ResourcesService } from './resources.service.js';
import { FILE_STORAGE_ROOT, RESOURCES_REPOSITORY } from './resources.tokens.js';

@Module({
	controllers: [ResourcesController],
	providers: [
		{
			provide: FILE_STORAGE_ROOT,
			useFactory: () => loadApiEnv().fileStorageRoot
		},
		{
			provide: LocalFileStore,
			inject: [FILE_STORAGE_ROOT],
			useFactory: (root: string) => new LocalFileStore(root)
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
			inject: [LocalFileStore, RESOURCES_REPOSITORY],
			useFactory: (files: LocalFileStore, resources: ResourcesRepository) =>
				new ResourcesService(files, resources)
		}
	]
})
export class ResourcesModule {}
