/** Line direction — SF-inspired horizontal/vertical separator. */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Visual weight via semantic border colors (no raw hex).
 * - `base` → `border-border` (`semantic.color.border`)
 * - `strong` → `border-foreground` (`semantic.color.foreground`)
 */
export type DividerColor = 'base' | 'strong';

export type DividerProps = {
	/**
	 * Line orientation.
	 * @default 'horizontal'
	 */
	orientation?: DividerOrientation;
	/**
	 * Semantic border tone.
	 * @default 'base'
	 */
	color?: DividerColor;
	/** Extra classes merged onto the root. */
	class?: string;
	/**
	 * Decorative separator — hidden from assistive tech by default.
	 * @default true
	 */
	ariaHidden?: boolean;
};
