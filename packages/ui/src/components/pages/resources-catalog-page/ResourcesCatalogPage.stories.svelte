<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ResourcesCatalogPage from './ResourcesCatalogPage.svelte';
	import {
		RESOURCES_CATALOG_EMPTY,
		RESOURCES_CATALOG_MIXED,
		RESOURCES_CATALOG_VIDEOS_ONLY
	} from './resources-catalog-page.fixtures.js';

	/**
	 * Pack ResourcesCatalogPage — DashboardShell + AppHeader + toolbar + table + toast.
	 * Fixtures: Empty (only All), VideosOnly, Mixed. Empty joins a11y-gate — see A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Pages/ResourcesCatalogPage',
		tags: ['autodocs']
	});
</script>

<Story name="Empty" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<ResourcesCatalogPage rows={[...RESOURCES_CATALOG_EMPTY]} />
	{/snippet}
</Story>

<Story name="VideosOnly">
	{#snippet template()}
		<ResourcesCatalogPage rows={[...RESOURCES_CATALOG_VIDEOS_ONLY]} />
	{/snippet}
</Story>

<Story name="Mixed">
	{#snippet template()}
		<ResourcesCatalogPage rows={[...RESOURCES_CATALOG_MIXED]} />
	{/snippet}
</Story>
