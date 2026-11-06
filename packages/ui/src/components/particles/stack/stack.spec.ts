import { describe, expect, it } from 'vitest';
import { gapClass, resolveStack, spaceCssVar } from './stack.js';
import { spaceScale } from './types.js';

describe('Stack particle (#21)', () => {
	it('defaults to column / gap-4 / stretch / start', () => {
		const resolved = resolveStack();
		expect(resolved.className).toContain('flex');
		expect(resolved.className).toContain('flex-col');
		expect(resolved.className).toContain('gap-4');
		expect(resolved.className).toContain('items-stretch');
		expect(resolved.className).toContain('justify-start');
		expect(resolved.gapVar).toBe('--space-4');
	});

	it('maps direction, align, and justify to flex utilities', () => {
		const resolved = resolveStack({
			direction: 'row',
			align: 'center',
			justify: 'between',
			gap: '2'
		});
		expect(resolved.className).toContain('flex-row');
		expect(resolved.className).toContain('items-center');
		expect(resolved.className).toContain('justify-between');
		expect(resolved.className).toContain('gap-2');
		expect(resolved.gapVar).toBe('--space-2');
	});

	it('uses only semantic space scale keys for gap (no raw rem/px)', () => {
		for (const step of spaceScale) {
			expect(gapClass(step)).toBe(`gap-${step}`);
			expect(spaceCssVar(step)).toBe(`--space-${step}`);
		}
		expect(resolveStack({ gap: '8' }).className).not.toMatch(/\d+px|\d+rem/);
	});

	it('merges extra class names', () => {
		expect(resolveStack({ class: 'w-full' }).className).toContain('w-full');
	});
});
