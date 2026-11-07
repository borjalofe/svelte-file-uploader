import { type ClassValue, cn } from '../../../lib/utils.js';
import type { AppHeaderNavItem } from './types.js';

/**
 * Pack AppHeader organism — logo + nav + locale + Avatar on semantic tokens.
 * Active nav uses primary underline (no raw brand hex).
 */
export const appHeaderRootBaseClass =
	'bg-background text-foreground border-border flex w-full items-center justify-between gap-4 border-b px-4 py-3';

export const appHeaderBrandBaseClass =
	'text-foreground text-lg font-semibold tracking-tight lowercase';

export const appHeaderNavBaseClass = 'flex min-w-0 flex-1 items-center justify-center gap-4 overflow-x-auto';

export const appHeaderNavLinkBaseClass =
	'text-muted-foreground hover:text-foreground inline-flex h-9 shrink-0 items-center border-b-2 border-transparent text-sm font-medium transition-colors';

export const appHeaderNavLinkActiveClass = 'text-foreground border-primary';

export const appHeaderActionsBaseClass = 'flex items-center gap-3';

/** Circular locale control — Pack screenshots use a flag chip (emoji placeholder until assets land). */
export const appHeaderLocaleBaseClass =
	'bg-muted text-foreground inline-flex size-8 items-center justify-center overflow-hidden rounded-full text-base leading-none';

/**
 * Top-nav labels from Pack brand screenshots (`docs/brand/source`).
 * Hrefs are placeholders — product routes beyond Resources are out of scope.
 */
export const PACK_APP_HEADER_NAV_ITEMS: readonly AppHeaderNavItem[] = [
	{ href: '#dashboard', label: 'Dashboard' },
	{ href: '#users', label: 'Users' },
	{ href: '#feedbacks', label: 'Feedbacks' },
	{ href: '#programs', label: 'Programs' },
	{ href: '#resources', label: 'Resources', active: true },
	{ href: '#counterparties', label: 'Counterparties' },
	{ href: '#events', label: 'Events' }
];

/** Map AppHeader root props to semantic-token class lists. */
export function resolveAppHeaderRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(appHeaderRootBaseClass, className) };
}

/** Map AppHeader nav link props (active underline via primary). */
export function resolveAppHeaderNavLink({
	active = false,
	class: className
}: {
	active?: boolean;
	class?: ClassValue;
} = {}): { className: string } {
	return {
		className: cn(appHeaderNavLinkBaseClass, active && appHeaderNavLinkActiveClass, className)
	};
}
