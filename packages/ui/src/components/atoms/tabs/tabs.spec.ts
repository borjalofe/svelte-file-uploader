import { describe, expect, it } from 'vitest';
import {
	resolveTabsList,
	resolveTabsTrigger,
	tabsListBaseClass,
	tabsTriggerBaseClass
} from './tabs.js';

describe('Tabs atom (#35)', () => {
	it('uses semantic muted list and active surface tokens (no raw hex)', () => {
		const list = resolveTabsList();
		expect(list.className).toContain('bg-muted');
		expect(list.className).toContain('text-muted-foreground');
		expect(list.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(tabsListBaseClass).toContain('rounded-lg');

		const trigger = resolveTabsTrigger();
		expect(trigger.className).toContain('data-[state=active]:bg-background');
		expect(trigger.className).toContain('disabled:pointer-events-none');
		expect(trigger.className).toContain('disabled:opacity-50');
		expect(trigger.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(tabsTriggerBaseClass).toContain('focus-visible:ring-ring/50');
	});

	it('merges extra class names', () => {
		expect(resolveTabsList({ class: 'w-full' }).className).toContain('w-full');
		expect(resolveTabsTrigger({ class: 'px-4' }).className).toContain('px-4');
	});
});
