import { type ClassValue, cn } from '../../../lib/utils.js';
import type { ResourcesDataTableRow } from '../../organisms/resources-data-table/types.js';
import type { ResourceTabValue } from '../../organisms/resources-toolbar/types.js';

/**
 * Pack ResourcesCatalogPage — DashboardShell composition for /ds resources demo.
 * Toolbar counts come from the full dataset; table rows are filtered client-side.
 */
export const resourcesCatalogPageMainBaseClass = 'flex w-full min-w-0 flex-col gap-4';

export function resolveResourcesCatalogPageMain({
	class: className
}: { class?: ClassValue } = {}): { className: string } {
	return { className: cn(resourcesCatalogPageMainBaseClass, className) };
}

/** Filter rows by type tab + case-insensitive title/path query (client-side). */
export function filterResourceCatalogRows(
	rows: readonly ResourcesDataTableRow[],
	tab: ResourceTabValue,
	query = ''
): ResourcesDataTableRow[] {
	const q = query.trim().toLowerCase();
	return rows.filter((row) => {
		if (tab !== 'all' && row.type !== tab) return false;
		if (!q) return true;
		return row.title.toLowerCase().includes(q) || row.path.toLowerCase().includes(q);
	});
}
