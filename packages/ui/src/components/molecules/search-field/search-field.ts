import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * Pack SearchField molecule — Input + leading search affordance.
 * Semantic muted icon + padded input; no raw hex/spacing literals.
 */
export const searchFieldRootBaseClass = 'relative flex w-full min-w-0 items-center';

export const searchFieldIconBaseClass =
	'text-muted-foreground pointer-events-none absolute start-3 size-4 shrink-0';

/** Extra Input classes so text clears the leading icon. */
export const searchFieldInputBaseClass = 'ps-9';

/** Map SearchField root props to semantic-token class lists. */
export function resolveSearchFieldRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(searchFieldRootBaseClass, className) };
}

/** Map SearchField input class overrides (icon gutter + caller classes). */
export function resolveSearchFieldInput({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(searchFieldInputBaseClass, className) };
}
