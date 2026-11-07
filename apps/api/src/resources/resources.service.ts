import {
	BadRequestException,
	Injectable,
	PayloadTooLargeException,
	UnsupportedMediaTypeException
} from '@nestjs/common';
import {
	RESOURCE_FILE_MIME_TYPES,
	RESOURCE_FILE_SIZE_MAX,
	resourceCreateSchema,
	resourceListQuerySchema,
	type Resource,
	type ResourceFileMimeType
} from '@pack-challenge/domain';
import { LocalFileStore } from '../storage/local-file.store.js';
import { toResourceListItem, type ResourceListDto } from './resource-list.dto.js';
import type { ResourcesRepository } from './resources.repository.js';

export type MultipartResourceFields = {
	title?: string;
	description?: string;
	category?: string;
	language?: string;
	provider?: string;
	/** JSON array string or repeated form fields joined by the controller. */
	roles?: string | string[];
};

@Injectable()
export class ResourcesService {
	constructor(
		private readonly files: LocalFileStore,
		private readonly resources: ResourcesRepository
	) {}

	async createFromMultipart(
		fields: MultipartResourceFields,
		file: Express.Multer.File | undefined
	): Promise<Resource> {
		if (!file) {
			throw new BadRequestException('File is required');
		}

		if (file.size > RESOURCE_FILE_SIZE_MAX) {
			throw new PayloadTooLargeException(
				`File size must be ≤ ${RESOURCE_FILE_SIZE_MAX} bytes`
			);
		}

		const mimeType = file.mimetype as ResourceFileMimeType;
		if (!(RESOURCE_FILE_MIME_TYPES as readonly string[]).includes(mimeType)) {
			throw new UnsupportedMediaTypeException(`MIME type not allowed: ${file.mimetype}`);
		}

		const roles = parseRoles(fields.roles);
		const parsed = resourceCreateSchema.safeParse({
			title: fields.title,
			description: fields.description,
			category: fields.category,
			language: fields.language,
			provider: fields.provider,
			roles,
			file: {
				originalName: file.originalname,
				mimeType,
				size: file.size
			}
		});

		if (!parsed.success) {
			throw new BadRequestException({
				message: 'Validation failed',
				issues: parsed.error.issues.map((issue) => ({
					path: issue.path.join('.'),
					message: issue.message
				}))
			});
		}

		const stored = await this.files.writeResourceFile(mimeType, file.buffer);
		try {
			return await this.resources.insert({
				...parsed.data,
				storagePath: stored.storagePath
			});
		} catch (error) {
			// Best-effort cleanup if DB insert fails after the object was written.
			const { unlink } = await import('node:fs/promises');
			await unlink(stored.absolutePath).catch(() => undefined);
			throw error;
		}
	}

	/** List resources with form fields + safe file meta (no storage paths). */
	async list(rawQuery: Record<string, unknown> = {}): Promise<ResourceListDto> {
		const parsed = resourceListQuerySchema.safeParse(rawQuery);
		if (!parsed.success) {
			throw new BadRequestException({
				message: 'Invalid list query',
				issues: parsed.error.issues.map((issue) => ({
					path: issue.path.join('.'),
					message: issue.message
				}))
			});
		}

		const { limit, offset } = parsed.data;
		const { items, total } = await this.resources.list({ limit, offset });
		return {
			items: items.map(toResourceListItem),
			total,
			limit,
			offset
		};
	}
}

function parseRoles(roles: string | string[] | undefined): string[] {
	if (roles == null) {
		return [];
	}
	if (Array.isArray(roles)) {
		return roles.flatMap((value) => splitRoles(value));
	}
	const trimmed = roles.trim();
	if (trimmed.startsWith('[')) {
		try {
			const parsed: unknown = JSON.parse(trimmed);
			if (Array.isArray(parsed)) {
				return parsed.map(String);
			}
		} catch {
			// fall through to comma-split
		}
	}
	return splitRoles(trimmed);
}

function splitRoles(value: string): string[] {
	return value
		.split(',')
		.map((part) => part.trim())
		.filter(Boolean);
}
