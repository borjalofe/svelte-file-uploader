import { describe, expect, it } from 'vitest';
import {
	resolveSearchFieldInput,
	resolveSearchFieldRoot,
	searchFieldIconBaseClass,
	searchFieldInputBaseClass,
	searchFieldRootBaseClass
} from './search-field.js';

describe('SearchField molecule (#42)', () => {
	it('uses semantic muted icon gutter classes (no raw hex)', () => {
		const root = resolveSearchFieldRoot();
		expect(root.className).toContain('relative');
		expect(root.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(searchFieldRootBaseClass).toContain('items-center');

		expect(searchFieldIconBaseClass).toContain('text-muted-foreground');
		expect(searchFieldIconBaseClass).not.toMatch(/#[0-9a-fA-F]{3,8}/);

		const input = resolveSearchFieldInput();
		expect(input.className).toContain('ps-9');
		expect(searchFieldInputBaseClass).toBe('ps-9');
	});

	it('merges extra class names on root and input', () => {
		expect(resolveSearchFieldRoot({ class: 'max-w-sm' }).className).toContain('max-w-sm');
		expect(resolveSearchFieldInput({ class: 'pr-3' }).className).toContain('pr-3');
	});
});
