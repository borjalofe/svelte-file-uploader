import type { ResourceFileMimeType } from '@pack-challenge/domain';

export type PreviewKind = 'pdf' | 'text' | 'video' | 'image' | 'download';

/** In-app preview when the browser can render the MIME; Office/slides → download fallback. */
export function previewKindForMime(mimeType: string): PreviewKind {
	switch (mimeType as ResourceFileMimeType) {
		case 'application/pdf':
			return 'pdf';
		case 'text/plain':
			return 'text';
		case 'video/mp4':
		case 'video/webm':
			return 'video';
		case 'image/png':
		case 'image/jpeg':
			return 'image';
		default:
			return 'download';
	}
}

export function canPreviewInApp(mimeType: string): boolean {
	return previewKindForMime(mimeType) !== 'download';
}
