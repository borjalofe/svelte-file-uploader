/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import InputA11yHarness from './InputA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('Input atom a11y (#28)', () => {
	it('associates a visible label and has no axe violations', async () => {
		const { container, getByLabelText } = render(InputA11yHarness, {
			props: { label: 'Resource title', id: 'resource-title' }
		});

		expect(getByLabelText('Resource title')).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('exposes disabled state without axe violations', async () => {
		const { container, getByLabelText } = render(InputA11yHarness, {
			props: { label: 'Search', id: 'search-field', disabled: true }
		});

		const input = getByLabelText('Search') as HTMLInputElement;
		expect(input.disabled).toBe(true);
		expect(await axe(container)).toHaveNoViolations();
	});

	it('supports invalid state with accessible name', async () => {
		const { container, getByLabelText } = render(InputA11yHarness, {
			props: {
				label: 'Email',
				id: 'email-field',
				type: 'email',
				'aria-invalid': 'true'
			}
		});

		expect(getByLabelText('Email').getAttribute('aria-invalid')).toBe('true');
		expect(await axe(container)).toHaveNoViolations();
	});
});
