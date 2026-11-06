<script lang="ts">
	import { resolveCardRoot } from './card.js';
	import type { CardRootProps } from './types.js';

	let { ref = $bindable(null), class: className, children, ...restProps }: CardRootProps = $props();

	const resolved = $derived(resolveCardRoot({ class: className }));
</script>

<div bind:this={ref} data-slot="card" class={resolved.className} {...restProps}>
	{@render children?.()}
</div>
