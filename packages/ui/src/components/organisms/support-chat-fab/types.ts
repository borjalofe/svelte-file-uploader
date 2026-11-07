import type { HTMLAttributes } from 'svelte/elements';
import type { ClassValue, WithElementRef } from '../../../lib/utils.js';

export type SupportChatFabProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
	/** Accessible name for the FAB (required for icon-only control). */
	'aria-label'?: string;
	/** Show the extension-success status dot (default true). */
	showStatus?: boolean;
	/** Optional status announcement for assistive tech. */
	statusLabel?: string;
	disabled?: boolean;
	/** Click callback only — no chat backend. */
	onOpen?: (event: MouseEvent) => void;
	class?: ClassValue;
};
