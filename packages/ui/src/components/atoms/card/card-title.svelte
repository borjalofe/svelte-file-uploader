<script lang="ts">
	import { resolveCardTitle } from './card.js';
	import type { CardTitleProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CardTitleProps = $props();

	const resolved = $derived(resolveCardTitle({ class: className }));
</script>

<div bind:this={ref} data-slot="card-title" class={resolved.className} {...restProps}>
	{@render children?.()}
</div>
