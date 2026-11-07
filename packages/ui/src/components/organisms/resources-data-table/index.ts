export { default as ResourcesDataTable } from './ResourcesDataTable.svelte';
export {
	countResourceTypes,
	resolveResourcesDataTableRoot,
	resourceContentTypeLabel,
	resourcesDataTableRootBaseClass,
	resourcesDataTableSortButtonBaseClass,
	resourcesDataTableSortIconBaseClass,
	sortResourceRows
} from './resources-data-table.js';
export type {
	ResourceContentType,
	ResourceTypeCounts,
	ResourcesDataTableProps,
	ResourcesDataTableRow,
	ResourcesDataTableSortColumn,
	ResourcesDataTableSortDirection
} from './types.js';
