<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { resolveDialogTitle } from './dialog.js';
	import type { DialogTitleProps } from './types.js';

	let { ref = $bindable(null), class: className, ...restProps }: DialogTitleProps = $props();

	const resolved = $derived(resolveDialogTitle({ class: className }));
</script>

<DialogPrimitive.Title
	bind:ref
	data-slot="dialog-title"
	class={resolved.className}
	{...restProps}
/>
