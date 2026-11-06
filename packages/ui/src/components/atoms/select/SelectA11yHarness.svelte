<script lang="ts">
	import { Label } from '../label/index.js';
	import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './index.js';

	let {
		label = 'Role',
		id = 'select-a11y',
		disabled = false,
		value = $bindable<string | undefined>(undefined)
	}: {
		label?: string;
		id?: string;
		disabled?: boolean;
		value?: string;
	} = $props();
</script>

<div class="flex max-w-sm flex-col gap-2">
	<Label for={id}>{label}</Label>
	<Select type="single" bind:value>
		<SelectTrigger {id} {disabled} class="w-full" aria-label={label}>
			<SelectValue placeholder="Select an option" />
		</SelectTrigger>
		<SelectContent>
			<SelectItem value="admin" label="Admin" />
			<SelectItem value="editor" label="Editor" />
			<SelectItem value="viewer" label="Viewer" />
		</SelectContent>
	</Select>
</div>
