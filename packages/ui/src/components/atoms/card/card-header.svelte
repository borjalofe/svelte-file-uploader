<script lang="ts">
	import { resolveCardHeader } from './card.js';
	import type { CardHeaderProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CardHeaderProps = $props();

	const resolved = $derived(resolveCardHeader({ class: className }));
</script>

<div bind:this={ref} data-slot="card-header" class={resolved.className} {...restProps}>
	{@render children?.()}
</div>
