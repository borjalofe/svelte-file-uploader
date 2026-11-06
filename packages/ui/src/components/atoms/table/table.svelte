<script lang="ts">
	import { resolveTableContainer, resolveTableRoot } from './table.js';
	import type { TableRootProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: TableRootProps = $props();

	const resolved = $derived(resolveTableRoot({ class: className }));
	const container = $derived(resolveTableContainer());
</script>

<div data-slot="table-container" class={container.className}>
	<table bind:this={ref} data-slot="table" class={resolved.className} {...restProps}>
		{@render children?.()}
	</table>
</div>
