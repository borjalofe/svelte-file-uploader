/**
 * Page-level integration (CI job `integration` / `pnpm integration`).
 * Node-safe: mock upload success contract (dialog close + Pack toast copy).
 */
import { describe, expect, it } from 'vitest';
import {
	UPLOAD_SUCCESS_TOAST_MESSAGE,
	resolveMockUploadSuccess
} from './upload-resource-demo-page.js';

describe('UploadResourceDemoPage integration (#60)', () => {
	it('keeps the mock success toast path wired for FilePickerField uploads', () => {
		const result = resolveMockUploadSuccess({
			title: 'Conflict Resolution Basics',
			description: 'Intro',
			category: 'conflict-resolution',
			language: 'en',
			provider: 'pack',
			roles: ['mentor-coach'],
			filename: 'conflict-basics.pdf',
			files: undefined
		});

		expect(result.shouldCloseDialog).toBe(true);
		expect(result.toastMessage).toBe(UPLOAD_SUCCESS_TOAST_MESSAGE);
		expect(result.payload.filename).toBe('conflict-basics.pdf');
		expect(UPLOAD_SUCCESS_TOAST_MESSAGE).toMatch(/Resource Uploaded Successfully/);
	});
});
