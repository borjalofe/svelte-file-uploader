import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * Pack DsCatalogLayout template — /ds docs shell (side nav + content slot).
 * Semantic chrome only; no product domain copy. No raw brand hex.
 */
export const dsCatalogLayoutRootBaseClass =
	'bg-background text-foreground flex min-h-svh w-full min-w-0';

export const dsCatalogLayoutAsideBaseClass =
	'border-border flex w-56 shrink-0 flex-col gap-4 border-e px-3 py-4';

export const dsCatalogLayoutTitleBaseClass =
	'text-foreground px-2 text-sm font-semibold tracking-tight';

export const dsCatalogLayoutNavBaseClass = 'flex flex-col gap-1';

export const dsCatalogLayoutNavLinkBaseClass =
	'text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-2 py-1.5 text-sm transition-colors';

export const dsCatalogLayoutNavLinkActiveClass = 'bg-muted text-foreground font-medium';

export const dsCatalogLayoutMainBaseClass = 'flex min-w-0 flex-1 flex-col gap-4 p-6';

export function resolveDsCatalogLayoutRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(dsCatalogLayoutRootBaseClass, className) };
}

export function resolveDsCatalogNavLink({
	active = false,
	class: className
}: {
	active?: boolean;
	class?: ClassValue;
} = {}): { className: string } {
	return {
		className: cn(
			dsCatalogLayoutNavLinkBaseClass,
			active && dsCatalogLayoutNavLinkActiveClass,
			className
		)
	};
}
