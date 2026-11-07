import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../lib/utils.js';
import type { ResourcesDataTableRow } from '../../organisms/resources-data-table/types.js';
import type { ResourceTabValue } from '../../organisms/resources-toolbar/types.js';

export type ResourcesCatalogPageProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
	/**
	 * Full resource dataset for the page.
	 * Toolbar tab enablement uses counts from this list (not the filtered view).
	 */
	rows?: ResourcesDataTableRow[];
	/** Initial type tab. */
	tab?: ResourceTabValue;
	/** Initial search query. */
	query?: string;
	/** Toast copy when Upload is clicked (no upload API). */
	uploadToastMessage?: string;
	class?: string;
};
