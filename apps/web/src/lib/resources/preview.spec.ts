import { describe, expect, it } from 'vitest';
import { canPreviewInApp, previewKindForMime } from './preview.js';

describe('previewKindForMime (#86)', () => {
	it('maps browser-renderable MIME types to in-app kinds', () => {
		expect(previewKindForMime('application/pdf')).toBe('pdf');
		expect(previewKindForMime('text/plain')).toBe('text');
		expect(previewKindForMime('video/mp4')).toBe('video');
		expect(previewKindForMime('video/webm')).toBe('video');
		expect(previewKindForMime('image/png')).toBe('image');
		expect(previewKindForMime('image/jpeg')).toBe('image');
	});

	it('falls back to download for Office / unknown types', () => {
		expect(previewKindForMime('application/msword')).toBe('download');
		expect(
			previewKindForMime(
				'application/vnd.openxmlformats-officedocument.presentationml.presentation'
			)
		).toBe('download');
		expect(canPreviewInApp('application/pdf')).toBe(true);
		expect(canPreviewInApp('application/vnd.ms-powerpoint')).toBe(false);
	});
});
