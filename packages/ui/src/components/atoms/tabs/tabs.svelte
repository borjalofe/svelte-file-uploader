<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { resolveTabsRoot } from './tabs.js';
	import type { TabsRootProps } from './types.js';

	let {
		ref = $bindable(null),
		value = $bindable(''),
		class: className,
		...restProps
	}: TabsRootProps = $props();

	const resolved = $derived(resolveTabsRoot({ class: className }));
</script>

<TabsPrimitive.Root
	bind:ref
	bind:value
	data-slot="tabs"
	class={resolved.className}
	{...restProps}
/>
