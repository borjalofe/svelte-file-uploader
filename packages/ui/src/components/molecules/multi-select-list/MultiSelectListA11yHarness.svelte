<script lang="ts">
	import MultiSelectList from './MultiSelectList.svelte';
	import type { MultiSelectListProps } from './types.js';

	let {
		label = 'Role',
		id = 'multi-select-a11y',
		value = $bindable<string[]>([]),
		disabled = false,
		invalid = false,
		error = 'Select at least one role'
	}: MultiSelectListProps = $props();
</script>

<MultiSelectList {label} {id} bind:value {disabled} {invalid} {error} class="max-w-sm" />
