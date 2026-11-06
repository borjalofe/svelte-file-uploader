<script lang="ts">
	import { Separator as SeparatorPrimitive } from 'bits-ui';
	import { resolveSeparator } from './separator.js';
	import type { SeparatorProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		'data-slot': dataSlot = 'separator',
		...restProps
	}: SeparatorProps = $props();

	const resolved = $derived(resolveSeparator({ class: className }));
</script>

<SeparatorPrimitive.Root bind:ref data-slot={dataSlot} class={resolved.className} {...restProps} />
