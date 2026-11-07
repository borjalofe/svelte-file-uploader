import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../lib/utils.js';

export type DashboardShellProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
	/** App chrome (e.g. header organism). Empty by default — no domain copy. */
	header?: Snippet;
	/** Primary content rendered inside the main Card region. */
	main?: Snippet;
	/** Optional secondary region below the main card. */
	region?: Snippet;
	class?: string;
	mainClass?: string;
	cardClass?: string;
};
