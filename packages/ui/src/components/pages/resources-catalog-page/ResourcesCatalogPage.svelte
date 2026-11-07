<script lang="ts">
	import { toast, Toaster } from '../../atoms/toast-sonner/index.js';
	import { AppHeader } from '../../organisms/app-header/index.js';
	import {
		countResourceTypes,
		ResourcesDataTable
	} from '../../organisms/resources-data-table/index.js';
	import { ResourcesToolbar } from '../../organisms/resources-toolbar/index.js';
	import type { ResourceTabValue } from '../../organisms/resources-toolbar/types.js';
	import { DashboardShell } from '../../templates/dashboard-shell/index.js';
	import { RESOURCES_CATALOG_MIXED } from './resources-catalog-page.fixtures.js';
	import {
		filterResourceCatalogRows,
		resolveResourcesCatalogPageMain
	} from './resources-catalog-page.js';
	import type { ResourcesCatalogPageProps } from './types.js';

	let {
		ref = $bindable(null),
		rows = [...RESOURCES_CATALOG_MIXED],
		tab = $bindable<ResourceTabValue>('all'),
		query = $bindable(''),
		uploadToastMessage = 'Resource Uploaded Successfully!',
		class: className,
		...restProps
	}: ResourcesCatalogPageProps = $props();

	const mainLayout = $derived(resolveResourcesCatalogPageMain({ class: className }));
	/** Enablement always from the full dataset (Pack filter rule). */
	const counts = $derived(countResourceTypes(rows));
	const visibleRows = $derived(filterResourceCatalogRows(rows, tab, query));

	function handleUpload() {
		toast.success(uploadToastMessage);
	}
</script>

<DashboardShell bind:ref data-slot="resources-catalog-page" {...restProps}>
	{#snippet header()}
		<AppHeader
			navItems={[
				{ href: '#resources', label: 'Resources', active: true },
				{ href: '#library', label: 'Library' },
				{ href: '#settings', label: 'Settings' }
			]}
		/>
	{/snippet}

	{#snippet main()}
		<div class={mainLayout.className} data-slot="resources-catalog-page-main">
			<ResourcesToolbar bind:value={tab} bind:query {counts} onUpload={handleUpload} />
			<ResourcesDataTable rows={visibleRows} caption="Uploaded content" />
		</div>
	{/snippet}
</DashboardShell>

<Toaster richColors position="bottom-right" />
