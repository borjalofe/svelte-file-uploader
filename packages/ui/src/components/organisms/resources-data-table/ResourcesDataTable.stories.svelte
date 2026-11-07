<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ResourcesDataTable from './ResourcesDataTable.svelte';
	import { resourcesDataTableDemoRows } from './resources-data-table.demo.js';

	/**
	 * Pack ResourcesDataTable organism — Table + sort + Badge + row DropdownMenu.
	 * Row `type` feeds toolbar counts via `countResourceTypes`.
	 * Default joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Organisms/ResourcesDataTable',
		tags: ['autodocs']
	});
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<ResourcesDataTable rows={resourcesDataTableDemoRows} caption="Uploaded content" />
	{/snippet}
</Story>

<Story name="VideosOnly">
	{#snippet template()}
		<ResourcesDataTable
			rows={resourcesDataTableDemoRows.filter((row) => row.type === 'videos')}
			caption="Video resources"
		/>
	{/snippet}
</Story>
