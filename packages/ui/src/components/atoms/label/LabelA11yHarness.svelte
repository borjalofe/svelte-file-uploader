<script lang="ts">
	import Label from './Label.svelte';
	import type { LabelProps } from './types.js';

	let {
		label = 'Search',
		id = 'label-a11y',
		inputDisabled = false,
		...rest
	}: LabelProps & { label?: string; id?: string; inputDisabled?: boolean } = $props();
</script>

<Label for={id} {...rest}>{label}</Label>
<input
	{id}
	class="flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
	type="text"
	disabled={inputDisabled}
/>
