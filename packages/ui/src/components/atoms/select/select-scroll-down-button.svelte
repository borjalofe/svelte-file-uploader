<script lang="ts">
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn } from '../../../lib/utils.js';
	import type { SelectScrollDownButtonProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: SelectScrollDownButtonProps = $props();
</script>

<SelectPrimitive.ScrollDownButton
	bind:ref
	data-slot="select-scroll-down-button"
	class={cn('flex cursor-default items-center justify-center py-1', className)}
	{...restProps}
>
	<ChevronDownIcon class="size-4" />
</SelectPrimitive.ScrollDownButton>
