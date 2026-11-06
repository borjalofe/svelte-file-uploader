import { describe, expect, it } from 'vitest';
import {
	dialogContentBaseClass,
	dialogOverlayBaseClass,
	resolveDialogContent,
	resolveDialogDescription,
	resolveDialogOverlay,
	resolveDialogTitle
} from './dialog.js';

describe('Dialog atom (#36)', () => {
	it('uses Pack modal surface + dimming overlay tokens (no raw hex)', () => {
		const overlay = resolveDialogOverlay();
		expect(overlay.className).toContain('fixed');
		expect(overlay.className).toContain('inset-0');
		expect(overlay.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(dialogOverlayBaseClass).toContain('bg-black/50');

		const content = resolveDialogContent();
		expect(content.className).toContain('bg-background');
		expect(content.className).toContain('border');
		expect(content.className).toContain('rounded-lg');
		expect(content.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(dialogContentBaseClass).toContain('shadow-lg');
	});

	it('titles and descriptions use semantic foreground tokens', () => {
		expect(resolveDialogTitle().className).toContain('text-foreground');
		expect(resolveDialogTitle({ class: 'truncate' }).className).toContain('truncate');
		expect(resolveDialogDescription().className).toContain('text-muted-foreground');
		expect(resolveDialogDescription().className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
	});
});
