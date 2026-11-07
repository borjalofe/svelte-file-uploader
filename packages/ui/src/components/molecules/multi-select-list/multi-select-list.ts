import { type ClassValue, cn } from '../../../lib/utils.js';
import type { MultiSelectListOption } from './types.js';

/**
 * Pack MultiSelectList — Role multi options on semantic tokens.
 * Defaults: Mentor / Coach, Mentee / Coachee (Upload Resource dialog).
 */
export const multiSelectListRootBaseClass = 'flex w-full min-w-0 flex-col gap-2';

export const multiSelectListGroupBaseClass = 'flex flex-col gap-2';

export const multiSelectListItemBaseClass =
	'flex items-center gap-2 text-sm text-foreground select-none';

export const multiSelectListCheckboxBaseClass =
	'border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50';

export const multiSelectListErrorBaseClass = 'text-destructive text-sm';

/** Pack Upload Resource role multi-select defaults. */
export const ROLE_MULTI_OPTIONS: readonly MultiSelectListOption[] = [
	{ value: 'mentor-coach', label: 'Mentor / Coach' },
	{ value: 'mentee-coachee', label: 'Mentee / Coachee' }
];

export function resolveMultiSelectListRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(multiSelectListRootBaseClass, className) };
}

export function resolveMultiSelectListGroup({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(multiSelectListGroupBaseClass, className) };
}

export function resolveMultiSelectListItem({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(multiSelectListItemBaseClass, className) };
}

export function resolveMultiSelectListCheckbox({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(multiSelectListCheckboxBaseClass, className) };
}

export function resolveMultiSelectListError({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(multiSelectListErrorBaseClass, className) };
}
