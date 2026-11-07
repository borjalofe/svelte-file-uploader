import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

/**
 * Page-level integration specs — CI job `integration` (`pnpm integration`).
 * jsdom + Svelte so pages can mount composition (see packages/ui/INTEGRATION.md).
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
		environment: 'jsdom',
		setupFiles: ['./src/vitest-setup-a11y.ts'],
		include: ['src/components/pages/**/*.integration.{test,spec}.{js,ts}'],
		expect: { requireAssertions: true }
	}
});
