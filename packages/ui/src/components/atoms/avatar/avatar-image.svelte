<script lang="ts">
	import { Avatar as AvatarPrimitive } from 'bits-ui';
	import { resolveAvatarImage } from './avatar.js';
	import type { AvatarImageProps } from './types.js';

	let { ref = $bindable(null), class: className, ...restProps }: AvatarImageProps = $props();

	const resolved = $derived(resolveAvatarImage({ class: className }));
</script>

<AvatarPrimitive.Image
	bind:ref
	data-slot="avatar-image"
	class={resolved.className}
	{...restProps}
/>
