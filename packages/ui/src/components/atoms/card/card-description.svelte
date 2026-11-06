<script lang="ts">
	import { resolveCardDescription } from './card.js';
	import type { CardDescriptionProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CardDescriptionProps = $props();

	const resolved = $derived(resolveCardDescription({ class: className }));
</script>

<p bind:this={ref} data-slot="card-description" class={resolved.className} {...restProps}>
	{@render children?.()}
</p>
