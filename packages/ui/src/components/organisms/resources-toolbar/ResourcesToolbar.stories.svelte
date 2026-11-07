<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ResourcesToolbar from './ResourcesToolbar.svelte';

	/**
	 * Pack ResourcesToolbar — type Tabs + SearchField + primary Upload.
	 * Filter rule: All never disabled; other tabs need ≥1 item of that type.
	 * Empty joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Organisms/ResourcesToolbar',
		tags: ['autodocs']
	});
</script>

<Story name="Empty" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<ResourcesToolbar counts={{}} />
	{/snippet}
</Story>

<Story name="VideosOnly">
	{#snippet template()}
		<ResourcesToolbar counts={{ videos: 3 }} />
	{/snippet}
</Story>

<Story name="MixedTypes">
	{#snippet template()}
		<ResourcesToolbar
			value="documents"
			query="pack"
			counts={{ videos: 2, documents: 5, lessons: 1, archive: 4 }}
		/>
	{/snippet}
</Story>
