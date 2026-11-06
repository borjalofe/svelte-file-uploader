import type { ClassValue } from 'clsx';
import { type VariantProps, tv } from 'tailwind-variants';
import { cn } from '../../../lib/utils.js';

/**
 * shadcn-svelte new-york Badge variants (Tailwind v4 / CSS variables).
 * Pack: Provider/Type pills use `secondary` (neutral fill, pill radius); no raw hex.
 * Destructive uses semantic foreground (no raw white).
 */
export const badgeVariants = tv({
	base: 'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3',
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/90',
			secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/90',
			destructive:
				'bg-destructive text-destructive-foreground focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/90',
			outline: 'border-border text-foreground [a]:hover:bg-accent [a]:hover:text-accent-foreground',
			ghost: '[a]:hover:bg-accent [a]:hover:text-accent-foreground',
			link: 'text-primary underline-offset-4 [a]:hover:underline'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

export type ResolvedBadge = {
	className: string;
	variant: NonNullable<BadgeVariant>;
};

/** Map Badge props to semantic-token class lists (no raw hex/spacing literals). */
export function resolveBadge({
	variant = 'default',
	class: className
}: {
	variant?: BadgeVariant;
	class?: ClassValue;
} = {}): ResolvedBadge {
	return {
		className: cn(badgeVariants({ variant }), className),
		variant: variant ?? 'default'
	};
}
