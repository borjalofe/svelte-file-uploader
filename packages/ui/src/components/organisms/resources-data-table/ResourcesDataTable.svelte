<script lang="ts">
	import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down';
	import EllipsisVerticalIcon from '@lucide/svelte/icons/ellipsis-vertical';
	import { Badge } from '../../atoms/badge/index.js';
	import { Button } from '../../atoms/button/index.js';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '../../atoms/dropdownmenu/index.js';
	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '../../atoms/table/index.js';
	import {
		resourceContentTypeLabel,
		resolveResourcesDataTableRoot,
		resourcesDataTableSortButtonBaseClass,
		resourcesDataTableSortIconBaseClass,
		sortResourceRows
	} from './resources-data-table.js';
	import type {
		ResourcesDataTableProps,
		ResourcesDataTableRow,
		ResourcesDataTableSortColumn,
		ResourcesDataTableSortDirection
	} from './types.js';

	let {
		ref = $bindable(null),
		rows = [],
		caption = 'Uploaded content',
		class: className,
		onRowAction,
		...restProps
	}: ResourcesDataTableProps = $props();

	let sortColumn = $state<ResourcesDataTableSortColumn>('title');
	let sortDirection = $state<ResourcesDataTableSortDirection>('asc');

	const root = $derived(resolveResourcesDataTableRoot({ class: className }));
	const sortedRows = $derived(sortResourceRows(rows, sortColumn, sortDirection));

	function toggleSort(column: ResourcesDataTableSortColumn) {
		if (sortColumn === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
			return;
		}
		sortColumn = column;
		sortDirection = 'asc';
	}

	function ariaSort(column: ResourcesDataTableSortColumn): 'ascending' | 'descending' | 'none' {
		if (sortColumn !== column) return 'none';
		return sortDirection === 'asc' ? 'ascending' : 'descending';
	}

	function emitAction(action: 'edit' | 'duplicate' | 'delete', row: ResourcesDataTableRow) {
		onRowAction?.({ action, row });
	}
</script>

<div bind:this={ref} data-slot="resources-data-table" class={root.className} {...restProps}>
	<Table>
		<TableCaption>{caption}</TableCaption>
		<TableHeader>
			<TableRow>
				<TableHead aria-sort={ariaSort('title')}>
					<button
						type="button"
						class={resourcesDataTableSortButtonBaseClass}
						onclick={() => toggleSort('title')}
					>
						Content Title
						<ArrowUpDownIcon class={resourcesDataTableSortIconBaseClass} aria-hidden="true" />
					</button>
				</TableHead>
				<TableHead aria-sort={ariaSort('path')}>
					<button
						type="button"
						class={resourcesDataTableSortButtonBaseClass}
						onclick={() => toggleSort('path')}
					>
						Path
						<ArrowUpDownIcon class={resourcesDataTableSortIconBaseClass} aria-hidden="true" />
					</button>
				</TableHead>
				<TableHead aria-sort={ariaSort('viewCount')}>
					<button
						type="button"
						class={resourcesDataTableSortButtonBaseClass}
						onclick={() => toggleSort('viewCount')}
					>
						View Count
						<ArrowUpDownIcon class={resourcesDataTableSortIconBaseClass} aria-hidden="true" />
					</button>
				</TableHead>
				<TableHead aria-sort={ariaSort('uploadedBy')}>
					<button
						type="button"
						class={resourcesDataTableSortButtonBaseClass}
						onclick={() => toggleSort('uploadedBy')}
					>
						Uploaded By
						<ArrowUpDownIcon class={resourcesDataTableSortIconBaseClass} aria-hidden="true" />
					</button>
				</TableHead>
				<TableHead aria-sort={ariaSort('provider')}>
					<button
						type="button"
						class={resourcesDataTableSortButtonBaseClass}
						onclick={() => toggleSort('provider')}
					>
						Provider
						<ArrowUpDownIcon class={resourcesDataTableSortIconBaseClass} aria-hidden="true" />
					</button>
				</TableHead>
				<TableHead aria-sort={ariaSort('type')}>
					<button
						type="button"
						class={resourcesDataTableSortButtonBaseClass}
						onclick={() => toggleSort('type')}
					>
						Type
						<ArrowUpDownIcon class={resourcesDataTableSortIconBaseClass} aria-hidden="true" />
					</button>
				</TableHead>
				<TableHead class="w-12">
					<span class="sr-only">Actions</span>
				</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each sortedRows as row (row.id)}
				<TableRow data-resource-type={row.type}>
					<TableCell class="font-medium">{row.title}</TableCell>
					<TableCell class="text-muted-foreground">{row.path}</TableCell>
					<TableCell>{row.viewCount}</TableCell>
					<TableCell>{row.uploadedBy}</TableCell>
					<TableCell>
						<Badge variant="secondary">{row.provider}</Badge>
					</TableCell>
					<TableCell>
						<Badge variant="secondary">{resourceContentTypeLabel[row.type]}</Badge>
					</TableCell>
					<TableCell>
						<DropdownMenu>
							<DropdownMenuTrigger>
								{#snippet child({ props })}
									<Button
										variant="ghost"
										size="icon-sm"
										{...props}
										aria-label={`Actions for ${row.title}`}
									>
										<EllipsisVerticalIcon aria-hidden="true" />
									</Button>
								{/snippet}
							</DropdownMenuTrigger>
							<DropdownMenuContent class="w-44" align="end">
								<DropdownMenuLabel>Resource</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onclick={() => emitAction('edit', row)}>Edit</DropdownMenuItem>
								<DropdownMenuItem onclick={() => emitAction('duplicate', row)}
									>Duplicate</DropdownMenuItem
								>
								<DropdownMenuSeparator />
								<DropdownMenuItem variant="destructive" onclick={() => emitAction('delete', row)}
									>Delete</DropdownMenuItem
								>
							</DropdownMenuContent>
						</DropdownMenu>
					</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</div>
