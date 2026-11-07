import { describe, expect, it } from 'vitest';
import {
	PACK_APP_HEADER_NAV_ITEMS,
	appHeaderNavLinkActiveClass,
	appHeaderRootBaseClass,
	resolveAppHeaderNavLink,
	resolveAppHeaderRoot
} from './app-header.js';

describe('AppHeader organism (#48)', () => {
	it('defaults nav to Pack brand chrome items with Resources active', () => {
		expect(PACK_APP_HEADER_NAV_ITEMS.map((item) => item.label)).toEqual([
			'Dashboard',
			'Users',
			'Feedbacks',
			'Programs',
			'Resources',
			'Counterparties',
			'Events'
		]);
		expect(PACK_APP_HEADER_NAV_ITEMS.find((item) => item.label === 'Resources')?.active).toBe(true);
	});

	it('uses semantic chrome and primary active underline (no raw hex)', () => {
		const root = resolveAppHeaderRoot();
		expect(root.className).toContain('bg-background');
		expect(root.className).toContain('border-border');
		expect(root.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(appHeaderRootBaseClass).toContain('border-b');

		const active = resolveAppHeaderNavLink({ active: true });
		expect(active.className).toContain('border-primary');
		expect(active.className).toContain('text-foreground');
		expect(active.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(appHeaderNavLinkActiveClass).toBe('text-foreground border-primary');

		const inactive = resolveAppHeaderNavLink({ active: false });
		expect(inactive.className).toContain('text-muted-foreground');
		expect(inactive.className).not.toContain('border-primary');
	});

	it('merges extra class names', () => {
		expect(resolveAppHeaderRoot({ class: 'sticky top-0' }).className).toContain('sticky');
		expect(resolveAppHeaderNavLink({ active: true, class: 'px-1' }).className).toContain('px-1');
	});
});
