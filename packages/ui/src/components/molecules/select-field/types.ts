import type { HTMLAttributes } from 'svelte/elements';
import type { ClassValue, WithElementRef } from '../../../lib/utils.js';

export type SelectFieldOption = {
	value: string;
	label: string;
	disabled?: boolean;
};

export type SelectFieldProps = WithElementRef<
	Omit<HTMLAttributes<HTMLDivElement>, 'aria-label'>
> & {
	/** Field label. */
	label: string;
	/** Forwarded to Label `for` / SelectTrigger `id`. */
	triggerId?: string;
	/** Accessible name on the trigger (defaults to `label`). */
	'aria-label'?: string;
	/**
	 * When true, keep the label for a11y but hide it visually (Pack upload wizard
	 * uses in-field placeholders like `Category*`).
	 */
	labelVisuallyHidden?: boolean;
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	/** Marks the trigger invalid and shows `error` when set. */
	invalid?: boolean;
	/** Error copy shown under the control when `invalid`. */
	error?: string;
	options?: SelectFieldOption[];
	class?: ClassValue;
	triggerClass?: ClassValue;
};
