<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { resolveTabsList } from './tabs.js';
	import type { TabsListProps } from './types.js';

	let { ref = $bindable(null), class: className, ...restProps }: TabsListProps = $props();

	const resolved = $derived(resolveTabsList({ class: className }));
</script>

<TabsPrimitive.List bind:ref data-slot="tabs-list" class={resolved.className} {...restProps} />
