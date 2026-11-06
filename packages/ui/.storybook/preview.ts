import type { Preview } from '@storybook/sveltekit';

import '../src/routes/layout.css';
import ThemeDecorator from '../src/stories/ThemeDecorator.svelte';

const preview: Preview = {
	decorators: [() => ThemeDecorator],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		backgrounds: {
			disabled: true
		},
		a11y: {
			// Default: warn in Storybook UI only (particles / scaffolding).
			// Atom+ stories must set parameters.a11y.test = 'error' (see packages/ui/A11Y.md)
			// so the CI job `a11y` (`pnpm a11y`) fails on axe violations.
			test: 'todo'
		}
	}
};

export default preview;
