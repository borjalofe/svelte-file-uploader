<script lang="ts">
	import { Separator as SeparatorPrimitive } from 'bits-ui';
	import { cn } from '../../../lib/utils.js';
	import type { SelectSeparatorProps } from './types.js';

	let { ref = $bindable(null), class: className, ...restProps }: SelectSeparatorProps = $props();
</script>

<SeparatorPrimitive.Root
	bind:ref
	data-slot="select-separator"
	class={cn('pointer-events-none -mx-1 my-1 h-px bg-border', className)}
	{...restProps}
/>
