<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DashboardShell from './DashboardShell.svelte';

	/**
	 * Pack DashboardShell — header + main card + optional region slots.
	 * No domain copy. No automated unit/a11y tests (#54) — Storybook only.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Templates/DashboardShell',
		tags: ['autodocs']
	});
</script>

<Story name="Empty">
	{#snippet template()}
		<DashboardShell>
			{#snippet header()}{/snippet}
			{#snippet main()}{/snippet}
		</DashboardShell>
	{/snippet}
</Story>

<Story name="EmptyWithRegion">
	{#snippet template()}
		<DashboardShell>
			{#snippet header()}{/snippet}
			{#snippet main()}{/snippet}
			{#snippet region()}{/snippet}
		</DashboardShell>
	{/snippet}
</Story>

<Story name="SlotPlaceholders">
	{#snippet template()}
		<DashboardShell>
			{#snippet header()}
				<div
					class="min-h-14 w-full rounded-md border border-dashed border-border bg-muted/40"
					aria-hidden="true"
				></div>
			{/snippet}
			{#snippet main()}
				<div
					class="min-h-48 w-full rounded-md border border-dashed border-border bg-muted/30"
					aria-hidden="true"
				></div>
			{/snippet}
			{#snippet region()}
				<div
					class="min-h-16 w-full rounded-md border border-dashed border-border bg-muted/20"
					aria-hidden="true"
				></div>
			{/snippet}
		</DashboardShell>
	{/snippet}
</Story>
