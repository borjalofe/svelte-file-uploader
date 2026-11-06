/**
 * @vitest-environment jsdom
 */
import { cleanup, render, waitFor } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { toast } from './index.js';
import ToastSonnerA11yHarness from './ToastSonnerA11yHarness.svelte';

afterEach(() => {
	cleanup();
	toast.dismiss();
});

describe('Toast (Sonner) atom a11y (#40)', () => {
	it('mounts the notifications region without axe violations', async () => {
		const { container, getByLabelText } = render(ToastSonnerA11yHarness);

		expect(getByLabelText(/Notifications/i)).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('shows Pack success toast content without axe violations', async () => {
		const { container, findByText } = render(ToastSonnerA11yHarness, {
			props: {
				fireSuccess: true,
				message: 'Resource Uploaded Successfully!'
			}
		});

		expect(await findByText('Resource Uploaded Successfully!')).toBeTruthy();
		await waitFor(async () => {
			expect(await axe(container)).toHaveNoViolations();
		});
	});
});
