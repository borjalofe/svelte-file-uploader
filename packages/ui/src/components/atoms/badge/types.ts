import type { HTMLAnchorAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../lib/utils.js';
import type { BadgeVariant } from './badge.js';

export type { BadgeVariant };

export type BadgeProps = WithElementRef<HTMLAnchorAttributes> & {
	variant?: BadgeVariant;
};
