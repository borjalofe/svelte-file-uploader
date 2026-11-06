import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const storybookA11yPlugins = await storybookTest({
	configDir: path.join(dirname, '.storybook'),
	// Only stories tagged `a11y-gate` (atoms + CI smoke) — see packages/ui/A11Y.md.
	tags: { include: ['a11y-gate'] }
});

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter()
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: true,
				test: {
					name: 'server',
					environment: 'node',
					// Particles + atom unit helpers under src/components/**
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}', 'src/**/*.a11y.{test,spec}.{js,ts}']
				}
			},
			// Component axe suites (jsdom) — run via `pnpm test`
			'./vitest.a11y.config.ts',
			{
				extends: true,
				plugins: [...storybookA11yPlugins],
				test: {
					name: 'a11y',
					// Storybook axe for a11y-gate stories — CI job `a11y` (`pnpm a11y`)
					setupFiles: ['.storybook/vitest.setup.ts'],
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [{ browser: 'chromium' }]
					}
				}
			}
		]
	}
});
