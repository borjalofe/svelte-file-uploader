import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

/**
 * Page-level integration specs — CI job `integration` (`pnpm integration`).
 * See packages/ui/INTEGRATION.md.
 * Default env is node; page suites opt into jsdom via `@vitest-environment jsdom`.
 */
export default defineConfig({
	plugins: [
		svelte({
			compilerOptions: {
				runes: true
			}
		})
	],
	resolve: {
		conditions: ['browser']
	},
	test: {
		name: 'integration',
		environment: 'node',
		setupFiles: ['./src/vitest-setup-a11y.ts'],
		include: ['src/components/pages/**/*.integration.{test,spec}.{js,ts}'],
		expect: { requireAssertions: true }
	}
});
