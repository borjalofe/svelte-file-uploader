import { describe, expect, it } from 'vitest';
import {
	assertAllowlistMatchesIndex,
	assertPackageExportsMap,
	parseIndexExports
} from '../../scripts/public-exports.mjs';

describe('@pack-challenge/ui public exports (#63)', () => {
	it('keeps package.json exports root-only and allowlist in sync with index.ts', () => {
		expect(() => assertPackageExportsMap()).not.toThrow();
		const names = assertAllowlistMatchesIndex();
		expect(names).toContain('Button');
		expect(names).toContain('ResourcesCatalogPage');
		expect(names).not.toContain('cn');
	});

	it('parses a stable non-empty export set from index.ts', () => {
		const names = parseIndexExports();
		expect(names.length).toBeGreaterThan(50);
		expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
	});
});
