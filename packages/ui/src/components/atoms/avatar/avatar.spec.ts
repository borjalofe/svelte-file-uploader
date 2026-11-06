import { describe, expect, it } from 'vitest';
import {
	avatarFallbackBaseClass,
	avatarRootBaseClass,
	resolveAvatarFallback,
	resolveAvatarImage,
	resolveAvatarRoot
} from './avatar.js';

describe('Avatar atom (#33)', () => {
	it('uses semantic muted fallback and rounded root (no raw hex)', () => {
		const root = resolveAvatarRoot();
		expect(root.className).toContain('rounded-full');
		expect(root.className).toContain('size-8');
		expect(root.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(avatarRootBaseClass).toContain('overflow-hidden');

		const fallback = resolveAvatarFallback();
		expect(fallback.className).toContain('bg-muted');
		expect(fallback.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(avatarFallbackBaseClass).toContain('rounded-full');
	});

	it('merges extra class names on image and root', () => {
		expect(resolveAvatarImage({ class: 'object-cover' }).className).toContain('object-cover');
		expect(resolveAvatarRoot({ class: 'size-10' }).className).toContain('size-10');
	});
});
