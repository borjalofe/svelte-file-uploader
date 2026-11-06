<script lang="ts">
	import { resolveCardFooter } from './card.js';
	import type { CardFooterProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CardFooterProps = $props();

	const resolved = $derived(resolveCardFooter({ class: className }));
</script>

<div bind:this={ref} data-slot="card-footer" class={resolved.className} {...restProps}>
	{@render children?.()}
</div>
