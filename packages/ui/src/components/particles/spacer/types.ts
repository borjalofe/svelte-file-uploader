import type { SpaceScale } from '../stack/types.js';

export type { SpaceScale };

/** Axis the spacer reserves (SF-inspired). */
export type SpacerAxis = 'horizontal' | 'vertical' | 'both';

export type SpacerProps = {
	/**
	 * Which axis gets fixed size (ignored when `grow` is true for layout fill).
	 * @default 'vertical'
	 */
	axis?: SpacerAxis;
	/**
	 * Fixed size from semantic space scale (`w-*` / `h-*` → `--spacing-*` → `--space-*`).
	 * @default '4'
	 */
	size?: SpaceScale;
	/**
	 * When true, spacer flex-grows to fill free space (fixed `size` not applied on the grow axis).
	 * @default false
	 */
	grow?: boolean;
	/** Extra classes merged onto the root. */
	class?: string;
	/**
	 * Decorative layout aid — hidden from assistive tech by default.
	 * @default true
	 */
	ariaHidden?: boolean;
};
