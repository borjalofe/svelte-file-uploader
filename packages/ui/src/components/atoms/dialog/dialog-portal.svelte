<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import type { DialogPortalProps } from './types.js';

	let { ...restProps }: DialogPortalProps = $props();
</script>

<DialogPrimitive.Portal {...restProps} />
