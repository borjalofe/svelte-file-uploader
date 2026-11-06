import { describe, expect, it } from 'vitest';
import { badgeVariants, resolveBadge } from './badge.js';

describe('Badge atom (#32)', () => {
	it('defaults to primary classes (semantic tokens)', () => {
		const resolved = resolveBadge();
		expect(resolved.variant).toBe('default');
		expect(resolved.className).toContain('bg-primary');
		expect(resolved.className).toContain('text-primary-foreground');
		expect(resolved.className).toContain('rounded-full');
		expect(resolved.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
	});

	it('maps Pack Provider/Type pill to secondary without raw color literals', () => {
		const secondary = resolveBadge({ variant: 'secondary' });
		expect(secondary.className).toContain('bg-secondary');
		expect(secondary.className).toContain('text-secondary-foreground');
		expect(secondary.className).toContain('rounded-full');
		expect(secondary.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
	});

	it('maps remaining shadcn variants without raw color literals', () => {
		expect(resolveBadge({ variant: 'outline' }).className).toContain('border-border');
		expect(resolveBadge({ variant: 'ghost' }).className).toContain('hover:bg-accent');
		expect(resolveBadge({ variant: 'link' }).className).toContain('text-primary');
		expect(resolveBadge({ variant: 'destructive' }).className).toContain('bg-destructive');
		expect(resolveBadge({ variant: 'destructive' }).className).toContain(
			'text-destructive-foreground'
		);
		expect(resolveBadge({ variant: 'destructive' }).className).not.toContain('text-white');
		expect(badgeVariants({ variant: 'default' })).toContain('bg-primary');
	});

	it('merges extra class names', () => {
		expect(resolveBadge({ class: 'uppercase' }).className).toContain('uppercase');
	});
});
