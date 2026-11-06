/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import DialogA11yHarness from './DialogA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('Dialog atom a11y (#36)', () => {
	it('closed dialog trigger has accessible name and no axe violations', async () => {
		const { container, getByRole } = render(DialogA11yHarness, {
			props: { open: false }
		});

		expect(getByRole('button', { name: 'Upload' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('open dialog exposes dialog role named by title without axe violations', async () => {
		const { container, getByRole } = render(DialogA11yHarness, {
			props: { open: true, title: 'Upload Resource' }
		});

		expect(getByRole('dialog', { name: 'Upload Resource' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});
});
