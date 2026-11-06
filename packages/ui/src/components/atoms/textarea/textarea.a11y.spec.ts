/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import TextareaA11yHarness from './TextareaA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('Textarea atom a11y (#30)', () => {
	it('associates a visible label and has no axe violations', async () => {
		const { container, getByLabelText } = render(TextareaA11yHarness, {
			props: { label: 'Resource description', id: 'resource-description' }
		});

		expect(getByLabelText('Resource description')).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('exposes disabled state without axe violations', async () => {
		const { container, getByLabelText } = render(TextareaA11yHarness, {
			props: { label: 'Notes', id: 'notes-field', disabled: true }
		});

		const textarea = getByLabelText('Notes') as HTMLTextAreaElement;
		expect(textarea.disabled).toBe(true);
		expect(await axe(container)).toHaveNoViolations();
	});

	it('supports invalid state with accessible name', async () => {
		const { container, getByLabelText } = render(TextareaA11yHarness, {
			props: {
				label: 'Description',
				id: 'description-field',
				'aria-invalid': 'true'
			}
		});

		expect(getByLabelText('Description').getAttribute('aria-invalid')).toBe('true');
		expect(await axe(container)).toHaveNoViolations();
	});
});
