<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { resolveTabsTrigger } from './tabs.js';
	import type { TabsTriggerProps } from './types.js';

	let { ref = $bindable(null), class: className, ...restProps }: TabsTriggerProps = $props();

	const resolved = $derived(resolveTabsTrigger({ class: className }));
</script>

<TabsPrimitive.Trigger
	bind:ref
	data-slot="tabs-trigger"
	class={resolved.className}
	{...restProps}
/>
