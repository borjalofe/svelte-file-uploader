import type { HTMLAttributes } from 'svelte/elements';
import type { ClassValue, WithElementRef } from '../../../lib/utils.js';

/** Pack Resources type-tab values. */
export type ResourceTabValue = 'all' | 'videos' | 'documents' | 'lessons' | 'archive';

/** Filterable types (everything except `all`). */
export type ResourceContentType = Exclude<ResourceTabValue, 'all'>;

/** Counts of resources per filterable type (from parent dataset). */
export type ResourceTypeCounts = Partial<Record<ResourceContentType, number>>;

export type ResourcesToolbarProps = WithElementRef<
	Omit<HTMLAttributes<HTMLDivElement>, 'aria-label'>
> & {
	/** Selected resource-type tab (`all` | `videos` | …). */
	value?: ResourceTabValue;
	/** Search query bound to SearchField. */
	query?: string;
	/**
	 * Per-type counts from the current resource list.
	 * Tabs other than `all` are disabled when count is 0 / missing.
	 */
	counts?: ResourceTypeCounts;
	/** Accessible name for the tab list. */
	tabsLabel?: string;
	/** SearchField accessible name. */
	searchLabel?: string;
	/** SearchField placeholder. */
	searchPlaceholder?: string;
	/** Upload button label. */
	uploadLabel?: string;
	/** Fired when Upload is clicked. */
	onUpload?: (event: MouseEvent) => void;
	/** Disables search + upload (tabs still follow enable rule). */
	disabled?: boolean;
	class?: ClassValue;
	searchClass?: ClassValue;
};
