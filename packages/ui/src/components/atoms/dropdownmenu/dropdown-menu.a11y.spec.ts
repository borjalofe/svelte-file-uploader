/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import DropdownMenuA11yHarness from './DropdownMenuA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('DropdownMenu atom a11y (#37)', () => {
	it('exposes a named menu trigger and has no axe violations when closed', async () => {
		const { container, getByRole } = render(DropdownMenuA11yHarness);

		expect(getByRole('button', { name: 'Open menu' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});
});
