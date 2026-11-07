import { describe, expect, it } from 'vitest';
import {
	RESOURCE_TAB_VALUES,
	isResourceTabEnabled,
	resolveResourcesToolbarRoot,
	resolveResourcesToolbarSearch,
	resourcesToolbarTabsListBaseClass,
	resourcesToolbarTabsTriggerBaseClass
} from './resources-toolbar.js';

describe('ResourcesToolbar organism (#49)', () => {
	it('exposes Pack resource tabs All / Videos / Documents / Lessons / Archive', () => {
		expect(RESOURCE_TAB_VALUES).toEqual(['all', 'videos', 'documents', 'lessons', 'archive']);
	});

	it('uses Pack underline sub-nav chrome with info active border (no raw hex)', () => {
		expect(resourcesToolbarTabsListBaseClass).toContain('bg-transparent');
		expect(resourcesToolbarTabsListBaseClass).toContain('rounded-none');
		expect(resourcesToolbarTabsListBaseClass).not.toMatch(/#[0-9a-fA-F]{3,8}/);

		expect(resourcesToolbarTabsTriggerBaseClass).toContain('data-[state=active]:border-info');
		expect(resourcesToolbarTabsTriggerBaseClass).toContain('border-b-2');
		expect(resourcesToolbarTabsTriggerBaseClass).not.toMatch(/#[0-9a-fA-F]{3,8}/);
	});

	it('keeps All enabled and disables empty types (filter rule)', () => {
		expect(isResourceTabEnabled('all')).toBe(true);
		expect(isResourceTabEnabled('all', {})).toBe(true);
		expect(isResourceTabEnabled('videos', {})).toBe(false);
		expect(isResourceTabEnabled('documents', { documents: 0 })).toBe(false);
		expect(isResourceTabEnabled('lessons', { lessons: 1 })).toBe(true);
		expect(isResourceTabEnabled('archive', { archive: 2, videos: 0 })).toBe(true);
		expect(isResourceTabEnabled('videos', { videos: 1 })).toBe(true);
	});

	it('uses flex layout tokens without raw hex', () => {
		const root = resolveResourcesToolbarRoot();
		expect(root.className).toContain('flex');
		expect(root.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);

		expect(resolveResourcesToolbarSearch({ class: 'max-w-xs' }).className).toContain('max-w-xs');
	});
});
