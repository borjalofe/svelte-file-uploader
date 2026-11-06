<script lang="ts">
	import { cn } from '../../../lib/utils.js';
	import type { SelectLabelProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: SelectLabelProps = $props();
</script>

<div
	bind:this={ref}
	data-slot="select-label"
	class={cn('px-2 py-1.5 text-xs text-muted-foreground', className)}
	{...restProps}
>
	{@render children?.()}
</div>
