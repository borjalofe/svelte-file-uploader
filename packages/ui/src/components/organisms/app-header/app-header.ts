import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * Pack AppHeader organism — logo + nav + locale + Avatar on semantic tokens.
 * Active nav uses primary underline (no raw brand hex).
 */
export const appHeaderRootBaseClass =
	'bg-background text-foreground border-border flex w-full items-center justify-between gap-4 border-b px-4 py-3';

export const appHeaderBrandBaseClass =
	'text-foreground text-lg font-semibold tracking-tight lowercase';

export const appHeaderNavBaseClass = 'flex items-center gap-6';

export const appHeaderNavLinkBaseClass =
	'text-muted-foreground hover:text-foreground inline-flex h-9 items-center border-b-2 border-transparent text-sm font-medium transition-colors';

export const appHeaderNavLinkActiveClass = 'text-foreground border-primary';

export const appHeaderActionsBaseClass = 'flex items-center gap-3';

export const appHeaderLocaleBaseClass =
	'text-muted-foreground hover:text-foreground inline-flex size-9 items-center justify-center rounded-md text-xs font-medium uppercase';

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
