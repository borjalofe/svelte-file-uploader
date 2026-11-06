/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import FilePickerFieldA11yHarness from './FilePickerFieldA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('FilePickerField molecule a11y (#45)', () => {
	it('exposes a labeled filename field and Select file button', async () => {
		const { container, getByRole, getByLabelText } = render(FilePickerFieldA11yHarness, {
			props: { label: 'File', inputId: 'file-empty' }
		});

		expect(getByLabelText('File')).toBeTruthy();
		expect(getByRole('button', { name: 'Select file' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('announces error text when invalid', async () => {
		const { container, getByRole } = render(FilePickerFieldA11yHarness, {
			props: {
				label: 'File',
				inputId: 'file-invalid',
				invalid: true,
				error: 'Choose a file'
			}
		});

		expect(getByRole('alert').textContent).toContain('Choose a file');
		expect(await axe(container)).toHaveNoViolations();
	});

	it('keeps controls disabled when disabled', async () => {
		const { container, getByRole, getByLabelText } = render(FilePickerFieldA11yHarness, {
			props: {
				label: 'File',
				inputId: 'file-disabled',
				disabled: true,
				filename: 'locked.pdf'
			}
		});

		expect((getByLabelText('File') as HTMLInputElement).disabled).toBe(true);
		expect((getByRole('button', { name: 'Select file' }) as HTMLButtonElement).disabled).toBe(true);
		expect(await axe(container)).toHaveNoViolations();
	});
});
