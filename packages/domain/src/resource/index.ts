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
	RESOURCE_TITLE_MAX
} from './constants.js';
export type {
	ResourceCategory,
	ResourceFileMimeType,
	ResourceLanguage,
	ResourceProvider,
	ResourceRole
} from './constants.js';
export {
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
} from './resource.schemas.js';
export type {
	Resource,
	ResourceCreate,
	ResourceCreateInput,
	ResourceFileMetadata,
	ResourceList,
	ResourceListQuery,
	ResourceListQueryInput
} from './resource.schemas.js';
