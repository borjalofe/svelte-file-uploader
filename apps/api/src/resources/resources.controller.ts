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
import { RESOURCE_FILE_SIZE_MAX, type ResourceListQueryInput } from '@pack-challenge/domain';
import { ResourcesService, type MultipartResourceFields } from './resources.service.js';

@Controller('resources')
export class ResourcesController {
	constructor(private readonly resources: ResourcesService) {}

	/**
	 * GET /resources — list resources.
	 *
	 * Query params (shared Zod `resourceListQuerySchema`):
	 * - `q` — optional search string; case-insensitive match on **title** OR **description** (ILIKE / substring)
	 * - `category`, `language`, `provider`, `role` — optional filters
	 * - `limit` (default 20), `offset` (default 0)
	 */
	@Get()
	list(@Query() query: ResourceListQueryInput) {
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
