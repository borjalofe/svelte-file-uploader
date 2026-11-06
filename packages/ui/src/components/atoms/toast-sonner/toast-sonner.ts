import type { ToastOptions, ToasterProps } from 'svelte-sonner';
import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * shadcn-svelte new-york Sonner / Toaster defaults (Tailwind v4 / CSS variables).
 * Pack success toast uses extension `success` via richColors + semantic CSS vars — no raw hex.
 */
export const toasterBaseClass = 'toaster group';

/** Inline CSS vars mapped to Pack semantic / theme tokens. */
export const toasterStyleVars =
	'--normal-bg: var(--popover); --normal-text: var(--popover-foreground); --normal-border: var(--border); --border-radius: var(--radius);';

export const toastBaseClass =
	'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg';

export const toastDescriptionClass = 'group-[.toast]:text-muted-foreground';

export const toastActionButtonClass =
	'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground';

export const toastCancelButtonClass =
	'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground';

export const toastSuccessClass =
	'group-[.toaster]:data-[type=success]:bg-success group-[.toaster]:data-[type=success]:text-success-foreground group-[.toaster]:data-[type=success]:border-success';

export type ResolvedToaster = {
	className: string;
	style: string;
	toastOptions: ToastOptions;
};

/** Map Toaster props to Pack semantic class / CSS-var defaults. */
export function resolveToaster({
	class: className,
	style,
	toastOptions
}: {
	class?: ClassValue;
	style?: string;
	toastOptions?: ToastOptions;
} = {}): ResolvedToaster {
	const classes = {
		...toastOptions?.classes,
		toast: cn(toastBaseClass, toastOptions?.classes?.toast),
		description: cn(toastDescriptionClass, toastOptions?.classes?.description),
		actionButton: cn(toastActionButtonClass, toastOptions?.classes?.actionButton),
		cancelButton: cn(toastCancelButtonClass, toastOptions?.classes?.cancelButton),
		success: cn(toastSuccessClass, toastOptions?.classes?.success)
	};

	return {
		className: cn(toasterBaseClass, className),
		style: [toasterStyleVars, style].filter(Boolean).join(' '),
		toastOptions: {
			...toastOptions,
			classes
		}
	};
}

/** Default Pack toaster theme (light-only product look). */
export const toasterDefaultTheme: NonNullable<ToasterProps['theme']> = 'light';
