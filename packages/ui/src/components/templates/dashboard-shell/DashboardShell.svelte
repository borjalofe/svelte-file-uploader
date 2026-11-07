<script lang="ts">
	import { Card, CardContent } from '../../atoms/card/index.js';
	import {
		resolveDashboardShellBody,
		resolveDashboardShellHeader,
		resolveDashboardShellMain,
		resolveDashboardShellRegion,
		resolveDashboardShellRoot
	} from './dashboard-shell.js';
	import type { DashboardShellProps } from './types.js';

	let {
		ref = $bindable(null),
		header,
		main,
		region,
		class: className,
		mainClass,
		cardClass,
		...restProps
	}: DashboardShellProps = $props();

	const root = $derived(resolveDashboardShellRoot({ class: className }));
	const headerBox = $derived(resolveDashboardShellHeader());
	const body = $derived(resolveDashboardShellBody());
	const mainBox = $derived(resolveDashboardShellMain({ class: mainClass }));
	const regionBox = $derived(resolveDashboardShellRegion());
</script>

<div bind:this={ref} data-slot="dashboard-shell" class={root.className} {...restProps}>
	{#if header}
		<div data-slot="dashboard-shell-header" class={headerBox.className}>
			{@render header()}
		</div>
	{/if}

	<div data-slot="dashboard-shell-body" class={body.className}>
		<main data-slot="dashboard-shell-main" class={mainBox.className}>
			<Card class={cardClass} data-slot="dashboard-shell-card">
				<CardContent class="pt-6">
					{#if main}
						{@render main()}
					{/if}
				</CardContent>
			</Card>
		</main>

		{#if region}
			<div data-slot="dashboard-shell-region" class={regionBox.className}>
				{@render region()}
			</div>
		{/if}
	</div>
</div>
