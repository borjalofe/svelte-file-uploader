import { getPublicApiUrl } from './config.js';

/** Absolute URL for `GET /resources/:id/file`. */
export function resourceFileUrl(id: string): string {
	return new URL(`/resources/${encodeURIComponent(id)}/file`, `${getPublicApiUrl()}/`).href;
}

export type FetchedResourceFile = {
	blob: Blob;
	mimeType: string;
	objectUrl: string;
};

/** Fetch the stored object as a blob + object URL (caller must revoke). */
export async function fetchResourceFile(
	id: string,
	fetchImpl: typeof fetch = fetch
): Promise<FetchedResourceFile> {
	const response = await fetchImpl(resourceFileUrl(id));
	if (!response.ok) {
		throw new Error(`Failed to open resource file (${response.status})`);
	}

	const blob = await response.blob();
	const mimeType = blob.type || response.headers.get('content-type') || 'application/octet-stream';
	return {
		blob,
		mimeType,
		objectUrl: URL.createObjectURL(blob)
	};
}

/**
 * Fetch the stored object by resource id and trigger a download / new tab.
 * Callers show success Toast after this resolves.
 */
export async function openResourceFile(
	id: string,
	filename: string,
	fetchImpl: typeof fetch = fetch
): Promise<void> {
	const file = await fetchResourceFile(id, fetchImpl);
	try {
		const anchor = document.createElement('a');
		anchor.href = file.objectUrl;
		anchor.download = filename || 'resource';
		anchor.rel = 'noopener';
		anchor.target = '_blank';
		document.body.appendChild(anchor);
		anchor.click();
		anchor.remove();
	} finally {
		URL.revokeObjectURL(file.objectUrl);
	}
}
