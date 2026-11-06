<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import type { DialogRootProps } from './types.js';

	let { open = $bindable(false), ...restProps }: DialogRootProps = $props();
</script>

<DialogPrimitive.Root bind:open {...restProps} />
