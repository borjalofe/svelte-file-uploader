import Root from './table.svelte';
import Header from './table-header.svelte';
import Body from './table-body.svelte';
import Footer from './table-footer.svelte';
import Row from './table-row.svelte';
import Head from './table-head.svelte';
import Cell from './table-cell.svelte';
import Caption from './table-caption.svelte';

export {
	Root,
	Header,
	Body,
	Footer,
	Row,
	Head,
	Cell,
	Caption,
	//
	Root as Table,
	Header as TableHeader,
	Body as TableBody,
	Footer as TableFooter,
	Row as TableRow,
	Head as TableHead,
	Cell as TableCell,
	Caption as TableCaption
};

export {
	resolveTableBody,
	resolveTableCaption,
	resolveTableCell,
	resolveTableContainer,
	resolveTableFooter,
	resolveTableHead,
	resolveTableHeader,
	resolveTableRoot,
	resolveTableRow,
	tableBodyBaseClass,
	tableCaptionBaseClass,
	tableCellBaseClass,
	tableContainerBaseClass,
	tableFooterBaseClass,
	tableHeadBaseClass,
	tableHeaderBaseClass,
	tableRootBaseClass,
	tableRowBaseClass
} from './table.js';

export type {
	TableBodyProps,
	TableCaptionProps,
	TableCellProps,
	TableFooterProps,
	TableHeadProps,
	TableHeaderProps,
	TableRootProps,
	TableRowProps
} from './types.js';
