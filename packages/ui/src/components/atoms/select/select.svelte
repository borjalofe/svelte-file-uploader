<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { SelectRootProps } from './types.js';

	let { open = $bindable(false), value = $bindable(), ...restProps }: SelectRootProps = $props();
</script>

<SelectPrimitive.Root bind:open bind:value={value as never} {...restProps} />
