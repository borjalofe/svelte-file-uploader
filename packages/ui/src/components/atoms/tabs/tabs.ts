import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * shadcn-svelte new-york Tabs classes (Tailwind v4 / CSS variables).
 * Pack filter tabs: muted list wash, active background surface — no raw hex.
 */
export const tabsRootBaseClass = 'flex flex-col gap-2';

export const tabsListBaseClass =
	'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]';

export const tabsTriggerBaseClass =
	"data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

export const tabsContentBaseClass = 'flex-1 outline-none';

/** Map Tabs.Root props to semantic-token class lists. */
export function resolveTabsRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tabsRootBaseClass, className) };
}

/** Map Tabs.List props to semantic-token class lists. */
export function resolveTabsList({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tabsListBaseClass, className) };
}

/** Map Tabs.Trigger props to semantic-token class lists. */
export function resolveTabsTrigger({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tabsTriggerBaseClass, className) };
}

/** Map Tabs.Content props to semantic-token class lists. */
export function resolveTabsContent({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tabsContentBaseClass, className) };
}
