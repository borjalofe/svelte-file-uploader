<script lang="ts">
	import { Avatar as AvatarPrimitive } from 'bits-ui';
	import { resolveAvatarFallback } from './avatar.js';
	import type { AvatarFallbackProps } from './types.js';

	let { ref = $bindable(null), class: className, ...restProps }: AvatarFallbackProps = $props();

	const resolved = $derived(resolveAvatarFallback({ class: className }));
</script>

<AvatarPrimitive.Fallback
	bind:ref
	data-slot="avatar-fallback"
	class={resolved.className}
	{...restProps}
/>
