import { describe, expect, it } from 'vitest';
import { spaceScale } from '../stack/types.js';
import { heightClass, resolveSpacer, widthClass } from './spacer.js';

describe('Spacer particle (#22)', () => {
	it('defaults to vertical fixed size h-4 / w-0', () => {
		const resolved = resolveSpacer();
		expect(resolved.className).toContain('h-4');
		expect(resolved.className).toContain('w-0');
		expect(resolved.className).toContain('shrink-0');
		expect(resolved.sizeVar).toBe('--space-4');
		expect(resolved.ariaHidden).toBe(true);
	});

	it('maps horizontal and both axes to semantic width/height utilities', () => {
		expect(resolveSpacer({ axis: 'horizontal', size: '2' }).className).toContain('w-2');
		expect(resolveSpacer({ axis: 'horizontal', size: '2' }).className).toContain('h-0');
		expect(resolveSpacer({ axis: 'both', size: '6' }).className).toMatch(/w-6/);
		expect(resolveSpacer({ axis: 'both', size: '6' }).className).toMatch(/h-6/);
	});

	it('grow mode fills free space without a fixed size var', () => {
		const resolved = resolveSpacer({ grow: true, axis: 'horizontal' });
		expect(resolved.className).toContain('grow');
		expect(resolved.className).toContain('basis-0');
		expect(resolved.sizeVar).toBeNull();
	});

	it('uses only semantic space scale keys for fixed size (no raw rem/px)', () => {
		for (const step of spaceScale) {
			expect(widthClass(step)).toBe(`w-${step}`);
			expect(heightClass(step)).toBe(`h-${step}`);
		}
		expect(resolveSpacer({ size: '8' }).className).not.toMatch(/\d+px|\d+rem/);
	});

	it('merges extra class names and respects ariaHidden', () => {
		expect(resolveSpacer({ class: 'bg-muted' }).className).toContain('bg-muted');
		expect(resolveSpacer({ ariaHidden: false }).ariaHidden).toBe(false);
	});
});
