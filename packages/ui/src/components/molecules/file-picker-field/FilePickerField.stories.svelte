<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FilePickerField from './FilePickerField.svelte';

	/**
	 * Pack FilePickerField molecule — filename display + Select file + hidden input.
	 * Empty joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Molecules/FilePickerField',
		tags: ['autodocs']
	});
</script>

<Story name="Empty" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<FilePickerField
			class="max-w-md"
			label="File"
			inputId="story-file-picker-empty"
			placeholder="No file selected"
			buttonLabel="Select file"
		/>
	{/snippet}
</Story>

<Story name="Filled">
	{#snippet template()}
		<FilePickerField
			class="max-w-md"
			label="File"
			inputId="story-file-picker-filled"
			filename="resource-upload.pdf"
			placeholder="No file selected"
			buttonLabel="Select file"
		/>
	{/snippet}
</Story>

<Story name="Error">
	{#snippet template()}
		<FilePickerField
			class="max-w-md"
			label="File"
			inputId="story-file-picker-error"
			invalid
			error="Choose a file"
			placeholder="No file selected"
			buttonLabel="Select file"
		/>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template()}
		<FilePickerField
			class="max-w-md"
			label="File"
			inputId="story-file-picker-disabled"
			filename="locked.pdf"
			disabled
			placeholder="No file selected"
			buttonLabel="Select file"
		/>
	{/snippet}
</Story>
