/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import InputFieldA11yHarness from './InputFieldA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('InputField molecule a11y (#43)', () => {
	it('associates label and hint without axe violations', async () => {
		const { container, getByLabelText, getByText } = render(InputFieldA11yHarness, {
			props: {
				label: 'Title',
				id: 'resource-title',
				hint: 'Shown in the resources table'
			}
		});

		expect(getByLabelText(/Title/)).toBeTruthy();
		expect(getByText('Shown in the resources table')).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('exposes error via alert and aria-invalid without axe violations', async () => {
		const { container, getByLabelText, getByRole } = render(InputFieldA11yHarness, {
			props: {
				label: 'Title',
				id: 'resource-title-error',
				required: true,
				error: 'Title is required'
			}
		});

		const control = getByLabelText(/Title/);
		expect(control.getAttribute('aria-invalid')).toBe('true');
		expect(getByRole('alert').textContent).toContain('Title is required');
		expect(await axe(container)).toHaveNoViolations();
	});

	it('supports disabled textarea control without axe violations', async () => {
		const { container, getByLabelText } = render(InputFieldA11yHarness, {
			props: {
				label: 'Description',
				id: 'resource-description',
				control: 'textarea',
				disabled: true,
				value: 'Locked notes'
			}
		});

		const control = getByLabelText('Description') as HTMLTextAreaElement;
		expect(control.disabled).toBe(true);
		expect(await axe(container)).toHaveNoViolations();
	});
});
