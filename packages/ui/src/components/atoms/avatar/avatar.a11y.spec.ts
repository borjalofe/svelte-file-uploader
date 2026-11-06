/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import AvatarA11yHarness from './AvatarA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('Avatar atom a11y (#33)', () => {
	it('exposes an accessible name via fallback initials', async () => {
		const { container, getByLabelText } = render(AvatarA11yHarness, {
			props: { alt: 'Ada Lovelace', initials: 'AL' }
		});

		expect(getByLabelText('Ada Lovelace')).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('keeps accessible name when an image src is provided', async () => {
		const { container, getByLabelText } = render(AvatarA11yHarness, {
			props: {
				alt: 'Grace Hopper',
				initials: 'GH',
				src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
			}
		});

		expect(getByLabelText('Grace Hopper')).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});
});
