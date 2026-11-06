<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from './index.js';

	let {
		alt = 'Ada Lovelace',
		initials = 'AL',
		src = ''
	}: {
		alt?: string;
		initials?: string;
		src?: string;
	} = $props();
</script>

{#if src}
	<!-- Name comes from the image `alt` — do not put aria-label on the root div. -->
	<Avatar>
		<AvatarImage {src} {alt} />
		<AvatarFallback aria-hidden="true">{initials}</AvatarFallback>
	</Avatar>
{:else}
	<!-- Fallback-only: role=img makes aria-label valid on the root. -->
	<Avatar role="img" aria-label={alt}>
		<AvatarFallback aria-hidden="true">{initials}</AvatarFallback>
	</Avatar>
{/if}
