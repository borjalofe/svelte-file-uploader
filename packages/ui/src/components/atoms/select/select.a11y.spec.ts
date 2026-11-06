/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import SelectA11yHarness from './SelectA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('Select atom a11y (#31)', () => {
	it('exposes an accessible name and has no axe violations when closed', async () => {
		const { container, getByRole } = render(SelectA11yHarness, {
			props: { label: 'Role', id: 'role-field' }
		});

		expect(getByRole('combobox', { name: 'Role' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('keeps accessible name when disabled', async () => {
		const { container, getByRole } = render(SelectA11yHarness, {
			props: { label: 'Provider', id: 'provider-field', disabled: true }
		});

		const trigger = getByRole('combobox', { name: 'Provider' }) as HTMLButtonElement;
		expect(trigger.disabled).toBe(true);
		expect(await axe(container)).toHaveNoViolations();
	});
});
