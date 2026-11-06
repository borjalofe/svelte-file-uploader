/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import CardA11yHarness from './CardA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('Card atom a11y (#39)', () => {
	it('renders titled content with a named action and has no axe violations', async () => {
		const { container, getByRole, getByText } = render(CardA11yHarness, {
			props: {
				title: 'Upload Resource',
				description: 'Add a new resource to the library.'
			}
		});

		expect(getByText('Upload Resource')).toBeTruthy();
		expect(getByRole('button', { name: 'Continue' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});
});
