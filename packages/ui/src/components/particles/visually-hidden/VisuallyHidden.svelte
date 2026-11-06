<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolveVisuallyHidden } from './visually-hidden.js';
	import type { VisuallyHiddenProps } from './types.js';

	let {
		unhideOnFocus = true,
		class: className = '',
		children,
		...rest
	}: VisuallyHiddenProps & { children?: Snippet; [key: string]: unknown } = $props();

	const resolved = $derived(resolveVisuallyHidden({ unhideOnFocus, class: className }));
</script>

<span class={resolved.className} data-unhide-on-focus={resolved.unhideOnFocus} {...rest}>
	{@render children?.()}
</span>
