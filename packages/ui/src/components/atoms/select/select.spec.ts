import { describe, expect, it } from 'vitest';
import {
	resolveSelectContent,
	resolveSelectItem,
	resolveSelectTrigger,
	selectContentBaseClass,
	selectItemBaseClass,
	selectTriggerBaseClass
} from './select.js';

describe('Select atom (#31)', () => {
	it('uses semantic border/ring/popover tokens on trigger and content (no raw hex)', () => {
		const trigger = resolveSelectTrigger();
		expect(trigger.className).toContain('border-input');
		expect(trigger.className).toContain('focus-visible:ring-ring/50');
		expect(trigger.className).toContain('data-[placeholder]:text-muted-foreground');
		expect(trigger.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(selectTriggerBaseClass).toContain('aria-invalid:border-destructive');

		const content = resolveSelectContent();
		expect(content.className).toContain('bg-popover');
		expect(content.className).toContain('text-popover-foreground');
		expect(content.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(selectContentBaseClass).toContain('rounded-md');
	});

	it('uses accent highlight tokens on items', () => {
		const item = resolveSelectItem({ class: 'font-medium' });
		expect(item.className).toContain('data-[highlighted]:bg-accent');
		expect(item.className).toContain('font-medium');
		expect(item.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(selectItemBaseClass).toContain('data-[disabled]:opacity-50');
	});
});
