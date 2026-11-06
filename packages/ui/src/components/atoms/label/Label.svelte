<script lang="ts">
	import { Label as LabelPrimitive } from 'bits-ui';
	import { resolveLabel } from './label.js';
	import type { LabelProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		'data-slot': dataSlot = 'label',
		...restProps
	}: LabelProps = $props();

	const resolved = $derived(resolveLabel({ class: className }));
</script>

<LabelPrimitive.Root bind:ref data-slot={dataSlot} class={resolved.className} {...restProps} />
