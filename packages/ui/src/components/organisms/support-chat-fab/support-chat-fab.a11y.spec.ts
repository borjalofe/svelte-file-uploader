/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import SupportChatFabA11yHarness from './SupportChatFabA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('SupportChatFab organism a11y (#52)', () => {
	it('exposes a named FAB button without axe violations', async () => {
		const { container, getByRole } = render(SupportChatFabA11yHarness);

		expect(getByRole('button', { name: 'Open support chat' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});
});
