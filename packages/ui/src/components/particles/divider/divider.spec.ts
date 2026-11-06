import { describe, expect, it } from 'vitest';
import { dividerBorderClass, resolveDivider } from './divider.js';

describe('Divider particle (#23)', () => {
	it('defaults to horizontal / base border / decorative', () => {
		const resolved = resolveDivider();
		expect(resolved.className).toContain('w-full');
		expect(resolved.className).toContain('border-t');
		expect(resolved.className).toContain('border-border');
		expect(resolved.orientation).toBe('horizontal');
		expect(resolved.borderVar).toBe('--border');
		expect(resolved.ariaHidden).toBe(true);
	});

	it('maps vertical orientation to a left border line', () => {
		const resolved = resolveDivider({ orientation: 'vertical' });
		expect(resolved.className).toContain('border-l');
		expect(resolved.className).toContain('self-stretch');
		expect(resolved.className).toContain('w-0');
		expect(resolved.orientation).toBe('vertical');
	});

	it('maps strong color to semantic foreground border (no raw hex)', () => {
		expect(dividerBorderClass('base')).toBe('border-border');
		expect(dividerBorderClass('strong')).toBe('border-foreground');
		const resolved = resolveDivider({ color: 'strong' });
		expect(resolved.className).toContain('border-foreground');
		expect(resolved.borderVar).toBe('--foreground');
		expect(resolved.className).not.toMatch(/#[0-9a-fA-F]{3,8}|\d+px|\d+rem/);
	});

	it('merges extra class names and respects ariaHidden', () => {
		expect(resolveDivider({ class: 'my-2' }).className).toContain('my-2');
		expect(resolveDivider({ ariaHidden: false }).ariaHidden).toBe(false);
	});
});
