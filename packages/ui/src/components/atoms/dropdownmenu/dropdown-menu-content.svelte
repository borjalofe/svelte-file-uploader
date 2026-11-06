<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import DropdownMenuPortal from './dropdown-menu-portal.svelte';
	import { resolveDropdownMenuContent } from './dropdown-menu.js';
	import type { DropdownMenuContentProps } from './types.js';

	let {
		ref = $bindable(null),
		sideOffset = 4,
		portalProps,
		class: className,
		...restProps
	}: DropdownMenuContentProps = $props();

	const resolved = $derived(resolveDropdownMenuContent({ class: className }));
</script>

<DropdownMenuPortal {...portalProps}>
	<DropdownMenuPrimitive.Content
		bind:ref
		data-slot="dropdown-menu-content"
		{sideOffset}
		class={resolved.className}
		{...restProps}
	/>
</DropdownMenuPortal>
