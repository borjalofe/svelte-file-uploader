/** Nest API origin for browser fetches (`PUBLIC_API_URL`, default localhost:3000). */
export function getPublicApiUrl(): string {
	const configured =
		typeof import.meta !== 'undefined' ? String(import.meta.env.PUBLIC_API_URL ?? '').trim() : '';
	return configured.length > 0 ? configured.replace(/\/$/, '') : 'http://localhost:3000';
}
