/**
 * @vitest-environment jsdom
 *
 * Page-level integration: mount TokensReferencePage and assert live swatch
 * surfaces bind shipped CSS variables (no dedicated CI job until #57).
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import TokensReferencePageA11yHarness from './TokensReferencePageA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('TokensReferencePage integration (#58)', () => {
	it('renders live swatches bound to shipped CSS variables', () => {
		const { container, getByText } = render(TokensReferencePageA11yHarness);

		expect(getByText('--primary')).toBeTruthy();
		expect(getByText('--success')).toBeTruthy();
		expect(getByText('--space-4')).toBeTruthy();
		expect(getByText('--radius')).toBeTruthy();

		const primary = container.querySelector('[data-token="--primary"]');
		expect(primary).toBeTruthy();
		const surface = primary?.querySelector('[aria-hidden="true"]') as HTMLElement | null;
		expect(surface?.getAttribute('style') ?? '').toContain('var(--primary)');
	});
});
