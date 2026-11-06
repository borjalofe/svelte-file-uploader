<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { resolveDropdownMenuItem } from './dropdown-menu.js';
	import type { DropdownMenuItemProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		inset,
		variant = 'default',
		...restProps
	}: DropdownMenuItemProps = $props();

	const resolved = $derived(resolveDropdownMenuItem({ class: className }));
</script>

<DropdownMenuPrimitive.Item
	bind:ref
	data-slot="dropdown-menu-item"
	data-inset={inset}
	data-variant={variant}
	class={resolved.className}
	{...restProps}
/>
