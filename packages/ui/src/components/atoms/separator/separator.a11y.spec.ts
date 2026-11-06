/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import SeparatorA11yHarness from './SeparatorA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('Separator atom a11y (#34)', () => {
	it('decorative horizontal separator has no axe violations', async () => {
		const { container } = render(SeparatorA11yHarness, {
			props: { orientation: 'horizontal', decorative: true }
		});

		expect(await axe(container)).toHaveNoViolations();
	});

	it('semantic separator exposes role without axe violations', async () => {
		const { container, getByRole } = render(SeparatorA11yHarness, {
			props: { orientation: 'horizontal', decorative: false }
		});

		expect(getByRole('separator')).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('vertical orientation has no axe violations', async () => {
		const { container, getByRole } = render(SeparatorA11yHarness, {
			props: { orientation: 'vertical', decorative: false }
		});

		expect(getByRole('separator').getAttribute('aria-orientation')).toBe('vertical');
		expect(await axe(container)).toHaveNoViolations();
	});
});
