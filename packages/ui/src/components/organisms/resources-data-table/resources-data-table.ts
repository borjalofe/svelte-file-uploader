import { type ClassValue, cn } from '../../../lib/utils.js';
import { RESOURCE_CONTENT_TYPES } from '../resources-toolbar/resources-toolbar.js';
import type { ResourceContentType, ResourceTypeCounts } from '../resources-toolbar/types.js';
import type {
	ResourcesDataTableRow,
	ResourcesDataTableSortColumn,
	ResourcesDataTableSortDirection
} from './types.js';

/** Singular Badge labels (table cells); tabs use plural via ResourcesToolbar. */
export const resourceContentTypeLabel: Record<ResourceContentType, string> = {
	videos: 'Video',
	documents: 'Document',
	lessons: 'Lesson',
	archive: 'Archive'
};

export const resourcesDataTableRootBaseClass = 'w-full min-w-0';

export const resourcesDataTableSortButtonBaseClass =
	'text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-medium';

export const resourcesDataTableSortIconBaseClass = 'size-3.5 shrink-0 opacity-70';

/** Count rows by content type for toolbar tab enablement (≥1 enables a tab). */
export function countResourceTypes(rows: ResourcesDataTableRow[]): ResourceTypeCounts {
	const counts: ResourceTypeCounts = {};
	for (const type of RESOURCE_CONTENT_TYPES) {
		counts[type] = 0;
	}
	for (const row of rows) {
		counts[row.type] = (counts[row.type] ?? 0) + 1;
	}
	return counts;
}

/** Stable client-side sort for the Resources table (no network). */
export function sortResourceRows(
	rows: ResourcesDataTableRow[],
	column: ResourcesDataTableSortColumn,
	direction: ResourcesDataTableSortDirection
): ResourcesDataTableRow[] {
	const factor = direction === 'asc' ? 1 : -1;
	return [...rows].sort((a, b) => {
		const left = a[column];
		const right = b[column];
		if (typeof left === 'number' && typeof right === 'number') {
			return (left - right) * factor;
		}
		return String(left).localeCompare(String(right), undefined, { sensitivity: 'base' }) * factor;
	});
}

/** Map ResourcesDataTable root props to semantic-token class lists. */
export function resolveResourcesDataTableRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(resourcesDataTableRootBaseClass, className) };
}
