<script lang="ts">
	import { resolveTableCaption } from './table.js';
	import type { TableCaptionProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: TableCaptionProps = $props();

	const resolved = $derived(resolveTableCaption({ class: className }));
</script>

<caption bind:this={ref} data-slot="table-caption" class={resolved.className} {...restProps}>
	{@render children?.()}
</caption>
