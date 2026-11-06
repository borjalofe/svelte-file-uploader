<script lang="ts">
	import { Avatar as AvatarPrimitive } from 'bits-ui';
	import { resolveAvatarRoot } from './avatar.js';
	import type { AvatarRootProps } from './types.js';

	let {
		ref = $bindable(null),
		loadingStatus = $bindable('loading'),
		class: className,
		...restProps
	}: AvatarRootProps = $props();

	const resolved = $derived(resolveAvatarRoot({ class: className }));
</script>

<AvatarPrimitive.Root
	bind:ref
	bind:loadingStatus
	data-slot="avatar"
	class={resolved.className}
	{...restProps}
/>
