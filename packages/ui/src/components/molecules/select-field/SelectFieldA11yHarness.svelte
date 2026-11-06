<script lang="ts">
	import { SelectField } from './index.js';
	import type { SelectFieldOption } from './types.js';

	const options: SelectFieldOption[] = [
		{ value: 'admin', label: 'Admin' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer' }
	];

	let {
		label = 'Role',
		triggerId = 'select-field-a11y',
		value = $bindable<string | undefined>(undefined),
		disabled = false,
		invalid = false,
		error = 'Choose a role'
	}: {
		label?: string;
		triggerId?: string;
		value?: string;
		disabled?: boolean;
		invalid?: boolean;
		error?: string;
	} = $props();
</script>

<SelectField
	class="max-w-sm"
	{label}
	{triggerId}
	bind:value
	{disabled}
	{invalid}
	{error}
	{options}
	placeholder="Select role"
/>
