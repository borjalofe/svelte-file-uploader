import type { HTMLAttributes } from 'svelte/elements';
import type { ClassValue, WithElementRef } from '../../../lib/utils.js';

/** Content types used by Resources tabs (All is not a row type). */
export type ResourceContentType = 'video' | 'document' | 'lesson' | 'archive';

export type ResourcesDataTableRow = {
	id: string;
	title: string;
	path: string;
	viewCount: number;
	uploadedBy: string;
	provider: string;
	/** Per-row type for toolbar tab enablement / counts. */
	type: ResourceContentType;
};

export type ResourcesDataTableSortColumn =
	'title' | 'path' | 'viewCount' | 'uploadedBy' | 'provider' | 'type';

export type ResourcesDataTableSortDirection = 'asc' | 'desc';

export type ResourceTypeCounts = Record<ResourceContentType, number>;

export type ResourcesDataTableProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
	rows?: ResourcesDataTableRow[];
	caption?: string;
	class?: ClassValue;
	/** Fired when a row action is chosen (no real persistence). */
	onRowAction?: (detail: {
		action: 'edit' | 'duplicate' | 'delete';
		row: ResourcesDataTableRow;
	}) => void;
};
