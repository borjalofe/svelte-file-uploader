import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { RESOURCE_FILE_SIZE_MAX } from '@pack-challenge/domain';
import type { ResourceListDto } from './resource-list.dto.js';
import { ResourcesService, type MultipartResourceFields } from './resources.service.js';

@Controller('resources')
export class ResourcesController {
	constructor(private readonly resources: ResourcesService) {}

	/**
	 * List resources with form fields + safe file metadata.
	 * Does not expose storage paths or directory listings.
	 */
	@Get()
	list(@Query() query: Record<string, string>): Promise<ResourceListDto> {
		return this.resources.list(query);
	}

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
