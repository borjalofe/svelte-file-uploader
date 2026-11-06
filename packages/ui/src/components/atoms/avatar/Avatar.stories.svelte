<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../../particles/stack/index.js';
	import { Avatar, AvatarFallback, AvatarImage } from './index.js';

	/**
	 * shadcn-svelte new-york Avatar (bits-ui) on Pack semantic tokens (`bg-muted` fallback).
	 * Fallback joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 * Fallback-only roots use `role="img"` so `aria-label` is a permitted ARIA attribute.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Avatar',
		tags: ['autodocs']
	});
</script>

<Story name="Fallback" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<Avatar role="img" aria-label="Ada Lovelace">
			<AvatarFallback aria-hidden="true">AL</AvatarFallback>
		</Avatar>
	{/snippet}
</Story>

<Story name="WithImage">
	{#snippet template()}
		<Avatar>
			<AvatarImage src="https://api.dicebear.com/9.x/initials/svg?seed=GH" alt="Grace Hopper" />
			<AvatarFallback aria-hidden="true">GH</AvatarFallback>
		</Avatar>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<Stack direction="row" gap="3" align="center">
			<Avatar class="size-6" role="img" aria-label="Small">
				<AvatarFallback class="text-xs" aria-hidden="true">SM</AvatarFallback>
			</Avatar>
			<Avatar role="img" aria-label="Default">
				<AvatarFallback aria-hidden="true">MD</AvatarFallback>
			</Avatar>
			<Avatar class="size-12" role="img" aria-label="Large">
				<AvatarFallback class="text-base" aria-hidden="true">LG</AvatarFallback>
			</Avatar>
		</Stack>
	{/snippet}
</Story>
