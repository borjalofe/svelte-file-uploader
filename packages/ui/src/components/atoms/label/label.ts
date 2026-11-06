import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * shadcn-svelte new-york Label base classes (Tailwind v4 / CSS variables).
 * Pack form labels: medium weight, semantic foreground — no raw hex.
 */
export const labelBaseClass =
	'flex items-center gap-2 text-sm leading-none font-medium text-foreground select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50';

export type ResolvedLabel = {
	className: string;
};

/** Map Label props to semantic-token class lists. */
export function resolveLabel({ class: className }: { class?: ClassValue } = {}): ResolvedLabel {
	return {
		className: cn(labelBaseClass, className)
	};
}
