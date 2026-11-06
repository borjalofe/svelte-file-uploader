/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import TabsA11yHarness from './TabsA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('Tabs atom a11y (#35)', () => {
	it('exposes a tablist with named tabs and has no axe violations', async () => {
		const { container, getByRole } = render(TabsA11yHarness);

		expect(getByRole('tablist', { name: 'Resource type' })).toBeTruthy();
		expect(getByRole('tab', { name: 'All' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('marks a disabled trigger as not enabled', async () => {
		const { container, getByRole } = render(TabsA11yHarness, {
			props: { disableVideos: true }
		});

		const videos = getByRole('tab', { name: 'Videos' }) as HTMLButtonElement;
		expect(videos.disabled).toBe(true);
		expect(await axe(container)).toHaveNoViolations();
	});
});
