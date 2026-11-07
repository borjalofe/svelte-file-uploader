<script lang="ts">
	import UploadResourceDialog from './UploadResourceDialog.svelte';
	import type { UploadResourceDialogProps } from './types.js';

	let {
		open = $bindable(false),
		dialogTitle = 'Upload Resource',
		dialogDescription = 'Add a new resource to the library.',
		title = $bindable(''),
		description = $bindable(''),
		category = $bindable<string | undefined>(undefined),
		language = $bindable<string | undefined>(undefined),
		provider = $bindable<string | undefined>(undefined),
		roles = $bindable<string[]>([]),
		filename = $bindable(''),
		disabled = false,
		onUpload
	}: UploadResourceDialogProps = $props();
</script>

<UploadResourceDialog
	bind:open
	{dialogTitle}
	{dialogDescription}
	bind:title
	bind:description
	bind:category
	bind:language
	bind:provider
	bind:roles
	bind:filename
	{disabled}
	{onUpload}
/>
