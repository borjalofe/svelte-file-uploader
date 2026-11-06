<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../../particles/stack/index.js';
	import { Label } from '../../atoms/label/index.js';
	import SearchField from './SearchField.svelte';

	/**
	 * Pack SearchField molecule — Input + leading search icon on semantic tokens.
	 * Empty joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Molecules/SearchField',
		tags: ['autodocs']
	});
</script>

<Story name="Empty" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-sm">
			<Label for="story-search-empty">Search</Label>
			<SearchField inputId="story-search-empty" aria-label="Search" placeholder="Field" />
		</Stack>
	{/snippet}
</Story>

<Story name="Filled">
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-sm">
			<Label for="story-search-filled">Search</Label>
			<SearchField
				inputId="story-search-filled"
				aria-label="Search"
				placeholder="Field"
				value="Videos"
			/>
		</Stack>
	{/snippet}
</Story>

<Story name="Error">
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-sm">
			<Label for="story-search-error">Search</Label>
			<SearchField inputId="story-search-error" aria-label="Search" placeholder="Field" invalid />
		</Stack>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-sm">
			<Label for="story-search-disabled">Search</Label>
			<SearchField
				inputId="story-search-disabled"
				aria-label="Search"
				placeholder="Field"
				value="Locked query"
				disabled
			/>
		</Stack>
	{/snippet}
</Story>
