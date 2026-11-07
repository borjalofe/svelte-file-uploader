import { describe, expect, it } from 'vitest';
import {
	UPLOAD_SUCCESS_TOAST_MESSAGE,
	resolveMockUploadSuccess,
	resolveUploadResourceDemoPageRoot
} from './upload-resource-demo-page.js';

describe('UploadResourceDemoPage (#60)', () => {
	it('resolves mock upload success without inventing raw brand hex', () => {
		expect(UPLOAD_SUCCESS_TOAST_MESSAGE).toBe('Resource Uploaded Successfully!');

		const result = resolveMockUploadSuccess({
			title: 'Demo',
			description: 'Desc',
			category: 'videos',
			language: 'en',
			provider: 'pack',
			roles: ['mentor-coach'],
			filename: 'demo.pdf',
			files: undefined
		});

		expect(result.shouldCloseDialog).toBe(true);
		expect(result.toastMessage).toBe(UPLOAD_SUCCESS_TOAST_MESSAGE);
		expect(result.payload.filename).toBe('demo.pdf');

		const root = resolveUploadResourceDemoPageRoot({ class: 'mt-2' });
		expect(root.className).toContain('mt-2');
		expect(root.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
	});
});
