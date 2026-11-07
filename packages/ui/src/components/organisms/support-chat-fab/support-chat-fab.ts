import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * Pack SupportChatFab — circular primary FAB + extension success status dot.
 * Presentational only (click callback); no chat backend. No raw brand hex.
 */
export const supportChatFabRootBaseClass = 'relative inline-flex shrink-0';

/** Circular primary control; consumers can add `fixed` positioning via class. */
export const supportChatFabButtonBaseClass = 'rounded-full shadow-lg';

/** Status indicator uses extension `success` (`bg-success`), not raw green hex. */
export const supportChatFabStatusBaseClass =
	'bg-success border-background pointer-events-none absolute end-0.5 top-0.5 size-3 rounded-full border-2';

export function resolveSupportChatFabRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(supportChatFabRootBaseClass, className) };
}

export function resolveSupportChatFabButton({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(supportChatFabButtonBaseClass, className) };
}

export function resolveSupportChatFabStatus({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(supportChatFabStatusBaseClass, className) };
}
