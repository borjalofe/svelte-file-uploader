/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import ResourcesCatalogPageA11yHarness from './ResourcesCatalogPageA11yHarness.svelte';
import {
	RESOURCES_CATALOG_EMPTY,
	RESOURCES_CATALOG_MIXED,
	RESOURCES_CATALOG_VIDEOS_ONLY
} from './resources-catalog-page.fixtures.js';

afterEach(() => {
	cleanup();
});

function tabDisabled(el: HTMLElement): boolean {
	return (
		(el as HTMLButtonElement).disabled ||
		el.getAttribute('data-disabled') === 'true' ||
		el.getAttribute('aria-disabled') === 'true' ||
		el.hasAttribute('disabled')
	);
}

describe('ResourcesCatalogPage a11y (#59)', () => {
	it('exposes banner, resource tabs, and empty enablement without axe violations', async () => {
		const { container, getByRole } = render(ResourcesCatalogPageA11yHarness, {
			props: { rows: [...RESOURCES_CATALOG_EMPTY] }
		});

		expect(getByRole('banner')).toBeTruthy();
		expect(getByRole('navigation', { name: 'Primary' })).toBeTruthy();
		expect(getByRole('tablist', { name: 'Resource type' })).toBeTruthy();
		expect(tabDisabled(getByRole('tab', { name: 'All' }))).toBe(false);
		expect(tabDisabled(getByRole('tab', { name: 'Videos' }))).toBe(true);
		expect(await axe(container)).toHaveNoViolations();
	});

	it('enables Videos for videos-only fixture and keeps Documents disabled', async () => {
		const { container, getByRole, getByText } = render(ResourcesCatalogPageA11yHarness, {
			props: { rows: [...RESOURCES_CATALOG_VIDEOS_ONLY] }
		});

		expect(tabDisabled(getByRole('tab', { name: 'Videos' }))).toBe(false);
		expect(tabDisabled(getByRole('tab', { name: 'Documents' }))).toBe(true);
		expect(getByText('Intro to Pack')).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('enables mixed-type tabs from the full dataset', async () => {
		const { container, getByRole, getByText } = render(ResourcesCatalogPageA11yHarness, {
			props: { rows: [...RESOURCES_CATALOG_MIXED] }
		});

		expect(tabDisabled(getByRole('tab', { name: 'Archive' }))).toBe(false);
		expect(getByText('Mentorship 101')).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});
});
