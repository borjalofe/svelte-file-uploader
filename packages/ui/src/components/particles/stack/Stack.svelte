<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolveStack } from './stack.js';
	import type { StackProps } from './types.js';

	let {
		direction = 'column',
		gap = '4',
		align = 'stretch',
		justify = 'start',
		class: className = '',
		children,
		...rest
	}: StackProps & { children?: Snippet; [key: string]: unknown } = $props();

	const resolved = $derived(resolveStack({ direction, gap, align, justify, class: className }));
</script>

<div class={resolved.className} data-gap-var={resolved.gapVar} {...rest}>
	{@render children?.()}
</div>
