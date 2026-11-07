/**
 * @vitest-environment jsdom
 *
 * Proves Pack filter enablement from dataset fixtures (empty / single / mixed).
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
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

describe('ResourcesCatalogPage integration (#59)', () => {
	it('empty fixture: only All enabled', () => {
		const { getByRole } = render(ResourcesCatalogPageA11yHarness, {
			props: { rows: [...RESOURCES_CATALOG_EMPTY] }
		});

		expect(tabDisabled(getByRole('tab', { name: 'All' }))).toBe(false);
		expect(tabDisabled(getByRole('tab', { name: 'Videos' }))).toBe(true);
		expect(tabDisabled(getByRole('tab', { name: 'Documents' }))).toBe(true);
		expect(tabDisabled(getByRole('tab', { name: 'Lessons' }))).toBe(true);
		expect(tabDisabled(getByRole('tab', { name: 'Archive' }))).toBe(true);
	});

	it('videos-only fixture: All + Videos enabled; other types disabled', () => {
		const { getByRole, getByText } = render(ResourcesCatalogPageA11yHarness, {
			props: { rows: [...RESOURCES_CATALOG_VIDEOS_ONLY] }
		});

		expect(tabDisabled(getByRole('tab', { name: 'All' }))).toBe(false);
		expect(tabDisabled(getByRole('tab', { name: 'Videos' }))).toBe(false);
		expect(tabDisabled(getByRole('tab', { name: 'Documents' }))).toBe(true);
		expect(getByText('Intro to Pack')).toBeTruthy();
	});

	it('mixed fixture: types present in the dataset are enabled', () => {
		const { getByRole, getByText } = render(ResourcesCatalogPageA11yHarness, {
			props: { rows: [...RESOURCES_CATALOG_MIXED] }
		});

		expect(tabDisabled(getByRole('tab', { name: 'Videos' }))).toBe(false);
		expect(tabDisabled(getByRole('tab', { name: 'Documents' }))).toBe(false);
		expect(tabDisabled(getByRole('tab', { name: 'Lessons' }))).toBe(false);
		expect(tabDisabled(getByRole('tab', { name: 'Archive' }))).toBe(false);
		expect(getByText('Design tokens')).toBeTruthy();
		expect(getByText('Mentorship 101')).toBeTruthy();
	});
});
