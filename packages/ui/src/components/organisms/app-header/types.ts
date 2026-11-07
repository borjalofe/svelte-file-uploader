import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { ClassValue, WithElementRef } from '../../../lib/utils.js';

export type AppHeaderNavItem = {
	href: string;
	label: string;
	active?: boolean;
};

export type AppHeaderProps = WithElementRef<HTMLAttributes<HTMLElement>> & {
	/** Top-nav links; active item gets primary underline. */
	navItems?: AppHeaderNavItem[];
	/** Fallback wordmark when `logo` snippet is omitted (placeholder until logo review). */
	brandLabel?: string;
	/** Initials / accessible name for the trailing Avatar. */
	avatarLabel?: string;
	avatarInitials?: string;
	class?: ClassValue;
	/** Optional logo / wordmark slot. */
	logo?: Snippet;
	/** Optional language / flag control slot (no real i18n). */
	locale?: Snippet;
};
