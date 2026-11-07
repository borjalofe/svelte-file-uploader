/**
 * Page-level integration (CI job `integration` / `pnpm integration`).
 * Node-safe contract: shipped swatch catalog + CSS-var surface styles (no .svelte mounts).
 */
import { describe, expect, it } from 'vitest';
import {
	SHIPPED_COLOR_SWATCHES,
	SHIPPED_RADIUS_SWATCHES,
	SHIPPED_SPACE_SWATCHES,
	SHIPPED_TOKEN_SWATCHES,
	tokenSwatchSurfaceStyle
} from './tokens-reference-page.js';

describe('TokensReferencePage integration (#58)', () => {
	it('exposes a complete shipped-token catalog with var() surfaces', () => {
		const vars = SHIPPED_TOKEN_SWATCHES.map((s) => s.cssVar);

		expect(vars).toEqual([
			...SHIPPED_COLOR_SWATCHES.map((s) => s.cssVar),
			...SHIPPED_SPACE_SWATCHES.map((s) => s.cssVar),
			...SHIPPED_RADIUS_SWATCHES.map((s) => s.cssVar)
		]);

		for (const required of ['--primary', '--success', '--space-4', '--radius'] as const) {
			expect(vars).toContain(required);
		}

		for (const swatch of SHIPPED_TOKEN_SWATCHES) {
			const style = tokenSwatchSurfaceStyle(swatch);
			expect(style).toContain(`var(${swatch.cssVar})`);
			expect(style).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		}
	});
});
