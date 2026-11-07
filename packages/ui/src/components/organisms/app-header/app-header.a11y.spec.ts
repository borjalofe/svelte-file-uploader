/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import AppHeaderA11yHarness from './AppHeaderA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('AppHeader organism a11y (#48)', () => {
	it('exposes banner, primary nav, and avatar name without axe violations', async () => {
		const { container, getByRole } = render(AppHeaderA11yHarness);

		expect(getByRole('banner')).toBeTruthy();
		expect(getByRole('navigation', { name: 'Primary' })).toBeTruthy();
		expect(getByRole('link', { name: 'Resources' }).getAttribute('aria-current')).toBe('page');
		expect(getByRole('img', { name: 'Ada Lovelace' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});
});
