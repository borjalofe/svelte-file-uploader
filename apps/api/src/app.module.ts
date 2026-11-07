import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module.js';
import { ResourcesModule } from './resources/resources.module.js';

@Module({
	imports: [HealthModule, ResourcesModule]
})
export class AppModule {}
