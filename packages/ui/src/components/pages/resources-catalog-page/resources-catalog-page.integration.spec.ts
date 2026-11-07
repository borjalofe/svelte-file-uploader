/**
 * Page-level integration (CI job `integration` / `pnpm integration`).
 * Node-safe: fixtures + countResourceTypes + isResourceTabEnabled (no .svelte mounts).
 * DOM tab enablement is covered in `*.a11y.spec.ts`.
 */
import { describe, expect, it } from 'vitest';
import { countResourceTypes } from '../../organisms/resources-data-table/resources-data-table.js';
import { isResourceTabEnabled } from '../../organisms/resources-toolbar/resources-toolbar.js';
import {
	RESOURCES_CATALOG_EMPTY,
	RESOURCES_CATALOG_MIXED,
	RESOURCES_CATALOG_VIDEOS_ONLY
} from './resources-catalog-page.fixtures.js';
import { filterResourceCatalogRows } from './resources-catalog-page.js';

describe('ResourcesCatalogPage integration (#59)', () => {
	it('empty fixture: only All enabled', () => {
		const counts = countResourceTypes([...RESOURCES_CATALOG_EMPTY]);
		expect(isResourceTabEnabled('all', counts)).toBe(true);
		expect(isResourceTabEnabled('videos', counts)).toBe(false);
		expect(isResourceTabEnabled('documents', counts)).toBe(false);
		expect(isResourceTabEnabled('lessons', counts)).toBe(false);
		expect(isResourceTabEnabled('archive', counts)).toBe(false);
	});

	it('videos-only fixture: All + Videos enabled; other types disabled', () => {
		const counts = countResourceTypes([...RESOURCES_CATALOG_VIDEOS_ONLY]);
		expect(isResourceTabEnabled('all', counts)).toBe(true);
		expect(isResourceTabEnabled('videos', counts)).toBe(true);
		expect(isResourceTabEnabled('documents', counts)).toBe(false);
		expect(filterResourceCatalogRows([...RESOURCES_CATALOG_VIDEOS_ONLY], 'videos')).toHaveLength(
			2
		);
	});

	it('mixed fixture: types present in the dataset are enabled', () => {
		const mixed = [...RESOURCES_CATALOG_MIXED];
		const counts = countResourceTypes(mixed);
		expect(isResourceTabEnabled('videos', counts)).toBe(true);
		expect(isResourceTabEnabled('documents', counts)).toBe(true);
		expect(isResourceTabEnabled('lessons', counts)).toBe(true);
		expect(isResourceTabEnabled('archive', counts)).toBe(true);
		expect(filterResourceCatalogRows(mixed, 'documents')[0]?.title).toBe('Design tokens');
	});
});
