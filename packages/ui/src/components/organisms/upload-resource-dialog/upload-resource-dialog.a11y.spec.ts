/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import UploadResourceDialogA11yHarness from './UploadResourceDialogA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('UploadResourceDialog organism a11y (#51)', () => {
	it('closed trigger is named Upload without axe violations', async () => {
		const { container, getByRole } = render(UploadResourceDialogA11yHarness, {
			props: { open: false }
		});

		expect(getByRole('button', { name: 'Upload' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('open dialog exposes titled dialog, form fields, and Upload CTA', async () => {
		const onUpload = vi.fn();
		const { container, getByRole, getByLabelText } = render(UploadResourceDialogA11yHarness, {
			props: { open: true, onUpload }
		});

		expect(getByRole('dialog', { name: 'Upload Resource' })).toBeTruthy();
		expect(getByLabelText(/Title/)).toBeTruthy();
		expect(getByLabelText(/Description/)).toBeTruthy();
		expect(getByLabelText(/File/)).toBeTruthy();

		const uploadButtons = getByRole('dialog').querySelectorAll(
			'[data-slot="upload-resource-dialog-upload"]'
		);
		expect(uploadButtons.length).toBe(1);
		(uploadButtons[0] as HTMLButtonElement).click();
		expect(onUpload).toHaveBeenCalledTimes(1);
		expect(onUpload.mock.calls[0][0]).toMatchObject({
			title: '',
			description: '',
			roles: []
		});

		expect(await axe(container)).toHaveNoViolations();
	});
});
