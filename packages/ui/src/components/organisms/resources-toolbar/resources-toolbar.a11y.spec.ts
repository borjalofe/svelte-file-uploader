/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import ResourcesToolbarA11yHarness from './ResourcesToolbarA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('ResourcesToolbar organism a11y (#49)', () => {
	it('exposes labeled tabs, search, and Upload with only All enabled when empty', async () => {
		const { container, getByLabelText, getByRole } = render(ResourcesToolbarA11yHarness, {
			props: { counts: {} }
		});

		expect(getByLabelText('Resource type')).toBeTruthy();
		expect(getByLabelText('Search')).toBeTruthy();
		expect(getByRole('button', { name: 'Upload' })).toBeTruthy();

		const videos = getByRole('tab', { name: 'Videos' }) as HTMLButtonElement;
		expect(
			videos.disabled ||
				videos.getAttribute('data-disabled') === 'true' ||
				videos.getAttribute('aria-disabled') === 'true' ||
				videos.hasAttribute('disabled')
		).toBe(true);

		const all = getByRole('tab', { name: 'All' }) as HTMLButtonElement;
		expect(
			all.disabled ||
				all.getAttribute('data-disabled') === 'true' ||
				all.getAttribute('aria-disabled') === 'true'
		).toBe(false);

		expect(await axe(container)).toHaveNoViolations();
	});

	it('enables Videos when counts include videos', async () => {
		const { container, getByRole } = render(ResourcesToolbarA11yHarness, {
			props: { counts: { videos: 2 } }
		});

		const videos = getByRole('tab', { name: 'Videos' }) as HTMLButtonElement;
		expect(
			videos.disabled ||
				videos.getAttribute('data-disabled') === 'true' ||
				videos.getAttribute('aria-disabled') === 'true' ||
				videos.hasAttribute('disabled')
		).toBe(false);

		const documents = getByRole('tab', { name: 'Documents' }) as HTMLButtonElement;
		expect(
			documents.disabled ||
				documents.getAttribute('data-disabled') === 'true' ||
				documents.getAttribute('aria-disabled') === 'true' ||
				documents.hasAttribute('disabled')
		).toBe(true);

		expect(await axe(container)).toHaveNoViolations();
	});
});
