<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import type { DialogTriggerProps } from './types.js';

	let { ref = $bindable(null), type = 'button', ...restProps }: DialogTriggerProps = $props();
</script>

<DialogPrimitive.Trigger bind:ref data-slot="dialog-trigger" {type} {...restProps} />
