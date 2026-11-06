<script lang="ts">
	import { resolveCardAction } from './card.js';
	import type { CardActionProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CardActionProps = $props();

	const resolved = $derived(resolveCardAction({ class: className }));
</script>

<div bind:this={ref} data-slot="card-action" class={resolved.className} {...restProps}>
	{@render children?.()}
</div>
