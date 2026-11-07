import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * shadcn-svelte new-york Dialog classes (Tailwind v4 / CSS variables).
 * Pack modal: card-like `bg-background` panel + dimming overlay — no raw hex.
 */
export const dialogOverlayBaseClass =
	'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50';

export const dialogContentBaseClass =
	'bg-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-soft duration-200 outline-none sm:max-w-lg';

export const dialogCloseBaseClass =
	"ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

export const dialogHeaderBaseClass = 'flex flex-col gap-2 text-center sm:text-left';

export const dialogFooterBaseClass = 'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end';

export const dialogTitleBaseClass = 'text-lg leading-none font-semibold text-foreground';

export const dialogDescriptionBaseClass = 'text-muted-foreground text-sm';

export function resolveDialogOverlay({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(dialogOverlayBaseClass, className) };
}

export function resolveDialogContent({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(dialogContentBaseClass, className) };
}

export function resolveDialogClose({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(dialogCloseBaseClass, className) };
}

export function resolveDialogHeader({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(dialogHeaderBaseClass, className) };
}

export function resolveDialogFooter({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(dialogFooterBaseClass, className) };
}

export function resolveDialogTitle({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(dialogTitleBaseClass, className) };
}

export function resolveDialogDescription({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(dialogDescriptionBaseClass, className) };
}
