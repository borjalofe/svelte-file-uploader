import { type ClassValue, cn } from '../../../lib/utils.js';
import type { UploadResourcePayload } from '../../organisms/upload-resource-dialog/types.js';

/**
 * Pack UploadResourceDemoPage — DashboardShell + UploadResourceDialog + success Toast.
 * Mock upload only (no API). Success copy matches Pack screenshot toast.
 */
export const UPLOAD_SUCCESS_TOAST_MESSAGE = 'Resource Uploaded Successfully!';

export const uploadResourceDemoPageRootBaseClass = 'relative flex w-full min-w-0 flex-col gap-4';

export const uploadResourceDemoPageIntroBaseClass = 'text-muted-foreground text-sm';

/** Mock upload handler contract: close dialog + fire success toast message. */
export function resolveMockUploadSuccess(payload: UploadResourcePayload): {
	shouldCloseDialog: boolean;
	toastMessage: string;
	payload: UploadResourcePayload;
} {
	return {
		shouldCloseDialog: true,
		toastMessage: UPLOAD_SUCCESS_TOAST_MESSAGE,
		payload
	};
}

export function resolveUploadResourceDemoPageRoot({
	class: className
}: { class?: ClassValue } = {}): { className: string } {
	return { className: cn(uploadResourceDemoPageRootBaseClass, className) };
}
