import type { VisuallyHiddenProps } from './types.js';

/** Tailwind utility that clips to an SR-only box (no raw px/rem in consumers). */
export const SR_ONLY_CLASS = 'sr-only';

/** Tailwind utility that restores visibility (paired with `sr-only` on focus). */
export const NOT_SR_ONLY_CLASS = 'not-sr-only';

export type ResolvedVisuallyHidden = {
	className: string;
	unhideOnFocus: boolean;
};

/**
 * Map VisuallyHidden props to SR-only classes.
 * Default unhides on `:focus-within` so focusable controls are not invisible while focused.
 */
export function resolveVisuallyHidden({
	unhideOnFocus = true,
	class: className = ''
}: VisuallyHiddenProps = {}): ResolvedVisuallyHidden {
	const classes = [
		SR_ONLY_CLASS,
		unhideOnFocus ? 'focus-within:not-sr-only' : '',
		className
	].filter(Boolean);

	return {
		className: classes.join(' '),
		unhideOnFocus
	};
}
