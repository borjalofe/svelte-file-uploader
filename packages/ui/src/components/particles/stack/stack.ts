import type { StackAlign, StackDirection, StackJustify, StackProps, SpaceScale } from './types.js';

const directionClass: Record<StackDirection, string> = {
	row: 'flex-row',
	column: 'flex-col',
	'row-reverse': 'flex-row-reverse',
	'column-reverse': 'flex-col-reverse'
};

const alignClass: Record<StackAlign, string> = {
	start: 'items-start',
	center: 'items-center',
	end: 'items-end',
	stretch: 'items-stretch',
	baseline: 'items-baseline'
};

const justifyClass: Record<StackJustify, string> = {
	start: 'justify-start',
	center: 'justify-center',
	end: 'justify-end',
	between: 'justify-between',
	around: 'justify-around',
	evenly: 'justify-evenly'
};

/** Tailwind gap utility for a semantic space step (wired via `@theme --spacing-*`). */
export function gapClass(gap: SpaceScale): string {
	return `gap-${gap}`;
}

/** CSS custom property name for a semantic space step (`--space-4`). */
export function spaceCssVar(gap: SpaceScale): string {
	return `--space-${gap}`;
}

export type ResolvedStack = {
	className: string;
	/** Semantic gap CSS variable referenced by the theme spacing scale. */
	gapVar: string;
};

/**
 * Map Stack props to a flex + gap class list.
 * Gap uses Tailwind `gap-*` backed by semantic `--spacing-*` → `--space-*` (no raw rem/px).
 */
export function resolveStack({
	direction = 'column',
	gap = '4',
	align = 'stretch',
	justify = 'start',
	class: className = ''
}: StackProps = {}): ResolvedStack {
	const classes = [
		'flex',
		directionClass[direction],
		gapClass(gap),
		alignClass[align],
		justifyClass[justify],
		className
	].filter(Boolean);

	return {
		className: classes.join(' '),
		gapVar: spaceCssVar(gap)
	};
}
