<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ResourcesDataTable from './ResourcesDataTable.svelte';

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

	const demoRows = [
		{
			id: '1',
			title: 'Intro to Pack',
			path: '/resources/intro',
			viewCount: 42,
			uploadedBy: 'Ada Lovelace',
			provider: 'AWS',
			type: 'videos'
		},
		{
			id: '2',
			title: 'Design tokens',
			path: '/resources/tokens',
			viewCount: 12,
			uploadedBy: 'Grace Hopper',
			provider: 'GCP',
			type: 'documents'
		},
		{
			id: '3',
			title: 'Mentorship 101',
			path: '/resources/mentor',
			viewCount: 7,
			uploadedBy: 'Ada Lovelace',
			provider: 'AWS',
			type: 'lessons'
		}
	];
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<ResourcesDataTable rows={demoRows} caption="Uploaded content" />
	{/snippet}
</Story>

<Story name="VideosOnly">
	{#snippet template()}
		<ResourcesDataTable
			rows={demoRows.filter((row) => row.type === 'videos')}
			caption="Video resources"
		/>
	{/snippet}
</Story>
