import { type ClassValue, cn } from '../../../lib/utils.js';
import type { TokenSwatch } from './types.js';

/**
 * Pack TokensReferencePage — live swatches for shipped theme tokens only.
 * Catalog mirrors `packages/tokens` emit (`:root` / `@theme`); do not invent paths.
 */

export const tokensReferencePageRootBaseClass = 'flex w-full min-w-0 flex-col gap-8';

export const tokensReferencePageSectionBaseClass = 'flex flex-col gap-3';

export const tokensReferencePageGridBaseClass =
	'grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-3';

export const tokensReferencePageSwatchCardBaseClass =
	'border-border bg-card text-card-foreground flex flex-col gap-2 rounded-[var(--radius)] border p-2';

export const tokensReferencePageSwatchSurfaceBaseClass =
	'border-border h-12 w-full rounded-[var(--radius)] border';

/** Shipped semantic + extension color shorts from theme emit. */
export const SHIPPED_COLOR_SWATCHES: TokenSwatch[] = [
	{ cssVar: '--background', label: 'background', kind: 'color' },
	{ cssVar: '--foreground', label: 'foreground', kind: 'color' },
	{ cssVar: '--card', label: 'card', kind: 'color' },
	{ cssVar: '--card-foreground', label: 'card-foreground', kind: 'color' },
	{ cssVar: '--popover', label: 'popover', kind: 'color' },
	{ cssVar: '--popover-foreground', label: 'popover-foreground', kind: 'color' },
	{ cssVar: '--primary', label: 'primary', kind: 'color' },
	{ cssVar: '--primary-foreground', label: 'primary-foreground', kind: 'color' },
	{ cssVar: '--secondary', label: 'secondary', kind: 'color' },
	{ cssVar: '--secondary-foreground', label: 'secondary-foreground', kind: 'color' },
	{ cssVar: '--muted', label: 'muted', kind: 'color' },
	{ cssVar: '--muted-foreground', label: 'muted-foreground', kind: 'color' },
	{ cssVar: '--accent', label: 'accent', kind: 'color' },
	{ cssVar: '--accent-foreground', label: 'accent-foreground', kind: 'color' },
	{ cssVar: '--destructive', label: 'destructive', kind: 'color' },
	{ cssVar: '--destructive-foreground', label: 'destructive-foreground', kind: 'color' },
	{ cssVar: '--border', label: 'border', kind: 'color' },
	{ cssVar: '--input', label: 'input', kind: 'color' },
	{ cssVar: '--ring', label: 'ring', kind: 'color' },
	{ cssVar: '--success', label: 'success', kind: 'color' },
	{ cssVar: '--success-foreground', label: 'success-foreground', kind: 'color' },
	{ cssVar: '--warning', label: 'warning', kind: 'color' },
	{ cssVar: '--warning-foreground', label: 'warning-foreground', kind: 'color' },
	{ cssVar: '--info', label: 'info', kind: 'color' },
	{ cssVar: '--info-foreground', label: 'info-foreground', kind: 'color' }
];

/** Shipped semantic space scale. */
export const SHIPPED_SPACE_SWATCHES: TokenSwatch[] = [
	{ cssVar: '--space-0', label: 'space-0', kind: 'space' },
	{ cssVar: '--space-1', label: 'space-1', kind: 'space' },
	{ cssVar: '--space-2', label: 'space-2', kind: 'space' },
	{ cssVar: '--space-3', label: 'space-3', kind: 'space' },
	{ cssVar: '--space-4', label: 'space-4', kind: 'space' },
	{ cssVar: '--space-5', label: 'space-5', kind: 'space' },
	{ cssVar: '--space-6', label: 'space-6', kind: 'space' },
	{ cssVar: '--space-8', label: 'space-8', kind: 'space' },
	{ cssVar: '--space-10', label: 'space-10', kind: 'space' },
	{ cssVar: '--space-12', label: 'space-12', kind: 'space' },
	{ cssVar: '--space-16', label: 'space-16', kind: 'space' }
];

/** Shipped semantic radius. */
export const SHIPPED_RADIUS_SWATCHES: TokenSwatch[] = [
	{ cssVar: '--radius', label: 'radius', kind: 'radius' }
];

export const SHIPPED_TOKEN_SWATCHES: TokenSwatch[] = [
	...SHIPPED_COLOR_SWATCHES,
	...SHIPPED_SPACE_SWATCHES,
	...SHIPPED_RADIUS_SWATCHES
];

/** Inline style for a live swatch surface (uses CSS vars — no raw hex). */
export function tokenSwatchSurfaceStyle(swatch: TokenSwatch): string {
	if (swatch.kind === 'color') {
		return `background-color: var(${swatch.cssVar});`;
	}
	if (swatch.kind === 'space') {
		return `width: var(${swatch.cssVar}); height: var(${swatch.cssVar}); min-height: 0.25rem; background-color: var(--primary);`;
	}
	return `width: 3rem; height: 3rem; background-color: var(--primary); border-radius: var(${swatch.cssVar});`;
}

export function resolveTokensReferencePageRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tokensReferencePageRootBaseClass, className) };
}
