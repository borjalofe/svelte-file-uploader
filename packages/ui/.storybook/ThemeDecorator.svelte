<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="bg-background text-foreground min-h-screen font-sans antialiased">
	{@render children()}
</div>
