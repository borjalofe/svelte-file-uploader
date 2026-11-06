import { describe, expect, it } from 'vitest';
import {
	dropdownMenuContentBaseClass,
	dropdownMenuItemBaseClass,
	resolveDropdownMenuContent,
	resolveDropdownMenuItem
} from './dropdown-menu.js';

describe('DropdownMenu atom (#37)', () => {
	it('uses semantic popover/accent tokens (no raw hex)', () => {
		const content = resolveDropdownMenuContent();
		expect(content.className).toContain('bg-popover');
		expect(content.className).toContain('text-popover-foreground');
		expect(content.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(dropdownMenuContentBaseClass).toContain('rounded-md');

		const item = resolveDropdownMenuItem();
		expect(item.className).toContain('data-highlighted:bg-accent');
		expect(item.className).toContain('data-[variant=destructive]:text-destructive');
		expect(item.className).toContain('data-[disabled]:opacity-50');
		expect(item.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(dropdownMenuItemBaseClass).toContain('data-highlighted:text-accent-foreground');
	});

	it('merges extra class names', () => {
		expect(resolveDropdownMenuContent({ class: 'w-56' }).className).toContain('w-56');
		expect(resolveDropdownMenuItem({ class: 'font-medium' }).className).toContain('font-medium');
	});
});
