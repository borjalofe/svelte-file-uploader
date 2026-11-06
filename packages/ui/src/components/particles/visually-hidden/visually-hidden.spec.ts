import { describe, expect, it } from 'vitest';
import { NOT_SR_ONLY_CLASS, resolveVisuallyHidden, SR_ONLY_CLASS } from './visually-hidden.js';

describe('VisuallyHidden particle (#24)', () => {
	it('defaults to sr-only and unhides on focus-within', () => {
		const resolved = resolveVisuallyHidden();
		expect(resolved.className).toContain(SR_ONLY_CLASS);
		expect(resolved.className).toContain('focus-within:not-sr-only');
		expect(resolved.unhideOnFocus).toBe(true);
	});

	it('can keep content clipped even when focused', () => {
		const resolved = resolveVisuallyHidden({ unhideOnFocus: false });
		expect(resolved.className).toBe(SR_ONLY_CLASS);
		expect(resolved.className).not.toContain('focus-within');
		expect(resolved.unhideOnFocus).toBe(false);
	});

	it('uses Tailwind SR utilities only (no raw px/rem/hex)', () => {
		expect(SR_ONLY_CLASS).toBe('sr-only');
		expect(NOT_SR_ONLY_CLASS).toBe('not-sr-only');
		expect(resolveVisuallyHidden({ class: 'font-sans' }).className).not.toMatch(
			/#[0-9a-fA-F]{3,8}|\d+px|\d+rem/
		);
	});

	it('merges extra class names', () => {
		expect(resolveVisuallyHidden({ class: 'text-foreground' }).className).toContain(
			'text-foreground'
		);
	});
});
