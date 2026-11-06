<script lang="ts">
	import { resolveDivider } from './divider.js';
	import type { DividerProps } from './types.js';

	let {
		orientation = 'horizontal',
		color = 'base',
		class: className = '',
		ariaHidden = true,
		...rest
	}: DividerProps & { [key: string]: unknown } = $props();

	const resolved = $derived(resolveDivider({ orientation, color, class: className, ariaHidden }));
</script>

<div
	class={resolved.className}
	role={resolved.ariaHidden ? undefined : 'separator'}
	aria-orientation={resolved.ariaHidden ? undefined : resolved.orientation}
	aria-hidden={resolved.ariaHidden ? 'true' : undefined}
	data-border-var={resolved.borderVar}
	{...rest}
></div>
