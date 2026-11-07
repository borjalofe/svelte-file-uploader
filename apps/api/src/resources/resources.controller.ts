import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
	StreamableFile,
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

	/**
	 * GET /resources/:id/file — stream the stored object for a resource id.
	 * Mediated by id only (no client path). Missing id / object → 404.
	 */
	@Get(':id/file')
	async downloadFile(@Param('id') id: string): Promise<StreamableFile> {
		const file = await this.resources.openFileById(id);
		return new StreamableFile(file.stream, {
			type: file.mimeType,
			disposition: contentDisposition(file.originalName),
			length: file.size
		});
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

function contentDisposition(originalName: string): string {
	const safe = originalName.replace(/["\\]/g, '_');
	return `attachment; filename="${safe}"`;
}
