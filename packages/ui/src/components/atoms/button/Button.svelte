<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolveButton } from './button.js';
	import type { ButtonProps } from './types.js';

	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		children,
		...restProps
	}: ButtonProps & { children?: Snippet } = $props();

	const resolved = $derived(resolveButton({ variant, size, class: className }));
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={resolved.className}
		href={disabled ? undefined : href}
		aria-disabled={disabled ? 'true' : undefined}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={resolved.className}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
