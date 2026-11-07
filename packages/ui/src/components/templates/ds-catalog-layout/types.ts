import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { ClassValue, WithElementRef } from '../../../lib/utils.js';

export type DsCatalogNavItem = {
	href: string;
	label: string;
	active?: boolean;
};

export type DsCatalogLayoutProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
	/** Side-nav links for the /ds catalog (no product domain copy). */
	navItems?: DsCatalogNavItem[];
	/** Accessible name for the side navigation. */
	navLabel?: string;
	/** Optional catalog title above the nav list. */
	title?: string;
	class?: ClassValue;
	/** Main content slot. */
	children?: Snippet;
};
