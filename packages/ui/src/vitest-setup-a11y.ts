import 'vitest-axe/extend-expect';
import * as matchers from 'vitest-axe/matchers';
import { expect, vi } from 'vitest';

expect.extend(matchers);

/** jsdom lacks matchMedia; svelte-sonner Toaster reads prefers-color-scheme. */
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	configurable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});
