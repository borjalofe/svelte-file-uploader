import type { ClassValue } from '../../../lib/utils.js';

export type TokenSwatchKind = 'color' | 'space' | 'radius';

export type TokenSwatch = {
	/** CSS custom property name including leading `--` (e.g. `--primary`). */
	cssVar: string;
	/** Short label for the swatch. */
	label: string;
	kind: TokenSwatchKind;
};

/** Page props stay narrow — avoid HTML `title` colliding with DsCatalogLayout. */
export type TokensReferencePageProps = {
	ref?: HTMLElement | null;
	class?: ClassValue;
};
