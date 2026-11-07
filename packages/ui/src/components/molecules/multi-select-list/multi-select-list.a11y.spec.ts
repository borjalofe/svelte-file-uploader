/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import MultiSelectListA11yHarness from './MultiSelectListA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('MultiSelectList molecule a11y (#46)', () => {
	it('exposes a labeled group with role checkboxes and no axe violations', async () => {
		const { container, getByLabelText, getByText } = render(MultiSelectListA11yHarness, {
			props: { label: 'Role', id: 'role-empty' }
		});

		expect(getByText('Role')).toBeTruthy();
		expect(getByLabelText('Mentor / Coach')).toBeTruthy();
		expect(getByLabelText('Mentee / Coachee')).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('announces error text when invalid', async () => {
		const { container, getByRole } = render(MultiSelectListA11yHarness, {
			props: {
				label: 'Role',
				id: 'role-invalid',
				invalid: true,
				error: 'Select at least one role'
			}
		});

		expect(getByRole('alert').textContent).toContain('Select at least one role');
		expect(await axe(container)).toHaveNoViolations();
	});

	it('disables options when the list is disabled', async () => {
		const { container, getByLabelText } = render(MultiSelectListA11yHarness, {
			props: { label: 'Role', id: 'role-disabled', disabled: true }
		});

		const mentor = getByLabelText('Mentor / Coach') as HTMLButtonElement;
		expect(
			mentor.disabled ||
				mentor.getAttribute('data-disabled') === 'true' ||
				mentor.getAttribute('aria-disabled') === 'true' ||
				mentor.hasAttribute('disabled')
		).toBe(true);
		expect(await axe(container)).toHaveNoViolations();
	});
});
