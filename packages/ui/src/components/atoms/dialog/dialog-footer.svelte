<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { Button } from '../button/index.js';
	import { resolveDialogFooter } from './dialog.js';
	import type { DialogFooterProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		showCloseButton = false,
		...restProps
	}: DialogFooterProps = $props();

	const resolved = $derived(resolveDialogFooter({ class: className }));
</script>

<div bind:this={ref} data-slot="dialog-footer" class={resolved.className} {...restProps}>
	{@render children?.()}
	{#if showCloseButton}
		<DialogPrimitive.Close>
			{#snippet child({ props })}
				<Button variant="outline" {...props}>Close</Button>
			{/snippet}
		</DialogPrimitive.Close>
	{/if}
</div>
