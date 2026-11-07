import { type ClassValue, cn } from '../../../lib/utils.js';

/**
 * Pack DashboardShell — content layout template (header + main card + optional region).
 * No domain copy; composition only. No automated unit/a11y tests (#54).
 */
export const dashboardShellRootBaseClass =
	'bg-background text-foreground flex min-h-svh w-full min-w-0 flex-col';

export const dashboardShellHeaderBaseClass = 'w-full min-w-0 shrink-0';

export const dashboardShellBodyBaseClass = 'flex w-full min-w-0 flex-1 flex-col gap-4 p-4 md:p-6';

export const dashboardShellMainBaseClass = 'w-full min-w-0 flex-1';

export const dashboardShellRegionBaseClass = 'w-full min-w-0';

export function resolveDashboardShellRoot({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(dashboardShellRootBaseClass, className) };
}

export function resolveDashboardShellHeader({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(dashboardShellHeaderBaseClass, className) };
}

export function resolveDashboardShellBody({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(dashboardShellBodyBaseClass, className) };
}

export function resolveDashboardShellMain({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(dashboardShellMainBaseClass, className) };
}

export function resolveDashboardShellRegion({ class: className }: { class?: ClassValue } = {}): {
	className: string;
} {
	return { className: cn(dashboardShellRegionBaseClass, className) };
}
