import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * shadcn-svelte new-york Separator base classes (Tailwind v4 / CSS variables).
 * bits-ui exposes `data-orientation`; Pack chrome uses semantic `bg-border` — no raw hex.
 */
export const separatorBaseClass =
	'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px';

export type ResolvedSeparator = {
	className: string;
};

/** Map Separator props to semantic-token class lists. */
export function resolveSeparator({
	class: className
}: { class?: ClassValue } = {}): ResolvedSeparator {
	return {
		className: cn(separatorBaseClass, className)
	};
}
