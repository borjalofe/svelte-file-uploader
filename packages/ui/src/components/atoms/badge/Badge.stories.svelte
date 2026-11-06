<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../../particles/stack/index.js';
	import Badge from './Badge.svelte';

	/**
	 * shadcn-svelte new-york Badge on Pack semantic tokens.
	 * Pack Provider/Type pills = `secondary` (neutral, rounded-full).
	 * Secondary joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Badge',
		tags: ['autodocs']
	});
</script>

<Story name="Secondary" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<Badge variant="secondary">Video</Badge>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<Stack direction="row" gap="2" align="center" class="flex-wrap">
			<Badge variant="default">Default</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="outline">Outline</Badge>
			<Badge variant="ghost">Ghost</Badge>
			<Badge variant="destructive">Destructive</Badge>
			<Badge variant="link">Link</Badge>
		</Stack>
	{/snippet}
</Story>

<Story name="AsLink">
	{#snippet template()}
		<Stack direction="row" gap="2" align="center">
			<Badge variant="secondary" href="#type">Type</Badge>
			<Badge variant="outline" href="#provider">Provider</Badge>
		</Stack>
	{/snippet}
</Story>
