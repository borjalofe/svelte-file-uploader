<script lang="ts">
	import { Button } from '../../atoms/button/index.js';
	import { Tabs, TabsList, TabsTrigger } from '../../atoms/tabs/index.js';
	import { SearchField } from '../../molecules/search-field/index.js';
	import {
		RESOURCE_TAB_LABELS,
		RESOURCE_TAB_VALUES,
		isResourceTabEnabled,
		resolveResourcesToolbarRoot,
		resolveResourcesToolbarSearch,
		resourcesToolbarTabsListBaseClass,
		resourcesToolbarTabsTriggerBaseClass
	} from './resources-toolbar.js';
	import type { ResourceTabValue, ResourceTypeCounts, ResourcesToolbarProps } from './types.js';

	let {
		ref = $bindable(null),
		value = $bindable<ResourceTabValue>('all'),
		query = $bindable(''),
		counts = {} as ResourceTypeCounts,
		tabsLabel = 'Resource type',
		searchLabel = 'Search',
		searchPlaceholder = 'Field',
		uploadLabel = 'Upload',
		onUpload,
		disabled = false,
		class: className,
		searchClass,
		...restProps
	}: ResourcesToolbarProps = $props();

	const root = $derived(resolveResourcesToolbarRoot({ class: className }));
	const search = $derived(resolveResourcesToolbarSearch({ class: searchClass }));
</script>

<div
	bind:this={ref}
	data-slot="resources-toolbar"
	class={root.className}
	data-disabled={disabled ? 'true' : undefined}
	{...restProps}
>
	<Tabs bind:value>
		<TabsList aria-label={tabsLabel} class={resourcesToolbarTabsListBaseClass}>
			{#each RESOURCE_TAB_VALUES as tab (tab)}
				<TabsTrigger
					value={tab}
					disabled={!isResourceTabEnabled(tab, counts)}
					class={resourcesToolbarTabsTriggerBaseClass}
				>
					{RESOURCE_TAB_LABELS[tab]}
				</TabsTrigger>
			{/each}
		</TabsList>
	</Tabs>

	<SearchField
		bind:value={query}
		aria-label={searchLabel}
		placeholder={searchPlaceholder}
		{disabled}
		class={search.className}
		data-slot="resources-toolbar-search"
	/>

	<Button
		variant="default"
		type="button"
		{disabled}
		onclick={onUpload}
		data-slot="resources-toolbar-upload"
	>
		{uploadLabel}
	</Button>
</div>
