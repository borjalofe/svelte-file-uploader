import type { Resource } from '@pack-challenge/domain';

/**
 * Public list item: form fields + safe file metadata.
 * Omits `storagePath` so clients never receive a filesystem/object path (use id for download).
 */
export type ResourceListItemDto = Omit<Resource, 'storagePath'>;

export type ResourceListDto = {
	items: ResourceListItemDto[];
	total: number;
	limit: number;
	offset: number;
};

export function toResourceListItem(resource: Resource): ResourceListItemDto {
	const { storagePath: _storagePath, ...publicFields } = resource;
	return publicFields;
}
