<script lang="ts">
	import { resolveTableBody } from './table.js';
	import type { TableBodyProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: TableBodyProps = $props();

	const resolved = $derived(resolveTableBody({ class: className }));
</script>

<tbody bind:this={ref} data-slot="table-body" class={resolved.className} {...restProps}>
	{@render children?.()}
</tbody>
