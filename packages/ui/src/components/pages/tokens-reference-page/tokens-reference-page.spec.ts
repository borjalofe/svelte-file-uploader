import { describe, expect, it } from 'vitest';
import {
	SHIPPED_COLOR_SWATCHES,
	SHIPPED_TOKEN_SWATCHES,
	resolveTokensReferencePageRoot,
	tokenSwatchSurfaceStyle
} from './tokens-reference-page.js';

describe('TokensReferencePage (#58)', () => {
	it('lists only shipped CSS vars (no invented semantic paths)', () => {
		const vars = SHIPPED_TOKEN_SWATCHES.map((s) => s.cssVar);
		expect(vars).toContain('--primary');
		expect(vars).toContain('--success');
		expect(vars).toContain('--space-4');
		expect(vars).toContain('--radius');
		expect(vars.some((v) => v.includes('text.') || v.includes('action.'))).toBe(false);
		expect(vars.every((v) => v.startsWith('--'))).toBe(true);

		const primary = SHIPPED_COLOR_SWATCHES.find((s) => s.cssVar === '--primary');
		expect(primary).toBeTruthy();
		expect(tokenSwatchSurfaceStyle(primary!)).toContain('var(--primary)');
		expect(tokenSwatchSurfaceStyle(primary!)).not.toMatch(/#[0-9a-fA-F]{3,8}/);

		expect(resolveTokensReferencePageRoot({ class: 'mt-2' }).className).toContain('mt-2');
	});
});
