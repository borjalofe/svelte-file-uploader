import { describe, expect, it } from 'vitest';
import {
	ROLE_MULTI_OPTIONS,
	resolveMultiSelectListCheckbox,
	resolveMultiSelectListError,
	resolveMultiSelectListRoot
} from './multi-select-list.js';

describe('MultiSelectList molecule (#46)', () => {
	it('defaults Pack Role options to Mentor/Coach and Mentee/Coachee', () => {
		expect(ROLE_MULTI_OPTIONS).toHaveLength(2);
		expect(ROLE_MULTI_OPTIONS[0]).toEqual({
			value: 'mentor-coach',
			label: 'Mentor / Coach'
		});
		expect(ROLE_MULTI_OPTIONS[1]).toEqual({
			value: 'mentee-coachee',
			label: 'Mentee / Coachee'
		});
	});

	it('uses semantic primary checked + destructive error tokens (no raw hex)', () => {
		const root = resolveMultiSelectListRoot();
		expect(root.className).toContain('flex-col');
		expect(root.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);

		const checkbox = resolveMultiSelectListCheckbox();
		expect(checkbox.className).toContain('border-input');
		expect(checkbox.className).toContain('data-[state=checked]:bg-primary');
		expect(checkbox.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);

		expect(resolveMultiSelectListError().className).toContain('text-destructive');
	});

	it('merges extra root class names', () => {
		expect(resolveMultiSelectListRoot({ class: 'max-w-sm' }).className).toContain('max-w-sm');
	});
});
