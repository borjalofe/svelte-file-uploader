<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolveBadge } from './badge.js';
	import type { BadgeProps } from './types.js';

	let {
		ref = $bindable(null),
		href = undefined,
		class: className,
		variant = 'default',
		children,
		...restProps
	}: BadgeProps & { children?: Snippet } = $props();

	const resolved = $derived(resolveBadge({ variant, class: className }));
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={resolved.className}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
