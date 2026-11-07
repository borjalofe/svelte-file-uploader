/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import ResourcesDataTableA11yHarness from './ResourcesDataTableA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('ResourcesDataTable organism a11y (#50)', () => {
	it('exposes a labeled table and row action triggers without axe violations', async () => {
		const { container, getByRole, getAllByRole } = render(ResourcesDataTableA11yHarness);

		expect(getByRole('table', { name: 'Uploaded content' })).toBeTruthy();
		expect(getByRole('columnheader', { name: /Content Title/i })).toBeTruthy();
		expect(getAllByRole('button', { name: /Actions for/i }).length).toBeGreaterThan(0);
		expect(await axe(container)).toHaveNoViolations();
	});
});
