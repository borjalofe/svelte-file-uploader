<script lang="ts">
	import { resolveTextarea } from './textarea.js';
	import type { TextareaProps } from './types.js';

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		'data-slot': dataSlot = 'textarea',
		...restProps
	}: TextareaProps = $props();

	const resolved = $derived(resolveTextarea({ class: className }));
</script>

<textarea bind:this={ref} data-slot={dataSlot} class={resolved.className} bind:value {...restProps}
></textarea>
