<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { resolveDialogDescription } from './dialog.js';
	import type { DialogDescriptionProps } from './types.js';

	let { ref = $bindable(null), class: className, ...restProps }: DialogDescriptionProps = $props();

	const resolved = $derived(resolveDialogDescription({ class: className }));
</script>

<DialogPrimitive.Description
	bind:ref
	data-slot="dialog-description"
	class={resolved.className}
	{...restProps}
/>
