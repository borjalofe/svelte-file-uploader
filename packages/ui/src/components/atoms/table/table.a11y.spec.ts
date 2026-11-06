/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import TableA11yHarness from './TableA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('Table atom a11y (#38)', () => {
	it('exposes a named table with column headers and no axe violations', async () => {
		const { container, getByRole } = render(TableA11yHarness, {
			props: { caption: 'Resources' }
		});

		expect(getByRole('table', { name: 'Resources' })).toBeTruthy();
		expect(getByRole('columnheader', { name: 'Title' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('keeps accessible name when a row is selected', async () => {
		const { container, getByRole } = render(TableA11yHarness, {
			props: { caption: 'Uploaded content', selected: true }
		});

		expect(getByRole('table', { name: 'Uploaded content' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});
});
