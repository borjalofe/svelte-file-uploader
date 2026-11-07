/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import UploadResourceDemoPageA11yHarness from './UploadResourceDemoPageA11yHarness.svelte';

afterEach(() => {
	cleanup();
});

describe('UploadResourceDemoPage a11y (#60)', () => {
	it('exposes the demo heading and upload trigger without axe violations', async () => {
		const { container, getByRole } = render(UploadResourceDemoPageA11yHarness);

		expect(getByRole('heading', { name: 'Upload Resource Demo', level: 1 })).toBeTruthy();
		expect(getByRole('button', { name: 'Upload' })).toBeTruthy();
		expect(await axe(container)).toHaveNoViolations();
	});
});
