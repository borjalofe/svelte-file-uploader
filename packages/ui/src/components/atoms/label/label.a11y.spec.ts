/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import LabelA11yHarness from './LabelA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('Label atom a11y (#29)', () => {
	it('associates with a control and has no axe violations', async () => {
		const { container, getByLabelText } = render(LabelA11yHarness, {
			props: { label: 'Resource title', id: 'resource-title' }
		});

		expect(getByLabelText('Resource title')).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('keeps association when the control is disabled', async () => {
		const { container, getByLabelText } = render(LabelA11yHarness, {
			props: { label: 'Provider', id: 'provider-field', inputDisabled: true }
		});

		const input = getByLabelText('Provider') as HTMLInputElement;
		expect(input.disabled).toBe(true);
		expect(await axe(container)).toHaveNoViolations();
	});
});
