import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
import type { WithElementRef } from '../../../lib/utils.js';

type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

export type InputProps = WithElementRef<
	Omit<HTMLInputAttributes, 'type'> &
		({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined })
>;
