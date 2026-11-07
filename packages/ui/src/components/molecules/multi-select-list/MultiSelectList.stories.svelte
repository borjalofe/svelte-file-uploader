<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MultiSelectList from './MultiSelectList.svelte';

	/**
	 * Pack MultiSelectList — Role multi options (Mentor / Coach, Mentee / Coachee).
	 * Empty joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Molecules/MultiSelectList',
		tags: ['autodocs']
	});
</script>

<Story name="Empty" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<MultiSelectList class="max-w-sm" label="Role" id="story-multi-select-empty" />
	{/snippet}
</Story>

<Story name="Filled">
	{#snippet template()}
		<MultiSelectList
			class="max-w-sm"
			label="Role"
			id="story-multi-select-filled"
			value={['mentor-coach']}
		/>
	{/snippet}
</Story>

<Story name="Error">
	{#snippet template()}
		<MultiSelectList
			class="max-w-sm"
			label="Role"
			id="story-multi-select-error"
			invalid
			error="Select at least one role"
		/>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template()}
		<MultiSelectList
			class="max-w-sm"
			label="Role"
			id="story-multi-select-disabled"
			value={['mentee-coachee']}
			disabled
		/>
	{/snippet}
</Story>
