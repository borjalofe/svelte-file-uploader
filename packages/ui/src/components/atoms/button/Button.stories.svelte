<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../../particles/stack/index.js';
	import Button from './Button.svelte';

	/**
	 * shadcn-svelte new-york Button on Pack semantic tokens (`bg-primary` CTA).
	 * Tagged for the CI axe gate — see packages/ui/A11Y.md.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Button',
		component: Button,
		tags: ['a11y-gate', 'autodocs'],
		parameters: {
			a11y: { test: 'error' }
		}
	});
</script>

<Story name="Primary" args={{ variant: 'default', size: 'default' }}>
	{#snippet template(args)}
		<Button {...args}>Upload</Button>
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

<Story name="Disabled" args={{ variant: 'default', disabled: true }}>
	{#snippet template(args)}
		<Button {...args}>Upload</Button>
	{/snippet}
</Story>
