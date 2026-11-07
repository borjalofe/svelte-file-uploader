import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
import type { InputFieldControl } from './input-field.js';

export type InputFieldProps = {
	/** Field label (associated via `for` / `id`). */
	label: string;
	/** Control id; also seeds hint/error ids. */
	id: string;
	/** Show required marker + `aria-required`. */
	required?: boolean;
	/**
	 * When true, keep the label for a11y but hide it visually (Pack upload wizard
	 * uses in-field placeholders like `Title*` instead of external labels).
	 */
	labelVisuallyHidden?: boolean;
	/** Helper copy below the control (ignored when `error` is set). */
	hint?: string;
	/** Error copy; sets `aria-invalid` and describes the control. */
	error?: string;
	/** Render Input (default) or Textarea. */
	control?: InputFieldControl;
	/** Bound control value. */
	value?: string;
	disabled?: boolean;
	placeholder?: string;
	name?: string;
	/** Input `type` when `control="input"` (file excluded). */
	type?: Exclude<HTMLInputTypeAttribute, 'file'>;
	/** Textarea rows when `control="textarea"`. */
	rows?: number;
	autocomplete?: HTMLInputAttributes['autocomplete'];
	/** Extra classes on the Stack root. */
	class?: string;
};

export type { InputFieldControl };
