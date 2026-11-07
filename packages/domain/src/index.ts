/** Shared domain types and Zod schemas for Nest + SvelteKit. */
export const DOMAIN_PACKAGE = '@pack-challenge/domain' as const;

export function packageName(): string {
	return DOMAIN_PACKAGE;
}

export {
	RESOURCE_CATEGORIES,
	RESOURCE_CATEGORY_LABELS,
	RESOURCE_DESCRIPTION_MAX,
	RESOURCE_FILE_MIME_TYPES,
	RESOURCE_FILE_NAME_MAX,
	RESOURCE_FILE_SIZE_MAX,
	RESOURCE_LANGUAGE_LABELS,
	RESOURCE_LANGUAGES,
	RESOURCE_PROVIDER_LABELS,
	RESOURCE_PROVIDERS,
	RESOURCE_ROLE_LABELS,
	RESOURCE_ROLES,
	RESOURCE_TITLE_MAX,
	resourceCategorySchema,
	resourceCreateSchema,
	resourceFileMetadataSchema,
	resourceFileMimeTypeSchema,
	resourceLanguageSchema,
	resourceListQuerySchema,
	resourceListSchema,
	resourceProviderSchema,
	resourceRoleSchema,
	resourceSchema
} from './resource/index.js';
export type {
	Resource,
	ResourceCategory,
	ResourceCreate,
	ResourceCreateInput,
	ResourceFileMetadata,
	ResourceFileMimeType,
	ResourceLanguage,
	ResourceList,
	ResourceListQuery,
	ResourceListQueryInput,
	ResourceProvider,
	ResourceRole
} from './resource/index.js';
