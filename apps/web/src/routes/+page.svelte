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
		UploadResourceDialog,
		type ResourceTabValue,
		type ResourcesDataTableRow,
		type UploadResourcePayload
	} from '@pack-challenge/ui';
	import { createResource, formatApiError, listResources } from '#lib/api/resources.js';
	import { mapResourceToTableRow } from '#lib/resources/map-resource-row.js';

	let tab = $state<ResourceTabValue>('all');
	let query = $state('');
	let rows = $state<ResourcesDataTableRow[]>([]);
	let loading = $state(false);
	let uploading = $state(false);
	let error = $state<string | null>(null);
	let dialogOpen = $state(false);

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
			error = formatApiError(err);
		} finally {
			loading = false;
		}
	}

	function openUploadDialog() {
		dialogOpen = true;
	}

	async function handleUpload(payload: UploadResourcePayload) {
		const file = payload.files?.[0];
		if (!payload.title.trim() || !payload.description.trim()) {
			toast.error('Title and description are required');
			return;
		}
		if (!payload.category || !payload.language || !payload.provider) {
			toast.error('Category, language, and provider are required');
			return;
		}
		if (payload.roles.length === 0) {
			toast.error('Select at least one role');
			return;
		}
		if (!file) {
			toast.error('File is required');
			return;
		}

		uploading = true;
		try {
			const created = await createResource({
				title: payload.title,
				description: payload.description,
				category: payload.category,
				language: payload.language,
				provider: payload.provider,
				roles: payload.roles,
				file
			});
			dialogOpen = false;
			toast.success(`Uploaded “${created.title}”`);
			// Prefer refresh so search/filter stay consistent with Nest.
			await refresh(query);
			if (!rows.some((row) => row.id === created.id)) {
				rows = [mapResourceToTableRow(created), ...rows];
			}
		} catch (err) {
			toast.error(formatApiError(err));
		} finally {
			uploading = false;
		}
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
			<ResourcesToolbar
				bind:value={tab}
				bind:query
				{counts}
				onUpload={openUploadDialog}
				disabled={uploading}
			/>

			{#if error}
				<p class="text-sm text-destructive" role="alert">{error}</p>
			{:else if loading && rows.length === 0}
				<p class="text-sm text-muted-foreground">Loading resources…</p>
			{/if}

			<ResourcesDataTable rows={visibleRows} caption="Uploaded content" />
		</div>
	{/snippet}
</DashboardShell>

<UploadResourceDialog
	bind:open={dialogOpen}
	showTrigger={false}
	disabled={uploading}
	onUpload={handleUpload}
/>

<Toaster richColors position="bottom-right" />
