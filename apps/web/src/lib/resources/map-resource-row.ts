import {
	RESOURCE_PROVIDER_LABELS,
	type Resource,
	type ResourceFileMimeType
} from '@pack-challenge/domain';
import type { ResourceContentType, ResourcesDataTableRow } from '@pack-challenge/ui';

/** Map Nest MIME allowlist → Pack toolbar content-type tabs. */
export function mimeToResourceContentType(mimeType: ResourceFileMimeType): ResourceContentType {
	if (mimeType === 'video/mp4' || mimeType === 'video/webm') {
		return 'videos';
	}
	return 'documents';
}

/** List/create row input — `storagePath` optional (public list omits it). */
export type ResourceTableSource = Omit<Resource, 'storagePath'> & {
	storagePath?: string;
};

/** Table row plus MIME for in-app preview routing (#86). */
export type LiveResourceRow = ResourcesDataTableRow & {
	mimeType: ResourceFileMimeType;
};

/**
 * Map domain `Resource` → table row for UI organisms.
 * `viewCount` / `uploadedBy` are placeholders until product fields exist.
 * `path` uses original filename (not internal `storagePath`).
 */
export function mapResourceToTableRow(resource: ResourceTableSource): LiveResourceRow {
	return {
		id: resource.id,
		title: resource.title,
		path: resource.file.originalName,
		viewCount: 0,
		uploadedBy: '—',
		provider: RESOURCE_PROVIDER_LABELS[resource.provider] ?? resource.provider,
		type: mimeToResourceContentType(resource.file.mimeType),
		mimeType: resource.file.mimeType
	};
}
