/** Public library entry. Re-export components from here as they ship. */
export { packageName } from './package-name.js';
export {
	Stack,
	gapClass,
	resolveStack,
	spaceCssVar,
	spaceScale
} from '../components/particles/stack/index.js';
export type {
	SpaceScale,
	StackAlign,
	StackDirection,
	StackJustify,
	StackProps
} from '../components/particles/stack/index.js';
export {
	Spacer,
	heightClass,
	resolveSpacer,
	widthClass
} from '../components/particles/spacer/index.js';
export type { SpacerAxis, SpacerProps } from '../components/particles/spacer/index.js';
export {
	Divider,
	dividerBorderClass,
	resolveDivider
} from '../components/particles/divider/index.js';
export type {
	DividerColor,
	DividerOrientation,
	DividerProps
} from '../components/particles/divider/index.js';
