import { describe, expect, it } from 'vitest';
import {
	UPLOAD_CATEGORY_OPTIONS,
	UPLOAD_LANGUAGE_OPTIONS,
	UPLOAD_PROVIDER_OPTIONS,
	resolveUploadResourceDialogForm
} from './upload-resource-dialog.js';

describe('UploadResourceDialog organism (#51)', () => {
	it('ships English demo Category, Language, and Provider options', () => {
		expect(UPLOAD_CATEGORY_OPTIONS.some((o) => o.label === 'Conflict Resolution')).toBe(true);
		expect(UPLOAD_LANGUAGE_OPTIONS[0]).toEqual({ value: 'en', label: 'English' });
		expect(UPLOAD_PROVIDER_OPTIONS.some((o) => o.value === 'pack')).toBe(true);
	});

	it('resolves form layout class without raw hex', () => {
		const form = resolveUploadResourceDialogForm({ class: 'max-w-lg' });
		expect(form.className).toContain('max-w-lg');
		expect(form.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
	});
});
