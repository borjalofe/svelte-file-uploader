<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { SelectPortalProps } from './types.js';

	let { ...restProps }: SelectPortalProps = $props();
</script>

<SelectPrimitive.Portal {...restProps} />
