<script lang="ts">
	import { resolveTableHeader } from './table.js';
	import type { TableHeaderProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: TableHeaderProps = $props();

	const resolved = $derived(resolveTableHeader({ class: className }));
</script>

<thead bind:this={ref} data-slot="table-header" class={resolved.className} {...restProps}>
	{@render children?.()}
</thead>
