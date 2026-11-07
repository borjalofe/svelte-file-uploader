import { describe, expect, it } from 'vitest';
import {
	resolveToaster,
	toastBaseClass,
	toastSuccessClass,
	toasterStyleVars
} from './toast-sonner.js';

describe('Toast (Sonner) atom (#40)', () => {
	it('maps toaster chrome to Pack popover/border CSS vars (no raw hex)', () => {
		const resolved = resolveToaster();
		expect(resolved.className).toContain('toaster');
		expect(resolved.style).toContain('--normal-bg: var(--popover)');
		expect(resolved.style).toContain('--normal-border: var(--border)');
		expect(resolved.style).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(toasterStyleVars).toContain('var(--radius)');
	});

	it('applies semantic toast surface + Pack success extension classes', () => {
		const resolved = resolveToaster();
		expect(resolved.toastOptions.classes?.toast).toContain('group-[.toaster]:bg-card');
		expect(resolved.toastOptions.classes?.toast).toContain('group-[.toaster]:text-foreground');
		expect(resolved.toastOptions.classes?.description).toContain('text-muted-foreground');
		expect(resolved.toastOptions.classes?.success).toContain('bg-success');
		expect(resolved.toastOptions.classes?.success).toContain('text-success-foreground');
		expect(resolved.toastOptions.classes?.toast).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(toastBaseClass).toContain('shadow-soft');
		expect(toastSuccessClass).toContain('border-success');
	});

	it('merges caller toastOptions classes', () => {
		const resolved = resolveToaster({
			class: 'z-[100]',
			toastOptions: { classes: { toast: 'uppercase' } }
		});
		expect(resolved.className).toContain('z-[100]');
		expect(resolved.toastOptions.classes?.toast).toContain('uppercase');
		expect(resolved.toastOptions.classes?.toast).toContain('bg-card');
	});
});
