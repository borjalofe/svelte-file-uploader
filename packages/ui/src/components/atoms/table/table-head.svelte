<script lang="ts">
	import { resolveTableHead } from './table.js';
	import type { TableHeadProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: TableHeadProps = $props();

	const resolved = $derived(resolveTableHead({ class: className }));
</script>

<th bind:this={ref} data-slot="table-head" class={resolved.className} {...restProps}>
	{@render children?.()}
</th>
