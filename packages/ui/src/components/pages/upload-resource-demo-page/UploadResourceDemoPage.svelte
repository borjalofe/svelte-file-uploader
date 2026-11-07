<script lang="ts">
	import { toast, Toaster } from '../../atoms/toast-sonner/index.js';
	import { UploadResourceDialog } from '../../organisms/upload-resource-dialog/index.js';
	import type { UploadResourcePayload } from '../../organisms/upload-resource-dialog/types.js';
	import { DashboardShell } from '../../templates/dashboard-shell/index.js';
	import {
		resolveMockUploadSuccess,
		resolveUploadResourceDemoPageRoot,
		uploadResourceDemoPageIntroBaseClass
	} from './upload-resource-demo-page.js';
	import type { UploadResourceDemoPageProps } from './types.js';

	let {
		ref = $bindable(null),
		class: className,
		dialogOpen = $bindable(false)
	}: UploadResourceDemoPageProps = $props();

	const root = $derived(resolveUploadResourceDemoPageRoot({ class: className }));

	function handleUpload(payload: UploadResourcePayload) {
		const result = resolveMockUploadSuccess(payload);
		if (result.shouldCloseDialog) {
			dialogOpen = false;
		}
		toast.success(result.toastMessage);
	}
</script>

<div data-slot="upload-resource-demo-page" class={root.className}>
	<DashboardShell bind:ref>
		{#snippet header()}
			<h1 class="text-2xl font-semibold text-foreground">Upload Resource Demo</h1>
		{/snippet}
		{#snippet main()}
			<p class={uploadResourceDemoPageIntroBaseClass}>
				Open the upload dialog, pick a file with FilePickerField, then Upload to see a mock success
				toast — no network request.
			</p>
			<UploadResourceDialog bind:open={dialogOpen} onUpload={handleUpload} />
		{/snippet}
	</DashboardShell>
	<Toaster richColors position="top-center" />
</div>
