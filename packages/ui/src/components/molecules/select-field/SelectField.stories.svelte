<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SelectField from './SelectField.svelte';

	/**
	 * Pack SelectField molecule — Label + Select + error on semantic tokens.
	 * Empty joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Molecules/SelectField',
		tags: ['autodocs']
	});

	const roleOptions = [
		{ value: 'admin', label: 'Admin' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer' }
	];
</script>

<Story name="Empty" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<SelectField
			class="max-w-sm"
			label="Role"
			triggerId="story-select-field-empty"
			placeholder="Select role"
			options={roleOptions}
		/>
	{/snippet}
</Story>

<Story name="Filled">
	{#snippet template()}
		<SelectField
			class="max-w-sm"
			label="Role"
			triggerId="story-select-field-filled"
			placeholder="Select role"
			value="editor"
			options={roleOptions}
		/>
	{/snippet}
</Story>

<Story name="Error">
	{#snippet template()}
		<SelectField
			class="max-w-sm"
			label="Role"
			triggerId="story-select-field-error"
			placeholder="Select role"
			invalid
			error="Choose a role"
			options={roleOptions}
		/>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template()}
		<SelectField
			class="max-w-sm"
			label="Provider"
			triggerId="story-select-field-disabled"
			placeholder="Select provider"
			value="admin"
			disabled
			options={roleOptions}
		/>
	{/snippet}
</Story>
