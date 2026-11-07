<script lang="ts">
	import { browser } from '$app/env';
	import {
		AppHeader,
		countResourceTypes,
		DashboardShell,
		filterResourceCatalogRows,
		ResourcesDataTable,
		ResourcesToolbar,
		toast,
		Toaster,
		type ResourceTabValue,
		type ResourcesDataTableRow
	} from '@pack-challenge/ui';
	import { listResources } from '#lib/api/resources.js';

	let tab = $state<ResourceTabValue>('all');
	let query = $state('');
	let rows = $state<ResourcesDataTableRow[]>([]);
	let loading = $state(false);
	let error = $state<string | null>(null);

	/** Pack filter rule: counts from the full live dataset (current search result set). */
	const counts = $derived(countResourceTypes(rows));
	/** Tab filter only — search is owned by Nest `q` (title + description). */
	const visibleRows = $derived(filterResourceCatalogRows(rows, tab, ''));

	$effect(() => {
		if (!browser) return;
		const q = query;
		const handle = setTimeout(() => {
			void refresh(q);
		}, 200);
		return () => clearTimeout(handle);
	});

	async function refresh(q: string) {
		loading = true;
		try {
			rows = await listResources({ q: q.trim() || undefined, limit: 100 });
			error = null;
		} catch (err) {
			rows = [];
			error = err instanceof Error ? err.message : 'Failed to load resources';
		} finally {
			loading = false;
		}
	}

	function handleUpload() {
		// POST /resources lands in #76 — keep DS control, toast-only for now.
		toast.success('Upload wiring lands next — toast only for now.');
	}
</script>

<svelte:head>
	<title>Resources — Pack</title>
</svelte:head>

<DashboardShell>
	{#snippet header()}
		<AppHeader
			navItems={[
				{ href: '/', label: 'Resources', active: true },
				{ href: '#library', label: 'Library' },
				{ href: '#settings', label: 'Settings' }
			]}
		/>
	{/snippet}

	{#snippet main()}
		<div class="flex w-full min-w-0 flex-col gap-4" data-slot="resources-page-main">
			<ResourcesToolbar bind:value={tab} bind:query {counts} onUpload={handleUpload} />

			{#if error}
				<p class="text-sm text-destructive" role="alert">{error}</p>
			{:else if loading && rows.length === 0}
				<p class="text-sm text-muted-foreground">Loading resources…</p>
			{/if}

			<ResourcesDataTable rows={visibleRows} caption="Uploaded content" />
		</div>
	{/snippet}
</DashboardShell>

<Toaster richColors position="bottom-right" />
