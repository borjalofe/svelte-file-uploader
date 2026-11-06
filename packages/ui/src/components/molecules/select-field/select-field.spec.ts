import { describe, expect, it } from 'vitest';
import {
	resolveSelectFieldError,
	resolveSelectFieldRoot,
	selectFieldErrorBaseClass,
	selectFieldRootBaseClass
} from './select-field.js';

describe('SelectField molecule (#44)', () => {
	it('uses semantic layout and destructive error tokens (no raw hex)', () => {
		const root = resolveSelectFieldRoot();
		expect(root.className).toContain('flex-col');
		expect(root.className).toContain('gap-2');
		expect(root.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(selectFieldRootBaseClass).toContain('w-full');

		const error = resolveSelectFieldError();
		expect(error.className).toContain('text-destructive');
		expect(error.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(selectFieldErrorBaseClass).toContain('text-sm');
	});

	it('merges extra class names', () => {
		expect(resolveSelectFieldRoot({ class: 'max-w-sm' }).className).toContain('max-w-sm');
		expect(resolveSelectFieldError({ class: 'mt-1' }).className).toContain('mt-1');
	});
});
