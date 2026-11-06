<script lang="ts">
	import { resolveTableFooter } from './table.js';
	import type { TableFooterProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: TableFooterProps = $props();

	const resolved = $derived(resolveTableFooter({ class: className }));
</script>

<tfoot bind:this={ref} data-slot="table-footer" class={resolved.className} {...restProps}>
	{@render children?.()}
</tfoot>
