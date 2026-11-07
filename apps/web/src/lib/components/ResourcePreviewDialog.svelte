<script lang="ts">
	import {
		Button,
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '@pack-challenge/ui';
	import type { PreviewKind } from '#lib/resources/preview.js';

	type Props = {
		open?: boolean;
		title?: string;
		filename?: string;
		kind?: PreviewKind | null;
		objectUrl?: string | null;
		textContent?: string | null;
		loading?: boolean;
		error?: string | null;
		onDownload?: () => void;
		onOpenChange?: (open: boolean) => void;
	};

	let {
		open = $bindable(false),
		title = 'Resource',
		filename = 'resource',
		kind = null,
		objectUrl = null,
		textContent = null,
		loading = false,
		error = null,
		onDownload,
		onOpenChange
	}: Props = $props();

	$effect(() => {
		onOpenChange?.(open);
	});
</script>

<Dialog bind:open>
	<DialogContent
		class="flex max-h-[90vh] w-full flex-col gap-4 sm:max-w-4xl"
		showCloseButton={true}
	>
		<DialogHeader>
			<DialogTitle>{title}</DialogTitle>
			<DialogDescription>{filename}</DialogDescription>
		</DialogHeader>

		<div
			class="min-h-48 flex-1 overflow-auto rounded-md border bg-muted/40 p-2"
			data-slot="resource-preview-body"
		>
			{#if loading}
				<p class="p-4 text-sm text-muted-foreground">Loading preview…</p>
			{:else if error}
				<p class="p-4 text-sm text-destructive" role="alert">{error}</p>
			{:else if kind === 'pdf' && objectUrl}
				<iframe title={filename} src={objectUrl} class="h-[70vh] w-full rounded-md border-0"
				></iframe>
			{:else if kind === 'video' && objectUrl}
				<video class="mx-auto max-h-[70vh] w-full" controls src={objectUrl}>
					<track kind="captions" />
				</video>
			{:else if kind === 'image' && objectUrl}
				<img src={objectUrl} alt={title} class="mx-auto max-h-[70vh] max-w-full object-contain" />
			{:else if kind === 'text'}
				<pre
					class="max-h-[70vh] overflow-auto rounded-md bg-background p-4 text-sm whitespace-pre-wrap">{textContent ??
						''}</pre>
			{:else}
				<p class="p-4 text-sm text-muted-foreground">
					This file type can’t be previewed in the browser. Use Download instead.
				</p>
			{/if}
		</div>

		<DialogFooter class="gap-2 sm:justify-end">
			<Button type="button" variant="outline" onclick={() => (open = false)}>Close</Button>
			{#if onDownload}
				<Button type="button" onclick={onDownload}>Download</Button>
			{/if}
		</DialogFooter>
	</DialogContent>
</Dialog>
