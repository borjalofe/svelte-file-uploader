/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import ResourcesCatalogPageA11yHarness from './ResourcesCatalogPageA11yHarness.svelte';
import { RESOURCES_CATALOG_EMPTY } from './resources-catalog-page.fixtures.js';

afterEach(() => {
	cleanup();
});

describe('ResourcesCatalogPage a11y (#59)', () => {
	it('exposes banner, resource tabs, and table region without axe violations', async () => {
		const { container, getByRole } = render(ResourcesCatalogPageA11yHarness, {
			props: { rows: [...RESOURCES_CATALOG_EMPTY] }
		});

		expect(getByRole('banner')).toBeTruthy();
		expect(getByRole('navigation', { name: 'Primary' })).toBeTruthy();
		expect(getByRole('tablist', { name: 'Resource type' })).toBeTruthy();
		expect(getByRole('tab', { name: 'All' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});
});
