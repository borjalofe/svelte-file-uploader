import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

/** Client-side Svelte mount for axe a11y specs (no SvelteKit SSR entry). */
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
		name: 'a11y-specs',
		environment: 'jsdom',
		setupFiles: ['./src/vitest-setup-a11y.ts'],
		include: [
			'src/**/*.a11y.{test,spec}.{js,ts}',
			// Page integration mounts (jsdom) until dedicated CI job (#57)
			'src/**/*.integration.{test,spec}.{js,ts}'
		],
		expect: { requireAssertions: true }
	}
});
