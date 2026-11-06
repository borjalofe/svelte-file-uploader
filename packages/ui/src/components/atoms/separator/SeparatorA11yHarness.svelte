<script lang="ts">
	import Separator from './Separator.svelte';
	import type { SeparatorProps } from './types.js';

	let { orientation = 'horizontal', decorative = true, ...rest }: SeparatorProps = $props();
</script>

<div class="w-full max-w-sm space-y-2">
	<p class="text-sm text-foreground">Above</p>
	<Separator {orientation} {decorative} {...rest} />
	<p class="text-sm text-foreground">Below</p>
</div>
