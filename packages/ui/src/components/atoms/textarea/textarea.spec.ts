import { describe, expect, it } from 'vitest';
import { resolveTextarea, textareaBaseClass } from './textarea.js';

describe('Textarea atom (#30)', () => {
	it('uses semantic border/ring/foreground tokens (no raw hex)', () => {
		const resolved = resolveTextarea();
		expect(resolved.className).toContain('border-input');
		expect(resolved.className).toContain('focus-visible:ring-ring/50');
		expect(resolved.className).toContain('placeholder:text-muted-foreground');
		expect(resolved.className).toContain('min-h-16');
		expect(resolved.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(textareaBaseClass).toContain('aria-invalid:border-destructive');
	});

	it('merges extra class names', () => {
		expect(resolveTextarea({ class: 'max-w-lg' }).className).toContain('max-w-lg');
	});
});
