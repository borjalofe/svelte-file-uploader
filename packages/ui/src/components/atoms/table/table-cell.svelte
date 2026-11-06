<script lang="ts">
	import { resolveTableCell } from './table.js';
	import type { TableCellProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: TableCellProps = $props();

	const resolved = $derived(resolveTableCell({ class: className }));
</script>

<td bind:this={ref} data-slot="table-cell" class={resolved.className} {...restProps}>
	{@render children?.()}
</td>
