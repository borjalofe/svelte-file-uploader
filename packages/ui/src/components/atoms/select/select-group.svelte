<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { SelectGroupProps } from './types.js';

	let { ref = $bindable(null), ...restProps }: SelectGroupProps = $props();
</script>

<SelectPrimitive.Group bind:ref data-slot="select-group" {...restProps} />
