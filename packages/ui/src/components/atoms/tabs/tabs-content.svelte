<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { resolveTabsContent } from './tabs.js';
	import type { TabsContentProps } from './types.js';

	let { ref = $bindable(null), class: className, ...restProps }: TabsContentProps = $props();

	const resolved = $derived(resolveTabsContent({ class: className }));
</script>

<TabsPrimitive.Content
	bind:ref
	data-slot="tabs-content"
	class={resolved.className}
	{...restProps}
/>
