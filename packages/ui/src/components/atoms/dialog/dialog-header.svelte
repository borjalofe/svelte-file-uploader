<script lang="ts">
	import { resolveDialogHeader } from './dialog.js';
	import type { DialogHeaderProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: DialogHeaderProps = $props();

	const resolved = $derived(resolveDialogHeader({ class: className }));
</script>

<div bind:this={ref} data-slot="dialog-header" class={resolved.className} {...restProps}>
	{@render children?.()}
</div>
