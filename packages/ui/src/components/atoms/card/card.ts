import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * shadcn-svelte new-york Card classes (Tailwind v4 / CSS variables).
 * Pack surfaces: card / card-foreground — no raw hex/spacing literals.
 */
export const cardRootBaseClass =
	'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm';

export const cardHeaderBaseClass =
	'@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6';

export const cardTitleBaseClass = 'leading-none font-semibold';

export const cardDescriptionBaseClass = 'text-muted-foreground text-sm';

export const cardActionBaseClass = 'col-start-2 row-span-2 row-start-1 self-start justify-self-end';

export const cardContentBaseClass = 'px-6';

export const cardFooterBaseClass = 'flex items-center px-6 [.border-t]:pt-6';

/** Map Card.Root props to semantic-token class lists. */
export function resolveCardRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(cardRootBaseClass, className) };
}

/** Map Card.Header props to semantic-token class lists. */
export function resolveCardHeader({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(cardHeaderBaseClass, className) };
}

/** Map Card.Title props to semantic-token class lists. */
export function resolveCardTitle({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(cardTitleBaseClass, className) };
}

/** Map Card.Description props to semantic-token class lists. */
export function resolveCardDescription({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(cardDescriptionBaseClass, className) };
}

/** Map Card.Content props to semantic-token class lists. */
export function resolveCardContent({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(cardContentBaseClass, className) };
}

/** Map Card.Footer props to semantic-token class lists. */
export function resolveCardFooter({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(cardFooterBaseClass, className) };
}

/** Map Card.Action props to semantic-token class lists. */
export function resolveCardAction({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(cardActionBaseClass, className) };
}
