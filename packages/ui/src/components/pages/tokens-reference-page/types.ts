import type { HTMLAttributes } from 'svelte/elements';
import type { ClassValue, WithElementRef } from '../../../lib/utils.js';

export type TokenSwatchKind = 'color' | 'space' | 'radius';

export type TokenSwatch = {
	/** CSS custom property name including leading `--` (e.g. `--primary`). */
	cssVar: string;
	/** Short label for the swatch. */
	label: string;
	kind: TokenSwatchKind;
};

export type TokensReferencePageProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
	class?: ClassValue;
};
