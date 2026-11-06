/** Semantic spacing steps — keys of `semantic.space.*` (see tokens/SEMANTIC_SPACE.md). */
export const spaceScale = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'] as const;

export type SpaceScale = (typeof spaceScale)[number];

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export type StackProps = {
	/** Flex direction. @default 'column' */
	direction?: StackDirection;
	/** Gap from semantic space scale (`gap-{n}` → `--spacing-{n}` → `--space-{n}`). @default '4' */
	gap?: SpaceScale;
	/** align-items. @default 'stretch' */
	align?: StackAlign;
	/** justify-content. @default 'start' */
	justify?: StackJustify;
	/** Extra classes merged onto the root. */
	class?: string;
};
