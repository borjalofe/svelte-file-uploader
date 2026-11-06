<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../stack/index.js';
	import Divider from './Divider.svelte';

	/**
	 * Orientation + semantic border separator (`border-border` / `border-foreground`).
	 */
	const { Story } = defineMeta({
		title: 'Particles/Divider',
		component: Divider,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	const box = 'rounded-[var(--radius)] bg-muted px-[var(--space-4)] py-[var(--space-2)] text-sm';
</script>

<Story name="Horizontal" args={{ orientation: 'horizontal', color: 'base' }}>
	{#snippet template(args)}
		<Stack direction="column" gap="4">
			<div class={box}>Above</div>
			<Divider {...args} />
			<div class={box}>Below</div>
		</Stack>
	{/snippet}
</Story>

<Story name="Vertical" args={{ orientation: 'vertical', color: 'base' }}>
	{#snippet template(args)}
		<Stack direction="row" gap="4" align="stretch" class="min-h-16">
			<div class={box}>Left</div>
			<Divider {...args} />
			<div class={box}>Right</div>
		</Stack>
	{/snippet}
</Story>

<Story name="Strong" args={{ orientation: 'horizontal', color: 'strong' }}>
	{#snippet template(args)}
		<Stack direction="column" gap="4">
			<div class={box}>Section A</div>
			<Divider {...args} />
			<div class={box}>Section B</div>
		</Stack>
	{/snippet}
</Story>
