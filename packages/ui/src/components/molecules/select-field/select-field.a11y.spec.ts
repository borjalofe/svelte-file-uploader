/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import SelectFieldA11yHarness from './SelectFieldA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('SelectField molecule a11y (#44)', () => {
	it('exposes a labeled combobox and has no axe violations', async () => {
		const { container, getByRole } = render(SelectFieldA11yHarness, {
			props: { label: 'Role', triggerId: 'role-empty' }
		});

		expect(getByRole('combobox', { name: 'Role' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('announces error text when invalid', async () => {
		const { container, getByRole } = render(SelectFieldA11yHarness, {
			props: {
				label: 'Role',
				triggerId: 'role-invalid',
				invalid: true,
				error: 'Choose a role'
			}
		});

		const trigger = getByRole('combobox', { name: 'Role' });
		expect(trigger.getAttribute('aria-invalid')).toBe('true');
		expect(getByRole('alert').textContent).toContain('Choose a role');
		expect(await axe(container)).toHaveNoViolations();
	});

	it('keeps accessible name when disabled', async () => {
		const { container, getByRole } = render(SelectFieldA11yHarness, {
			props: { label: 'Provider', triggerId: 'provider-disabled', disabled: true }
		});

		expect((getByRole('combobox', { name: 'Provider' }) as HTMLButtonElement).disabled).toBe(true);
		expect(await axe(container)).toHaveNoViolations();
	});
});
