import type { HTMLAttributes } from 'svelte/elements';
import type { ClassValue, WithElementRef } from '../../../lib/utils.js';

export type FilePickerFieldProps = WithElementRef<
	Omit<HTMLAttributes<HTMLDivElement>, 'aria-label'>
> & {
	/** Field label. */
	label?: string;
	/** Forwarded to Label `for` / filename Input `id`. */
	inputId?: string;
	/** Accessible name for the filename display (defaults to `label`). */
	'aria-label'?: string;
	/**
	 * When true, keep the label for a11y but hide it visually (Pack upload wizard
	 * embeds the prompt in the filename placeholder).
	 */
	labelVisuallyHidden?: boolean;
	/** Displayed filename (updated when a file is chosen). */
	filename?: string;
	/** Bound FileList from the hidden file input. */
	files?: FileList;
	placeholder?: string;
	buttonLabel?: string;
	disabled?: boolean;
	invalid?: boolean;
	error?: string;
	accept?: string;
	multiple?: boolean;
	class?: ClassValue;
	inputClass?: ClassValue;
	name?: string;
	required?: boolean;
};
