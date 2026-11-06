<script lang="ts">
	import { resolveSpacer } from './spacer.js';
	import type { SpacerProps } from './types.js';

	let {
		axis = 'vertical',
		size = '4',
		grow = false,
		class: className = '',
		ariaHidden = true,
		...rest
	}: SpacerProps & { [key: string]: unknown } = $props();

	const resolved = $derived(resolveSpacer({ axis, size, grow, class: className, ariaHidden }));
</script>

<div
	class={resolved.className}
	aria-hidden={resolved.ariaHidden ? 'true' : undefined}
	data-size-var={resolved.sizeVar}
	{...rest}
></div>
