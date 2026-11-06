import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * shadcn-svelte new-york Textarea base classes (Tailwind v4 / CSS variables).
 * Pack multiline fields: border-input, ring focus — no raw hex/spacing literals.
 */
export const textareaBaseClass =
	'flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40';

export type ResolvedTextarea = {
	className: string;
};

/** Map Textarea props to semantic-token class lists. */
export function resolveTextarea({
	class: className
}: { class?: ClassValue } = {}): ResolvedTextarea {
	return {
		className: cn(textareaBaseClass, className)
	};
}
