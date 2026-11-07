<script lang="ts">
	import ResourcesToolbar from './ResourcesToolbar.svelte';
	import type { ResourceTabValue, ResourceTypeCounts, ResourcesToolbarProps } from './types.js';

	let {
		value = $bindable<ResourceTabValue>('all'),
		query = $bindable(''),
		counts = {} as ResourceTypeCounts,
		disabled = false,
		tabsLabel = 'Resource type',
		searchLabel = 'Search',
		uploadLabel = 'Upload',
		onUpload
	}: ResourcesToolbarProps = $props();
</script>

<ResourcesToolbar
	bind:value
	bind:query
	{counts}
	{disabled}
	{tabsLabel}
	{searchLabel}
	{uploadLabel}
	{onUpload}
/>
