import { describe, expect, it } from 'vitest';
import { buttonVariants, resolveButton } from './button.js';

describe('Button atom (#27)', () => {
	it('defaults to primary CTA classes (semantic tokens)', () => {
		const resolved = resolveButton();
		expect(resolved.variant).toBe('default');
		expect(resolved.size).toBe('default');
		expect(resolved.className).toContain('bg-primary');
		expect(resolved.className).toContain('text-primary-foreground');
		expect(resolved.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
	});

	it('maps Pack-relevant variants without raw color literals', () => {
		expect(resolveButton({ variant: 'secondary' }).className).toContain('bg-secondary');
		expect(resolveButton({ variant: 'outline' }).className).toContain('border');
		expect(resolveButton({ variant: 'ghost' }).className).toContain('hover:bg-accent');
		expect(resolveButton({ variant: 'destructive' }).className).toContain('bg-destructive');
		expect(resolveButton({ variant: 'destructive' }).className).toContain(
			'text-destructive-foreground'
		);
		expect(resolveButton({ variant: 'destructive' }).className).not.toContain('text-white');
		expect(resolveButton({ variant: 'link' }).className).toContain('text-primary');
	});

	it('maps sizes used by Pack chrome (default / sm / icon)', () => {
		expect(resolveButton({ size: 'sm' }).className).toContain('h-8');
		expect(resolveButton({ size: 'lg' }).className).toContain('h-10');
		expect(resolveButton({ size: 'icon' }).className).toContain('size-9');
		expect(buttonVariants({ size: 'icon-sm' })).toContain('size-8');
	});

	it('merges extra class names', () => {
		expect(resolveButton({ class: 'w-full' }).className).toContain('w-full');
	});
});
