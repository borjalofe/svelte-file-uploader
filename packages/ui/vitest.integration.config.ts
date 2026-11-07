import { defineConfig } from 'vitest/config';

/**
 * Page-level integration specs — CI job `integration` (`pnpm integration`).
 * Node environment; keep specs free of `.svelte` imports (see packages/ui/INTEGRATION.md).
 * Mount/composition coverage stays in `*.a11y.spec.ts` + Storybook a11y-gate.
 */
export default defineConfig({
	test: {
		name: 'integration',
		environment: 'node',
		include: ['src/components/pages/**/*.integration.{test,spec}.{js,ts}'],
		expect: { requireAssertions: true }
	}
});
