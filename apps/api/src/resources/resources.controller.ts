import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UploadedFile,
	UseInterceptors,
	Body
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { RESOURCE_FILE_SIZE_MAX } from '@pack-challenge/domain';
import { ResourcesService, type MultipartResourceFields } from './resources.service.js';

@Controller('resources')
export class ResourcesController {
	constructor(private readonly resources: ResourcesService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@UseInterceptors(
		FileInterceptor('file', {
			storage: memoryStorage(),
			limits: { fileSize: RESOURCE_FILE_SIZE_MAX, files: 1 }
		})
	)
	create(
		@Body() body: MultipartResourceFields,
		@UploadedFile() file: Express.Multer.File | undefined
	) {
		return this.resources.createFromMultipart(body, file);
	}
}
