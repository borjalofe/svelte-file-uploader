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
		const { container, getByRole } = render(AvatarA11yHarness, {
			props: { alt: 'Ada Lovelace', initials: 'AL' }
		});

		expect(getByRole('img', { name: 'Ada Lovelace' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('names the control via image alt without aria-label on the root', async () => {
		const { container, getByAltText } = render(AvatarA11yHarness, {
			props: {
				alt: 'Grace Hopper',
				initials: 'GH',
				src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
			}
		});

		expect(getByAltText('Grace Hopper')).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});
});
