<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../stack/index.js';
	import Spacer from './Spacer.svelte';

	/**
	 * Fixed or flex-grow spacing aid using semantic `semantic.space.*` (`w-*` / `h-*`).
	 */
	const { Story } = defineMeta({
		title: 'Particles/Spacer',
		component: Spacer,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	const box = 'rounded-[var(--radius)] bg-muted px-[var(--space-4)] py-[var(--space-2)] text-sm';
</script>

<Story name="Vertical" args={{ axis: 'vertical', size: '4' }}>
	{#snippet template(args)}
		<Stack direction="column" gap="0">
			<div class={box}>Above</div>
			<Spacer {...args} />
			<div class={box}>Below</div>
		</Stack>
	{/snippet}
</Story>

<Story name="Horizontal" args={{ axis: 'horizontal', size: '6' }}>
	{#snippet template(args)}
		<Stack direction="row" gap="0" align="center">
			<div class={box}>Left</div>
			<Spacer {...args} />
			<div class={box}>Right</div>
		</Stack>
	{/snippet}
</Story>

<Story name="Grow" args={{ axis: 'horizontal', grow: true }}>
	{#snippet template(args)}
		<Stack direction="row" gap="0" align="center" class="w-full">
			<div class={box}>Start</div>
			<Spacer {...args} />
			<div class={box}>End</div>
		</Stack>
	{/snippet}
</Story>
