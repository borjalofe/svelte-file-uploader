import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * shadcn-svelte new-york Avatar classes (Tailwind v4 / CSS variables).
 * Pack avatars: muted fallback wash, rounded-full — no raw hex/spacing literals.
 */
export const avatarRootBaseClass = 'relative flex size-8 shrink-0 overflow-hidden rounded-full';

export const avatarImageBaseClass = 'aspect-square size-full';

export const avatarFallbackBaseClass =
	'bg-muted flex size-full items-center justify-center rounded-full';

/** Map Avatar.Root props to semantic-token class lists. */
export function resolveAvatarRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(avatarRootBaseClass, className) };
}

/** Map Avatar.Image props to semantic-token class lists. */
export function resolveAvatarImage({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(avatarImageBaseClass, className) };
}

/** Map Avatar.Fallback props to semantic-token class lists. */
export function resolveAvatarFallback({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(avatarFallbackBaseClass, className) };
}
