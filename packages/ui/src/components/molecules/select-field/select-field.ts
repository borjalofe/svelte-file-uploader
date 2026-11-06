import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * Pack SelectField molecule — Label + Select + error on semantic tokens.
 */
export const selectFieldRootBaseClass = 'flex w-full min-w-0 flex-col gap-2';

export const selectFieldErrorBaseClass = 'text-destructive text-sm';

/** Map SelectField root props to semantic-token class lists. */
export function resolveSelectFieldRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(selectFieldRootBaseClass, className) };
}

/** Map SelectField error text props to semantic-token class lists. */
export function resolveSelectFieldError({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(selectFieldErrorBaseClass, className) };
}
