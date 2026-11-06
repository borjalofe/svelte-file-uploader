/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import SearchFieldA11yHarness from './SearchFieldA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('SearchField molecule a11y (#42)', () => {
	it('exposes a labeled search control and has no axe violations', async () => {
		const { container, getByRole } = render(SearchFieldA11yHarness, {
			props: { label: 'Search', inputId: 'search-empty' }
		});

		const input = getByRole('searchbox', { name: 'Search' }) as HTMLInputElement;
		expect(input).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('keeps accessible name when disabled or invalid', async () => {
		const { container, getByRole, rerender } = render(SearchFieldA11yHarness, {
			props: { label: 'Search', inputId: 'search-disabled', disabled: true }
		});

		expect((getByRole('searchbox', { name: 'Search' }) as HTMLInputElement).disabled).toBe(true);
		expect(await axe(container)).toHaveNoViolations();

		await rerender({
			label: 'Search',
			inputId: 'search-invalid',
			disabled: false,
			invalid: true
		});
		expect(getByRole('searchbox', { name: 'Search' }).getAttribute('aria-invalid')).toBe('true');
		expect(await axe(container)).toHaveNoViolations();
	});
});
