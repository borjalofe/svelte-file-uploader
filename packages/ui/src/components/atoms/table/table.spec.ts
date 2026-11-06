import { describe, expect, it } from 'vitest';
import {
	resolveTableCaption,
	resolveTableHead,
	resolveTableRoot,
	resolveTableRow,
	tableHeadBaseClass,
	tableRowBaseClass
} from './table.js';

describe('Table atom (#38)', () => {
	it('uses full-width caption-bottom root without raw hex', () => {
		const root = resolveTableRoot();
		expect(root.className).toContain('w-full');
		expect(root.className).toContain('caption-bottom');
		expect(root.className).toContain('text-sm');
		expect(root.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
	});

	it('maps Pack row hover/selection to muted semantic tokens', () => {
		const row = resolveTableRow({ class: 'font-medium' });
		expect(row.className).toContain('hover:bg-muted/50');
		expect(row.className).toContain('data-[state=selected]:bg-muted');
		expect(row.className).toContain('border-b');
		expect(row.className).toContain('font-medium');
		expect(row.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(tableRowBaseClass).toContain('transition-colors');
	});

	it('heads and captions use semantic foreground tokens', () => {
		expect(resolveTableHead().className).toContain('text-foreground');
		expect(resolveTableCaption().className).toContain('text-muted-foreground');
		expect(tableHeadBaseClass).toContain('font-medium');
		expect(resolveTableCaption().className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
	});
});
