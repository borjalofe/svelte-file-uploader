import { describe, expect, it } from 'vitest';
import {
	RESOURCES_CATALOG_EMPTY,
	RESOURCES_CATALOG_MIXED,
	RESOURCES_CATALOG_VIDEOS_ONLY
} from './resources-catalog-page.fixtures.js';
import {
	filterResourceCatalogRows,
	resolveResourcesCatalogPageMain
} from './resources-catalog-page.js';
import { countResourceTypes } from '../../organisms/resources-data-table/resources-data-table.js';
import { isResourceTabEnabled } from '../../organisms/resources-toolbar/resources-toolbar.js';

describe('ResourcesCatalogPage (#59)', () => {
	it('ships empty / videos-only / mixed fixtures', () => {
		expect(RESOURCES_CATALOG_EMPTY).toHaveLength(0);
		expect(RESOURCES_CATALOG_VIDEOS_ONLY.every((r) => r.type === 'videos')).toBe(true);
		expect(new Set(RESOURCES_CATALOG_MIXED.map((r) => r.type)).size).toBeGreaterThan(1);
	});

	it('derives toolbar enablement from full dataset counts (filter rule)', () => {
		expect(isResourceTabEnabled('all', countResourceTypes([...RESOURCES_CATALOG_EMPTY]))).toBe(
			true
		);
		expect(isResourceTabEnabled('videos', countResourceTypes([...RESOURCES_CATALOG_EMPTY]))).toBe(
			false
		);

		const videosCounts = countResourceTypes([...RESOURCES_CATALOG_VIDEOS_ONLY]);
		expect(isResourceTabEnabled('videos', videosCounts)).toBe(true);
		expect(isResourceTabEnabled('documents', videosCounts)).toBe(false);

		const mixedCounts = countResourceTypes([...RESOURCES_CATALOG_MIXED]);
		expect(isResourceTabEnabled('videos', mixedCounts)).toBe(true);
		expect(isResourceTabEnabled('documents', mixedCounts)).toBe(true);
		expect(isResourceTabEnabled('lessons', mixedCounts)).toBe(true);
		expect(isResourceTabEnabled('archive', mixedCounts)).toBe(true);
	});

	it('filters visible rows by tab and query without changing enablement dataset', () => {
		const mixed = [...RESOURCES_CATALOG_MIXED];
		expect(filterResourceCatalogRows(mixed, 'videos')).toHaveLength(1);
		expect(filterResourceCatalogRows(mixed, 'all', 'tokens')[0]?.title).toBe('Design tokens');
		expect(resolveResourcesCatalogPageMain().className).toContain('flex-col');
	});
});
