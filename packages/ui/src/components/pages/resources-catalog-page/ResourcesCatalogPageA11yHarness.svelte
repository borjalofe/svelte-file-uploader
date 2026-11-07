<script lang="ts">
	import type { ResourcesDataTableRow } from '../../organisms/resources-data-table/types.js';
	import type { ResourceTabValue } from '../../organisms/resources-toolbar/types.js';
	import ResourcesCatalogPage from './ResourcesCatalogPage.svelte';
	import { RESOURCES_CATALOG_EMPTY } from './resources-catalog-page.fixtures.js';

	let {
		rows = [...RESOURCES_CATALOG_EMPTY] as ResourcesDataTableRow[],
		tab = $bindable<ResourceTabValue>('all'),
		query = $bindable('')
	}: {
		rows?: ResourcesDataTableRow[];
		tab?: ResourceTabValue;
		query?: string;
	} = $props();
</script>

<ResourcesCatalogPage {rows} bind:tab bind:query />
