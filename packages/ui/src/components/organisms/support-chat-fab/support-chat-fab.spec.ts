import { describe, expect, it } from 'vitest';
import {
	resolveSupportChatFabButton,
	resolveSupportChatFabRoot,
	resolveSupportChatFabStatus,
	supportChatFabRootBaseClass,
	supportChatFabStatusBaseClass
} from './support-chat-fab.js';

describe('SupportChatFab organism (#52)', () => {
	it('uses primary FAB chrome and extension success status (no raw hex)', () => {
		expect(supportChatFabRootBaseClass).toContain('relative');
		expect(resolveSupportChatFabRoot().className).toContain('relative');

		// `fixed` replaces `relative` via tailwind-merge; fixed still anchors the status dot.
		const root = resolveSupportChatFabRoot({ class: 'fixed end-6 bottom-6' });
		expect(root.className).toContain('fixed');
		expect(root.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);

		const button = resolveSupportChatFabButton();
		expect(button.className).toContain('rounded-full');
		expect(button.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);

		const status = resolveSupportChatFabStatus();
		expect(status.className).toContain('bg-success');
		expect(supportChatFabStatusBaseClass).toContain('bg-success');
		expect(status.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(status.className).not.toMatch(/1[Cc]9[Cc]70/);
	});
});
