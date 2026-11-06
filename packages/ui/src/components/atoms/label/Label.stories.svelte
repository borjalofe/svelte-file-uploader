<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../../particles/stack/index.js';
	import Label from './Label.svelte';

	/**
	 * shadcn-svelte new-york Label (bits-ui) on Pack semantic tokens (`text-foreground`).
	 * Default joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Label',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	const fieldClass =
		'flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-sm">
			<Label for="story-label-default">Search</Label>
			<input id="story-label-default" class={fieldClass} type="text" placeholder="Field" />
		</Stack>
	{/snippet}
</Story>

<Story name="PeerDisabled">
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-sm">
			<input id="story-label-peer" class="peer {fieldClass}" type="text" disabled value="Locked" />
			<Label for="story-label-peer">Provider (peer-disabled)</Label>
		</Stack>
	{/snippet}
</Story>

<Story name="GroupDisabled">
	{#snippet template()}
		<div class="group max-w-sm" data-disabled="true">
			<Stack direction="column" gap="2">
				<Label for="story-label-group">Title</Label>
				<input id="story-label-group" class={fieldClass} type="text" disabled value="Unavailable" />
			</Stack>
		</div>
	{/snippet}
</Story>
