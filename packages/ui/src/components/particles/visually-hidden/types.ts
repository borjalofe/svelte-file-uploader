export type VisuallyHiddenProps = {
	/**
	 * When true, content becomes visible on `:focus-within` so focusable
	 * controls (links, buttons) are never clipped while focused.
	 * @default true
	 */
	unhideOnFocus?: boolean;
	/** Extra classes merged onto the root. */
	class?: string;
};
