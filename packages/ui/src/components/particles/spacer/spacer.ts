import { spaceCssVar } from '../stack/stack.js';
import type { SpaceScale } from '../stack/types.js';
import type { SpacerAxis, SpacerProps } from './types.js';

/** Width utility for a semantic space step. */
export function widthClass(size: SpaceScale): string {
	return `w-${size}`;
}

/** Height utility for a semantic space step. */
export function heightClass(size: SpaceScale): string {
	return `h-${size}`;
}

export type ResolvedSpacer = {
	className: string;
	/** Semantic size CSS variable (`--space-4`) when using a fixed size. */
	sizeVar: string | null;
	ariaHidden: boolean;
};

function fixedDimensionClasses(axis: SpacerAxis, size: SpaceScale): string[] {
	switch (axis) {
		case 'horizontal':
			return [widthClass(size), 'h-0'];
		case 'both':
			return [widthClass(size), heightClass(size)];
		case 'vertical':
		default:
			return [heightClass(size), 'w-0'];
	}
}

function growDimensionClasses(axis: SpacerAxis): string[] {
	switch (axis) {
		case 'horizontal':
			return ['grow', 'basis-0', 'h-0', 'w-auto'];
		case 'both':
			return ['grow', 'basis-0', 'min-h-0', 'min-w-0'];
		case 'vertical':
		default:
			return ['grow', 'basis-0', 'w-0', 'h-auto'];
	}
}

/**
 * Map Spacer props to size / grow classes.
 * Fixed sizes use Tailwind `w-*`/`h-*` backed by semantic `--spacing-*` (no raw rem/px).
 */
export function resolveSpacer({
	axis = 'vertical',
	size = '4',
	grow = false,
	class: className = '',
	ariaHidden = true
}: SpacerProps = {}): ResolvedSpacer {
	const classes = [
		'block',
		'shrink-0',
		...(grow ? growDimensionClasses(axis) : fixedDimensionClasses(axis, size)),
		className
	].filter(Boolean);

	return {
		className: classes.join(' '),
		sizeVar: grow ? null : spaceCssVar(size),
		ariaHidden
	};
}
