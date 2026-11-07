/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import TokensReferencePageA11yHarness from './TokensReferencePageA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('TokensReferencePage a11y (#58)', () => {
	it('exposes catalog nav and token sections without axe violations', async () => {
		const { container, getByRole } = render(TokensReferencePageA11yHarness);

		expect(getByRole('navigation', { name: 'Design system' })).toBeTruthy();
		expect(getByRole('heading', { name: 'Tokens', level: 1 })).toBeTruthy();
		expect(getByRole('heading', { name: 'Color', level: 2 })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});
});
