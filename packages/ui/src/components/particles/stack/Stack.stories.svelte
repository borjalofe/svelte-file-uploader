<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Stack from './Stack.svelte';

	/**
	 * Flex layout helper with semantic gap (`semantic.space.*` → `--space-*` / Tailwind `gap-*`).
	 */
	const { Story } = defineMeta({
		title: 'Particles/Stack',
		component: Stack,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	const box = 'rounded-[var(--radius)] bg-muted px-[var(--space-4)] py-[var(--space-2)] text-sm';
</script>

<Story name="Column" args={{ direction: 'column', gap: '4' }}>
	{#snippet template(args)}
		<Stack {...args}>
			<div class={box}>One</div>
			<div class={box}>Two</div>
			<div class={box}>Three</div>
		</Stack>
	{/snippet}
</Story>

<Story name="Row" args={{ direction: 'row', gap: '3', align: 'center' }}>
	{#snippet template(args)}
		<Stack {...args}>
			<div class={box}>One</div>
			<div class={box}>Two</div>
			<div class={box}>Three</div>
		</Stack>
	{/snippet}
</Story>

<Story name="Between" args={{ direction: 'row', gap: '2', justify: 'between', class: 'w-full' }}>
	{#snippet template(args)}
		<Stack {...args}>
			<div class={box}>Start</div>
			<div class={box}>End</div>
		</Stack>
	{/snippet}
</Story>
