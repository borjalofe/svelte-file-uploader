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
