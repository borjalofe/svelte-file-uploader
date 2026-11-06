<script lang="ts">
	import Badge from './Badge.svelte';
	import type { BadgeVariant } from './types.js';

	let {
		label = 'Video',
		variant = 'secondary' as BadgeVariant,
		href = undefined as string | undefined
	}: {
		label?: string;
		variant?: BadgeVariant;
		href?: string;
	} = $props();
</script>

<Badge {variant} {href}>{label}</Badge>
