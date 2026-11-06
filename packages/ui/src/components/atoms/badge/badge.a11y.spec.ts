/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import BadgeA11yHarness from './BadgeA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('Badge atom a11y (#32)', () => {
	it('renders Pack secondary pill with no axe violations', async () => {
		const { container, getByText } = render(BadgeA11yHarness, {
			props: { label: 'Video', variant: 'secondary' }
		});

		expect(getByText('Video')).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('renders default and destructive variants without axe violations', async () => {
		const { container: defaultContainer } = render(BadgeA11yHarness, {
			props: { label: 'New', variant: 'default' }
		});
		expect(await axe(defaultContainer)).toHaveNoViolations();
		cleanup();

		const { container: destructiveContainer } = render(BadgeA11yHarness, {
			props: { label: 'Failed', variant: 'destructive' }
		});
		expect(await axe(destructiveContainer)).toHaveNoViolations();
	});

	it('supports link badges without axe violations', async () => {
		const { container, getByRole } = render(BadgeA11yHarness, {
			props: { label: 'Provider', variant: 'outline', href: '#provider' }
		});

		expect(getByRole('link', { name: 'Provider' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});
});
