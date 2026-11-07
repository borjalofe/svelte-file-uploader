import { Module } from '@nestjs/common';
import { ResourcesModule } from './resources/resources.module.js';

@Module({
	imports: [ResourcesModule]
})
export class AppModule {}
