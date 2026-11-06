<script lang="ts">
	import CheckIcon from '@lucide/svelte/icons/check';
	import { Select as SelectPrimitive } from 'bits-ui';
	import { resolveSelectItem } from './select.js';
	import type { SelectItemProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		children: childrenProp,
		...restProps
	}: SelectItemProps = $props();

	const resolved = $derived(resolveSelectItem({ class: className }));
</script>

<SelectPrimitive.Item
	bind:ref
	{value}
	data-slot="select-item"
	class={resolved.className}
	{...restProps}
>
	{#snippet children({ selected, highlighted })}
		<span class="absolute end-2 flex size-3.5 items-center justify-center">
			{#if selected}
				<CheckIcon class="size-4" />
			{/if}
		</span>
		{#if childrenProp}
			{@render childrenProp({ selected, highlighted })}
		{:else}
			{label || value}
		{/if}
	{/snippet}
</SelectPrimitive.Item>
