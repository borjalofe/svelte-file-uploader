import { getPublicApiUrl } from './config.js';

/** Absolute URL for `GET /resources/:id/file`. */
export function resourceFileUrl(id: string): string {
	return new URL(`/resources/${encodeURIComponent(id)}/file`, `${getPublicApiUrl()}/`).href;
}

/**
 * Fetch the stored object by resource id and open it (download / new tab).
 * Callers show success Toast after this resolves.
 */
export async function openResourceFile(
	id: string,
	filename: string,
	fetchImpl: typeof fetch = fetch
): Promise<void> {
	const response = await fetchImpl(resourceFileUrl(id));
	if (!response.ok) {
		throw new Error(`Failed to open resource file (${response.status})`);
	}

	const blob = await response.blob();
	const objectUrl = URL.createObjectURL(blob);
	try {
		const anchor = document.createElement('a');
		anchor.href = objectUrl;
		anchor.download = filename || 'resource';
		anchor.rel = 'noopener';
		anchor.target = '_blank';
		document.body.appendChild(anchor);
		anchor.click();
		anchor.remove();
	} finally {
		URL.revokeObjectURL(objectUrl);
	}
}
