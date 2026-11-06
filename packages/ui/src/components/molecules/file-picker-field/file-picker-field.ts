import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * Pack FilePickerField molecule — filename display + Select file + hidden input.
 */
export const filePickerFieldRootBaseClass = 'flex w-full min-w-0 flex-col gap-2';

export const filePickerFieldControlsBaseClass = 'flex w-full min-w-0 items-center gap-2';

export const filePickerFieldErrorBaseClass = 'text-destructive text-sm';

/** Map FilePickerField root props to semantic-token class lists. */
export function resolveFilePickerFieldRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(filePickerFieldRootBaseClass, className) };
}

/** Map FilePickerField controls row props to semantic-token class lists. */
export function resolveFilePickerFieldControls({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(filePickerFieldControlsBaseClass, className) };
}

/** Map FilePickerField error text props to semantic-token class lists. */
export function resolveFilePickerFieldError({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(filePickerFieldErrorBaseClass, className) };
}
