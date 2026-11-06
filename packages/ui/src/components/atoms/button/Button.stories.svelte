<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../../particles/stack/index.js';
	import Button from './Button.svelte';

	/**
	 * shadcn-svelte new-york Button on Pack semantic tokens (`bg-primary` CTA).
	 * Primary / Disabled join the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not nest a second Button
	 * around the template (axe nested-interactive false positive).
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Button',
		tags: ['autodocs']
	});
</script>

<Story
	name="Primary"
	tags={['a11y-gate']}
	parameters={{ a11y: { test: 'error' } }}
>
	{#snippet template()}
		<Button variant="default" size="default">Upload</Button>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<Stack direction="row" gap="3" align="center" class="flex-wrap">
			<Button variant="default">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="link">Link</Button>
		</Stack>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<Stack direction="row" gap="3" align="center">
			<Button size="sm">Small</Button>
			<Button size="default">Default</Button>
			<Button size="lg">Large</Button>
			<Button size="icon" aria-label="Icon action">★</Button>
		</Stack>
	{/snippet}
</Story>

<Story name="Disabled" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<Button variant="default" disabled>Upload</Button>
	{/snippet}
</Story>
