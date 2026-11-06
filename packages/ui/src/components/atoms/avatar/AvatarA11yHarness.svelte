<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from './index.js';

	let {
		alt = 'Ada Lovelace',
		initials = 'AL',
		src = '',
		'aria-label': ariaLabel = alt
	}: {
		alt?: string;
		initials?: string;
		src?: string;
		'aria-label'?: string;
	} = $props();
</script>

<Avatar aria-label={ariaLabel}>
	{#if src}
		<AvatarImage {src} {alt} />
	{/if}
	<AvatarFallback aria-hidden={src ? 'true' : undefined}>{initials}</AvatarFallback>
</Avatar>
