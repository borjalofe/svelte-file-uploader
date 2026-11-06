import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind class lists (shadcn-svelte `cn` helper). */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

/** HTMLElement ref helper used by shadcn-svelte component props. */
export type WithElementRef<T> = T & {
	ref?: HTMLElement | null;
};
