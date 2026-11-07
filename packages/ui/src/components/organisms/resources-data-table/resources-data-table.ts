import { type ClassValue, cn } from '../../../lib/utils.js';
import type {
	ResourceContentType,
	ResourceTypeCounts,
	ResourcesDataTableRow,
	ResourcesDataTableSortColumn,
	ResourcesDataTableSortDirection
} from './types.js';

/** Visible Resources type tabs excluding All (see docs/brand/AUDIT.md). */
export const RESOURCE_CONTENT_TYPES = [
	'video',
	'document',
	'lesson',
	'archive'
] as const satisfies readonly ResourceContentType[];

export const resourceContentTypeLabel: Record<ResourceContentType, string> = {
	video: 'Video',
	document: 'Document',
	lesson: 'Lesson',
	archive: 'Archive'
};

export const resourcesDataTableRootBaseClass = 'w-full min-w-0';

export const resourcesDataTableSortButtonBaseClass =
	'text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-medium';

export const resourcesDataTableSortIconBaseClass = 'size-3.5 shrink-0 opacity-70';

/** Count rows by content type for toolbar tab enablement (≥1 enables a tab). */
export function countResourceTypes(rows: ResourcesDataTableRow[]): ResourceTypeCounts {
	const counts: ResourceTypeCounts = {
		video: 0,
		document: 0,
		lesson: 0,
		archive: 0
	};
	for (const row of rows) {
		counts[row.type] += 1;
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
