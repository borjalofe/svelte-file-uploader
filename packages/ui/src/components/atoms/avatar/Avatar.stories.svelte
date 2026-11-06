<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../../particles/stack/index.js';
	import { Avatar, AvatarFallback, AvatarImage } from './index.js';

	/**
	 * shadcn-svelte new-york Avatar (bits-ui) on Pack semantic tokens (`bg-muted` fallback).
	 * Fallback joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Avatar',
		tags: ['autodocs']
	});
</script>

<Story name="Fallback" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<Avatar aria-label="Ada Lovelace">
			<AvatarFallback>AL</AvatarFallback>
		</Avatar>
	{/snippet}
</Story>

<Story name="WithImage">
	{#snippet template()}
		<Avatar aria-label="Grace Hopper">
			<AvatarImage src="https://api.dicebear.com/9.x/initials/svg?seed=GH" alt="Grace Hopper" />
			<AvatarFallback>GH</AvatarFallback>
		</Avatar>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<Stack direction="row" gap="3" align="center">
			<Avatar class="size-6" aria-label="Small">
				<AvatarFallback class="text-xs">SM</AvatarFallback>
			</Avatar>
			<Avatar aria-label="Default">
				<AvatarFallback>MD</AvatarFallback>
			</Avatar>
			<Avatar class="size-12" aria-label="Large">
				<AvatarFallback class="text-base">LG</AvatarFallback>
			</Avatar>
		</Stack>
	{/snippet}
</Story>
