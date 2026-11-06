import { describe, expect, it } from 'vitest';
import { inputBaseClass, resolveInput } from './input.js';

describe('Input atom (#28)', () => {
	it('uses semantic border/ring/foreground tokens (no raw hex)', () => {
		const resolved = resolveInput();
		expect(resolved.className).toContain('border-input');
		expect(resolved.className).toContain('focus-visible:ring-ring/50');
		expect(resolved.className).toContain('placeholder:text-muted-foreground');
		expect(resolved.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(inputBaseClass).toContain('aria-invalid:border-destructive');
	});

	it('merges extra class names', () => {
		expect(resolveInput({ class: 'max-w-sm' }).className).toContain('max-w-sm');
	});
});
