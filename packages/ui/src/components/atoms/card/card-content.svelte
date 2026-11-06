<script lang="ts">
	import { resolveCardContent } from './card.js';
	import type { CardContentProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CardContentProps = $props();

	const resolved = $derived(resolveCardContent({ class: className }));
</script>

<div bind:this={ref} data-slot="card-content" class={resolved.className} {...restProps}>
	{@render children?.()}
</div>
