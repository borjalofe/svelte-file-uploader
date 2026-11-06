import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * shadcn-svelte new-york Table classes (Tailwind v4 / CSS variables).
 * Pack Resources table: muted hover/selection, semantic foreground heads — no raw hex.
 */
export const tableContainerBaseClass = 'relative w-full overflow-x-auto';

export const tableRootBaseClass = 'w-full caption-bottom text-sm';

export const tableHeaderBaseClass = '[&_tr]:border-b';

export const tableBodyBaseClass = '[&_tr:last-child]:border-0';

export const tableFooterBaseClass = 'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0';

export const tableRowBaseClass =
	'hover:bg-muted/50 data-[state=selected]:bg-muted has-aria-expanded:bg-muted/50 border-b transition-colors';

export const tableHeadBaseClass =
	'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]';

export const tableCellBaseClass =
	'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]';

export const tableCaptionBaseClass = 'text-muted-foreground mt-4 text-sm';

export function resolveTableContainer({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tableContainerBaseClass, className) };
}

export function resolveTableRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tableRootBaseClass, className) };
}

export function resolveTableHeader({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tableHeaderBaseClass, className) };
}

export function resolveTableBody({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tableBodyBaseClass, className) };
}

export function resolveTableFooter({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tableFooterBaseClass, className) };
}

export function resolveTableRow({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tableRowBaseClass, className) };
}

export function resolveTableHead({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tableHeadBaseClass, className) };
}

export function resolveTableCell({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tableCellBaseClass, className) };
}

export function resolveTableCaption({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(tableCaptionBaseClass, className) };
}
