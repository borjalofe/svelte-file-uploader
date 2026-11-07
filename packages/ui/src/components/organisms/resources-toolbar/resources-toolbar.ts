import { type ClassValue, cn } from '../../../lib/utils.js';
import type { ResourceContentType, ResourceTabValue, ResourceTypeCounts } from './types.js';

/**
 * Pack ResourcesToolbar — type Tabs + SearchField + primary Upload.
 * Filter rule: `all` is never disabled; other tabs need count ≥ 1.
 */
export const resourcesToolbarRootBaseClass = 'flex w-full min-w-0 flex-wrap items-center gap-2';

export const resourcesToolbarSearchBaseClass = 'min-w-40 flex-1';

export const RESOURCE_TAB_VALUES = [
	'all',
	'videos',
	'documents',
	'lessons',
	'archive'
] as const satisfies readonly ResourceTabValue[];

export const RESOURCE_CONTENT_TYPES = [
	'videos',
	'documents',
	'lessons',
	'archive'
] as const satisfies readonly ResourceContentType[];

export const RESOURCE_TAB_LABELS: Record<ResourceTabValue, string> = {
	all: 'All',
	videos: 'Videos',
	documents: 'Documents',
	lessons: 'Lessons',
	archive: 'Archive'
};

/**
 * Pack Resources filter rule:
 * - `all` is always enabled
 * - other tabs enabled only when `counts[type] >= 1`
 */
export function isResourceTabEnabled(
	tab: ResourceTabValue,
	counts: ResourceTypeCounts = {}
): boolean {
	if (tab === 'all') return true;
	return (counts[tab] ?? 0) >= 1;
}

export function resolveResourcesToolbarRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(resourcesToolbarRootBaseClass, className) };
}

export function resolveResourcesToolbarSearch({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(resourcesToolbarSearchBaseClass, className) };
}
