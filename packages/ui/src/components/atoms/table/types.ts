import type {
	HTMLAttributes,
	HTMLTableAttributes,
	HTMLTdAttributes,
	HTMLThAttributes
} from 'svelte/elements';
import type { WithElementRef } from '../../../lib/utils.js';

export type TableRootProps = WithElementRef<HTMLTableAttributes>;
export type TableHeaderProps = WithElementRef<HTMLAttributes<HTMLTableSectionElement>>;
export type TableBodyProps = WithElementRef<HTMLAttributes<HTMLTableSectionElement>>;
export type TableFooterProps = WithElementRef<HTMLAttributes<HTMLTableSectionElement>>;
export type TableRowProps = WithElementRef<HTMLAttributes<HTMLTableRowElement>>;
export type TableHeadProps = WithElementRef<HTMLThAttributes>;
export type TableCellProps = WithElementRef<HTMLTdAttributes>;
export type TableCaptionProps = WithElementRef<HTMLAttributes<HTMLElement>>;
