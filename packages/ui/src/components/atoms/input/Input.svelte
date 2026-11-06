<script lang="ts">
	import { resolveInput } from './input.js';
	import type { InputProps } from './types.js';

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		'data-slot': dataSlot = 'input',
		...restProps
	}: InputProps = $props();

	const resolved = $derived(resolveInput({ class: className }));
</script>

{#if type === 'file'}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={resolved.className}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={resolved.className}
		{type}
		bind:value
		{...restProps}
	/>
{/if}
