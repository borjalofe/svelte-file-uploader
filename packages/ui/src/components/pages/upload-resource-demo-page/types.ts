import type { ClassValue } from '../../../lib/utils.js';

/** Page props stay narrow — avoid HTML attribute collisions with composed shells. */
export type UploadResourceDemoPageProps = {
	ref?: HTMLElement | null;
	class?: ClassValue;
	/** Controls UploadResourceDialog visibility (stories / demos). */
	dialogOpen?: boolean;
};
