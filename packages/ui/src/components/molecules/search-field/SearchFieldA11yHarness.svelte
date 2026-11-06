<script lang="ts">
	import { Label } from '../../atoms/label/index.js';
	import { SearchField } from './index.js';

	let {
		label = 'Search',
		inputId = 'search-field-a11y',
		value = $bindable(''),
		disabled = false,
		invalid = false
	}: {
		label?: string;
		inputId?: string;
		value?: string;
		disabled?: boolean;
		invalid?: boolean;
	} = $props();
</script>

<div class="flex max-w-sm flex-col gap-2">
	<Label for={inputId}>{label}</Label>
	<SearchField {inputId} bind:value {disabled} {invalid} aria-label={label} placeholder="Field" />
</div>
