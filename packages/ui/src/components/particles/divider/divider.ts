import type { DividerColor, DividerOrientation, DividerProps } from './types.js';

const borderColorClass: Record<DividerColor, string> = {
	base: 'border-border',
	strong: 'border-foreground'
};

/** Tailwind border-color utility for a semantic divider tone. */
export function dividerBorderClass(color: DividerColor): string {
	return borderColorClass[color];
}

export type ResolvedDivider = {
	className: string;
	orientation: DividerOrientation;
	/** Semantic CSS variable behind the border color. */
	borderVar: string;
	ariaHidden: boolean;
};

function orientationClasses(orientation: DividerOrientation): string[] {
	if (orientation === 'vertical') {
		return ['inline-block', 'self-stretch', 'h-auto', 'w-0', 'border-l'];
	}
	return ['block', 'w-full', 'h-0', 'border-t'];
}

function borderCssVar(color: DividerColor): string {
	return color === 'strong' ? '--foreground' : '--border';
}

/**
 * Map Divider props to orientation + semantic border classes.
 * Colors use Tailwind `border-border` / `border-foreground` (no raw hex/px).
 */
export function resolveDivider({
	orientation = 'horizontal',
	color = 'base',
	class: className = '',
	ariaHidden = true
}: DividerProps = {}): ResolvedDivider {
	const classes = [
		'shrink-0',
		'border-0',
		'border-solid',
		...orientationClasses(orientation),
		dividerBorderClass(color),
		className
	].filter(Boolean);

	return {
		className: classes.join(' '),
		orientation,
		borderVar: borderCssVar(color),
		ariaHidden
	};
}
