<script lang="ts">
	import InputField from './InputField.svelte';
	import type { InputFieldProps } from './types.js';

	let {
		label = 'Title',
		id = 'input-field-a11y',
		required = false,
		hint,
		error,
		disabled = false,
		control = 'input',
		value = $bindable(''),
		placeholder = 'Resource title'
	}: InputFieldProps = $props();
</script>

<InputField {label} {id} {required} {hint} {error} {disabled} {control} bind:value {placeholder} />
