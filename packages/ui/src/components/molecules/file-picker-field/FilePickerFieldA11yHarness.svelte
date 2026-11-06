<script lang="ts">
	import { FilePickerField } from './index.js';

	let {
		label = 'File',
		inputId = 'file-picker-a11y',
		filename = $bindable(''),
		disabled = false,
		invalid = false,
		error = 'Choose a file'
	}: {
		label?: string;
		inputId?: string;
		filename?: string;
		disabled?: boolean;
		invalid?: boolean;
		error?: string;
	} = $props();
</script>

<FilePickerField
	class="max-w-md"
	{label}
	{inputId}
	bind:filename
	{disabled}
	{invalid}
	{error}
	placeholder="No file selected"
	buttonLabel="Select file"
/>
