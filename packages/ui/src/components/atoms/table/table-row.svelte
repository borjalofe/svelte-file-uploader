<script lang="ts">
	import { resolveTableRow } from './table.js';
	import type { TableRowProps } from './types.js';

	let { ref = $bindable(null), class: className, children, ...restProps }: TableRowProps = $props();

	const resolved = $derived(resolveTableRow({ class: className }));
</script>

<tr bind:this={ref} data-slot="table-row" class={resolved.className} {...restProps}>
	{@render children?.()}
</tr>
