<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { resolveDialogOverlay } from './dialog.js';
	import type { DialogOverlayProps } from './types.js';

	let { ref = $bindable(null), class: className, ...restProps }: DialogOverlayProps = $props();

	const resolved = $derived(resolveDialogOverlay({ class: className }));
</script>

<DialogPrimitive.Overlay
	bind:ref
	data-slot="dialog-overlay"
	class={resolved.className}
	{...restProps}
/>
