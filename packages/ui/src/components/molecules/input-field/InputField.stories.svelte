<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../../particles/stack/index.js';
	import InputField from './InputField.svelte';

	/**
	 * Molecule: Label + Input/Textarea + hint/error on Stack.
	 * Empty joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Molecules/InputField',
		tags: ['autodocs']
	});
</script>

<Story name="Empty" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<InputField
			id="story-input-field-empty"
			label="Title"
			hint="Shown in the resources table"
			placeholder="Resource title"
			class="max-w-sm"
		/>
	{/snippet}
</Story>

<Story name="Filled">
	{#snippet template()}
		<InputField
			id="story-input-field-filled"
			label="Title"
			value="Intro to Pack"
			hint="Shown in the resources table"
			class="max-w-sm"
		/>
	{/snippet}
</Story>

<Story name="Error">
	{#snippet template()}
		<InputField
			id="story-input-field-error"
			label="Title"
			required
			error="Title is required"
			placeholder="Resource title"
			class="max-w-sm"
		/>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template()}
		<InputField
			id="story-input-field-disabled"
			label="Provider"
			value="AWS"
			disabled
			hint="Set by the upload source"
			class="max-w-sm"
		/>
	{/snippet}
</Story>

<Story name="Textarea">
	{#snippet template()}
		<Stack direction="column" gap="4" class="max-w-sm">
			<InputField
				id="story-input-field-textarea"
				label="Description"
				control="textarea"
				hint="Optional longer copy"
				placeholder="Describe the resource"
				rows={4}
			/>
		</Stack>
	{/snippet}
</Story>
