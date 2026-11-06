import { describe, expect, it } from 'vitest';
import {
	cardDescriptionBaseClass,
	cardRootBaseClass,
	resolveCardDescription,
	resolveCardRoot,
	resolveCardTitle
} from './card.js';

describe('Card atom (#39)', () => {
	it('uses semantic card / muted tokens (no raw hex)', () => {
		const root = resolveCardRoot();
		expect(root.className).toContain('bg-card');
		expect(root.className).toContain('text-card-foreground');
		expect(root.className).toContain('rounded-xl');
		expect(root.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(cardRootBaseClass).toContain('border');

		const description = resolveCardDescription();
		expect(description.className).toContain('text-muted-foreground');
		expect(description.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(cardDescriptionBaseClass).toContain('text-sm');
	});

	it('merges extra class names', () => {
		expect(resolveCardRoot({ class: 'max-w-sm' }).className).toContain('max-w-sm');
		expect(resolveCardTitle({ class: 'text-lg' }).className).toContain('text-lg');
	});
});
