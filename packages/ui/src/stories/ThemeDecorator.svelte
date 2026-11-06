<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen bg-background font-sans text-foreground antialiased">
	{@render children()}
</div>
