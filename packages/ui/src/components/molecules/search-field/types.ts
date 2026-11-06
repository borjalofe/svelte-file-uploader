import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';
import type { ClassValue, WithElementRef } from '../../../lib/utils.js';

export type SearchFieldProps = WithElementRef<
	Omit<HTMLAttributes<HTMLDivElement>, 'aria-label'>
> & {
	/** Accessible name when no visible label is wired via `id`/`for`. */
	'aria-label'?: string;
	/** Forwarded to the inner Input `id` (pair with a `<label for>`). */
	inputId?: string;
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	/** Maps to Input `aria-invalid` for error styling. */
	invalid?: boolean;
	class?: ClassValue;
	inputClass?: ClassValue;
	name?: HTMLInputAttributes['name'];
	required?: HTMLInputAttributes['required'];
	readonly?: HTMLInputAttributes['readonly'];
	autocomplete?: HTMLInputAttributes['autocomplete'];
};
