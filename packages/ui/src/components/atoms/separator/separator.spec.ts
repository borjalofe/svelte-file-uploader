import { describe, expect, it } from 'vitest';
import { resolveSeparator, separatorBaseClass } from './separator.js';

describe('Separator atom (#34)', () => {
	it('uses semantic border fill and orientation data variants (no raw hex)', () => {
		const resolved = resolveSeparator();
		expect(resolved.className).toContain('bg-border');
		expect(resolved.className).toContain('data-[orientation=horizontal]:h-px');
		expect(resolved.className).toContain('data-[orientation=vertical]:w-px');
		expect(resolved.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(separatorBaseClass).toContain('shrink-0');
	});

	it('merges extra class names', () => {
		expect(resolveSeparator({ class: 'my-4' }).className).toContain('my-4');
	});
});
