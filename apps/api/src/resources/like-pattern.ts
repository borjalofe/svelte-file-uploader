/** Escape `%` / `_` / `\` so user `q` is treated as a literal substring in ILIKE. */
export function toIlikeSubstring(q: string): string {
	const escaped = q.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_');
	return `%${escaped}%`;
}
