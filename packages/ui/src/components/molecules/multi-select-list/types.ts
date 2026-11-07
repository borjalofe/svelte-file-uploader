import type { HTMLAttributes } from 'svelte/elements';
import type { ClassValue, WithElementRef } from '../../../lib/utils.js';

export type MultiSelectListOption = {
	value: string;
	label: string;
	disabled?: boolean;
};

export type MultiSelectListProps = WithElementRef<
	Omit<HTMLAttributes<HTMLDivElement>, 'aria-label'>
> & {
	/** Visible group label. */
	label: string;
	/** Stable id prefix for label / error / option ids. */
	id?: string;
	/** Accessible name for the group (defaults to `label`). */
	'aria-label'?: string;
	/** Selected option values. */
	value?: string[];
	disabled?: boolean;
	/** Marks the group invalid and shows `error` when set. */
	invalid?: boolean;
	/** Error copy shown under the list when `invalid`. */
	error?: string;
	/** Options to render; defaults to Pack Role multi options. */
	options?: readonly MultiSelectListOption[];
	class?: ClassValue;
};
