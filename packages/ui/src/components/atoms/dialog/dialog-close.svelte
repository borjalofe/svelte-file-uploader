<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import type { DialogCloseProps } from './types.js';

	let { ref = $bindable(null), type = 'button', ...restProps }: DialogCloseProps = $props();
</script>

<DialogPrimitive.Close bind:ref data-slot="dialog-close" {type} {...restProps} />
