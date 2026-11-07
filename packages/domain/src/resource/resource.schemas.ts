import { z } from 'zod';
import {
	RESOURCE_CATEGORIES,
	RESOURCE_DESCRIPTION_MAX,
	RESOURCE_FILE_MIME_TYPES,
	RESOURCE_FILE_NAME_MAX,
	RESOURCE_FILE_SIZE_MAX,
	RESOURCE_LANGUAGES,
	RESOURCE_PROVIDERS,
	RESOURCE_ROLES,
	RESOURCE_TITLE_MAX
} from './constants.js';

export const resourceRoleSchema = z.enum(RESOURCE_ROLES);
export const resourceCategorySchema = z.enum(RESOURCE_CATEGORIES);
export const resourceLanguageSchema = z.enum(RESOURCE_LANGUAGES);
export const resourceProviderSchema = z.enum(RESOURCE_PROVIDERS);
export const resourceFileMimeTypeSchema = z.enum(RESOURCE_FILE_MIME_TYPES);

/** Uploaded file metadata on create (no storage path yet — Nest assigns that). */
export const resourceFileMetadataSchema = z.object({
	originalName: z
		.string()
		.trim()
		.min(1, 'File name is required')
		.max(RESOURCE_FILE_NAME_MAX, `File name must be ≤ ${RESOURCE_FILE_NAME_MAX} characters`),
	mimeType: resourceFileMimeTypeSchema,
	size: z
		.number()
		.int('File size must be an integer')
		.positive('File size must be greater than 0')
		.max(RESOURCE_FILE_SIZE_MAX, `File size must be ≤ ${RESOURCE_FILE_SIZE_MAX} bytes`)
});

export type ResourceFileMetadata = z.infer<typeof resourceFileMetadataSchema>;

/**
 * Create payload shared by Nest multipart handlers and SvelteKit clients.
 * Roles: at least one of Mentor/Coach, Mentee/Coachee; duplicates removed.
 */
export const resourceCreateSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, 'Title is required')
		.max(RESOURCE_TITLE_MAX, `Title must be ≤ ${RESOURCE_TITLE_MAX} characters`),
	description: z
		.string()
		.trim()
		.min(1, 'Description is required')
		.max(
			RESOURCE_DESCRIPTION_MAX,
			`Description must be ≤ ${RESOURCE_DESCRIPTION_MAX} characters`
		),
	category: resourceCategorySchema,
	language: resourceLanguageSchema,
	provider: resourceProviderSchema,
	roles: z
		.array(resourceRoleSchema)
		.min(1, 'Select at least one role')
		.transform((roles) => [...new Set(roles)]),
	file: resourceFileMetadataSchema
});

export type ResourceCreateInput = z.input<typeof resourceCreateSchema>;
export type ResourceCreate = z.output<typeof resourceCreateSchema>;

/** Stored resource row shape for list/detail (file pointer + timestamps). */
export const resourceSchema = resourceCreateSchema.extend({
	id: z.string().uuid(),
	storagePath: z.string().min(1),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date()
});

export type Resource = z.infer<typeof resourceSchema>;

/** List/search query — `q` matches title + description on the API later. */
export const resourceListQuerySchema = z.object({
	q: z.string().trim().max(200).optional(),
	category: resourceCategorySchema.optional(),
	language: resourceLanguageSchema.optional(),
	provider: resourceProviderSchema.optional(),
	role: resourceRoleSchema.optional(),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	offset: z.coerce.number().int().min(0).default(0)
});

export type ResourceListQueryInput = z.input<typeof resourceListQuerySchema>;
export type ResourceListQuery = z.output<typeof resourceListQuerySchema>;

export const resourceListSchema = z.object({
	items: z.array(resourceSchema),
	total: z.number().int().min(0),
	limit: z.number().int().min(1),
	offset: z.number().int().min(0)
});

export type ResourceList = z.infer<typeof resourceListSchema>;
