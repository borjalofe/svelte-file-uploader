import { describe, expect, it } from 'vitest';
import {
	filePickerFieldControlsBaseClass,
	filePickerFieldErrorBaseClass,
	filePickerFieldRootBaseClass,
	resolveFilePickerFieldControls,
	resolveFilePickerFieldError,
	resolveFilePickerFieldRoot
} from './file-picker-field.js';

describe('FilePickerField molecule (#45)', () => {
	it('uses semantic layout and destructive error tokens (no raw hex)', () => {
		const root = resolveFilePickerFieldRoot();
		expect(root.className).toContain('flex-col');
		expect(root.className).toContain('gap-2');
		expect(root.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(filePickerFieldRootBaseClass).toContain('w-full');

		const controls = resolveFilePickerFieldControls();
		expect(controls.className).toContain('items-center');
		expect(controls.className).toContain('gap-2');
		expect(filePickerFieldControlsBaseClass).toContain('flex');

		const error = resolveFilePickerFieldError();
		expect(error.className).toContain('text-destructive');
		expect(error.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(filePickerFieldErrorBaseClass).toContain('text-sm');
	});

	it('merges extra class names', () => {
		expect(resolveFilePickerFieldRoot({ class: 'max-w-sm' }).className).toContain('max-w-sm');
		expect(resolveFilePickerFieldControls({ class: 'flex-wrap' }).className).toContain('flex-wrap');
	});
});
