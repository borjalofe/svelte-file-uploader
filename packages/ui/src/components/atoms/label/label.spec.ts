import { describe, expect, it } from 'vitest';
import { labelBaseClass, resolveLabel } from './label.js';

describe('Label atom (#29)', () => {
	it('uses semantic foreground / disabled peer tokens (no raw hex)', () => {
		const resolved = resolveLabel();
		expect(resolved.className).toContain('text-foreground');
		expect(resolved.className).toContain('font-medium');
		expect(resolved.className).toContain('peer-disabled:opacity-50');
		expect(resolved.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(labelBaseClass).toContain('group-data-[disabled=true]:opacity-50');
	});

	it('merges extra class names', () => {
		expect(resolveLabel({ class: 'sr-only' }).className).toContain('sr-only');
	});
});
