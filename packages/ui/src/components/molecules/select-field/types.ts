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
	/** Visible field label. */
	label: string;
	/** Forwarded to Label `for` / SelectTrigger `id`. */
	triggerId?: string;
	/** Accessible name on the trigger (defaults to `label`). */
	'aria-label'?: string;
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
