<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../../particles/stack/index.js';
	import Separator from './Separator.svelte';

	/**
	 * shadcn-svelte new-york Separator (bits-ui) on Pack semantic tokens (`bg-border`).
	 * Horizontal decorative joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Separator',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	const box = 'rounded-md bg-muted px-4 py-2 text-sm text-foreground';
</script>

<Story name="Horizontal" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<Stack direction="column" gap="4" class="max-w-sm">
			<div class={box}>Above</div>
			<Separator orientation="horizontal" decorative />
			<div class={box}>Below</div>
		</Stack>
	{/snippet}
</Story>

<Story name="Vertical">
	{#snippet template()}
		<Stack direction="row" gap="4" align="stretch" class="min-h-16">
			<div class={box}>Left</div>
			<Separator orientation="vertical" decorative />
			<div class={box}>Right</div>
		</Stack>
	{/snippet}
</Story>

<Story name="Semantic">
	{#snippet template()}
		<Stack direction="column" gap="4" class="max-w-sm">
			<div class={box}>Section A</div>
			<Separator orientation="horizontal" decorative={false} />
			<div class={box}>Section B</div>
		</Stack>
	{/snippet}
</Story>
