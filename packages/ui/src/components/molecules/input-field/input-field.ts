import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * InputField molecule helpers — Pack form field chrome on semantic tokens.
 * Hint = muted; error = destructive. No raw hex/spacing.
 */
export const inputFieldHintClass = 'text-muted-foreground text-sm';

export const inputFieldErrorClass = 'text-destructive text-sm';

export const inputFieldRequiredMarkClass = 'text-destructive ms-0.5';

export type InputFieldControl = 'input' | 'textarea';

export type ResolvedInputFieldIds = {
	controlId: string;
	hintId: string;
	errorId: string;
	describedBy: string | undefined;
};

/** Stable ids + aria-describedby for label/control/hint/error wiring. */
export function resolveInputFieldIds({
	id,
	hint,
	error
}: {
	id: string;
	hint?: string;
	error?: string;
}): ResolvedInputFieldIds {
	const hintId = `${id}-hint`;
	const errorId = `${id}-error`;
	const describedParts = [error ? errorId : undefined, !error && hint ? hintId : undefined].filter(
		Boolean
	) as string[];

	return {
		controlId: id,
		hintId,
		errorId,
		describedBy: describedParts.length > 0 ? describedParts.join(' ') : undefined
	};
}

export function resolveInputFieldHint({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(inputFieldHintClass, className) };
}

export function resolveInputFieldError({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(inputFieldErrorClass, className) };
}
