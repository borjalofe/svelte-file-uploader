import { defineConfig } from 'vitest/config';

/**
 * Page-level integration specs — CI job `integration` (`pnpm integration`).
 * See packages/ui/INTEGRATION.md.
 */
export default defineConfig({
	test: {
		name: 'integration',
		environment: 'node',
		include: ['src/components/pages/**/*.integration.{test,spec}.{js,ts}'],
		expect: { requireAssertions: true }
	}
});
