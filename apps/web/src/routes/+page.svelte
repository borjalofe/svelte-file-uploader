<script lang="ts">
	import { browser } from '$app/env';
	import {
		AppHeader,
		countResourceTypes,
		DashboardShell,
		filterResourceCatalogRows,
		ResourcesDataTable,
		ResourcesToolbar,
		SupportChatFab,
		toast,
		Toaster,
		UPLOAD_SUCCESS_TOAST_MESSAGE,
		UploadResourceDialog,
		type ResourceTabValue,
		type UploadResourcePayload
	} from '@pack-challenge/ui';
	import ResourcePreviewDialog from '#lib/components/ResourcePreviewDialog.svelte';
	import { fetchResourceFile, openResourceFile } from '#lib/api/resource-file.js';
	import { createResource, formatApiError, listResources } from '#lib/api/resources.js';
	import { mapResourceToTableRow, type LiveResourceRow } from '#lib/resources/map-resource-row.js';
	import { canPreviewInApp, previewKindForMime, type PreviewKind } from '#lib/resources/preview.js';

	let tab = $state<ResourceTabValue>('all');
	let query = $state('');
	let rows = $state<LiveResourceRow[]>([]);
	let loading = $state(false);
	let uploading = $state(false);
	let error = $state<string | null>(null);
	let dialogOpen = $state(false);

	let previewOpen = $state(false);
	let previewLoading = $state(false);
	let previewError = $state<string | null>(null);
	let previewTitle = $state('');
	let previewFilename = $state('');
	let previewKind = $state<PreviewKind | null>(null);
	let previewObjectUrl = $state<string | null>(null);
	let previewText = $state<string | null>(null);
	let previewRowId = $state<string | null>(null);

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

	$effect(() => {
		if (previewOpen) return;
		revokePreviewUrl();
		previewError = null;
		previewText = null;
		previewKind = null;
		previewRowId = null;
	});

	function revokePreviewUrl() {
		if (previewObjectUrl) {
			URL.revokeObjectURL(previewObjectUrl);
			previewObjectUrl = null;
		}
	}

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

	async function handleRowClick(row: LiveResourceRow) {
		const mime = row.mimeType;
		if (!canPreviewInApp(mime)) {
			try {
				await openResourceFile(row.id, row.path);
				toast.success('Download started — in-browser preview isn’t available for this type.');
			} catch (err) {
				toast.error(err instanceof Error ? err.message : 'Failed to open resource file');
			}
			return;
		}

		revokePreviewUrl();
		previewTitle = row.title;
		previewFilename = row.path;
		previewKind = previewKindForMime(mime);
		previewRowId = row.id;
		previewError = null;
		previewText = null;
		previewLoading = true;
		previewOpen = true;

		try {
			const file = await fetchResourceFile(row.id);
			previewObjectUrl = file.objectUrl;
			if (previewKind === 'text') {
				previewText = await file.blob.text();
			}
			toast.success('Resource opened successfully!');
		} catch (err) {
			previewError = err instanceof Error ? err.message : 'Failed to load preview';
			toast.error(previewError);
		} finally {
			previewLoading = false;
		}
	}

	async function handlePreviewDownload() {
		if (!previewRowId) return;
		try {
			await openResourceFile(previewRowId, previewFilename);
			toast.success('Download started');
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'Failed to download resource file');
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
			toast.success(UPLOAD_SUCCESS_TOAST_MESSAGE);
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
		<AppHeader />
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

			<ResourcesDataTable
				rows={visibleRows}
				caption="Uploaded content"
				onRowClick={(row) => handleRowClick(row as LiveResourceRow)}
			/>
		</div>
	{/snippet}
</DashboardShell>

<UploadResourceDialog
	bind:open={dialogOpen}
	showTrigger={false}
	disabled={uploading}
	onUpload={handleUpload}
/>

<ResourcePreviewDialog
	bind:open={previewOpen}
	title={previewTitle}
	filename={previewFilename}
	kind={previewKind}
	objectUrl={previewObjectUrl}
	textContent={previewText}
	loading={previewLoading}
	error={previewError}
	onDownload={handlePreviewDownload}
/>

<SupportChatFab class="fixed end-6 bottom-6 z-40" />

<Toaster richColors position="top-center" />
