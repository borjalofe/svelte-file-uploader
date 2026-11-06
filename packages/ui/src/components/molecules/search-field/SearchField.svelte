<script lang="ts">
	import SearchIcon from '@lucide/svelte/icons/search';
	import { Input } from '../../atoms/input/index.js';
	import {
		resolveSearchFieldInput,
		resolveSearchFieldRoot,
		searchFieldIconBaseClass
	} from './search-field.js';
	import type { SearchFieldProps } from './types.js';

	let {
		ref = $bindable(null),
		value = $bindable(''),
		class: className,
		inputClass,
		inputId,
		placeholder = 'Field',
		disabled = false,
		invalid = false,
		'aria-label': ariaLabel = 'Search',
		name,
		required,
		readonly,
		autocomplete,
		...restProps
	}: SearchFieldProps = $props();

	const root = $derived(resolveSearchFieldRoot({ class: className }));
	const inputClasses = $derived(resolveSearchFieldInput({ class: inputClass }));
</script>

<div
	bind:this={ref}
	data-slot="search-field"
	class={root.className}
	data-disabled={disabled ? 'true' : undefined}
	data-invalid={invalid ? 'true' : undefined}
	{...restProps}
>
	<SearchIcon data-slot="search-field-icon" class={searchFieldIconBaseClass} aria-hidden="true" />
	<Input
		id={inputId}
		class={inputClasses.className}
		type="search"
		bind:value
		{placeholder}
		{disabled}
		{name}
		{required}
		{readonly}
		{autocomplete}
		aria-label={ariaLabel}
		aria-invalid={invalid ? 'true' : undefined}
		data-slot="search-field-input"
	/>
</div>
