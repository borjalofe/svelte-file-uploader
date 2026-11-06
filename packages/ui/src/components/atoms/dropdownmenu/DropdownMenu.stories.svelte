<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Button } from '../button/index.js';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuShortcut,
		DropdownMenuTrigger
	} from './index.js';

	/**
	 * shadcn-svelte new-york DropdownMenu (bits-ui) on Pack semantic tokens.
	 * Default (closed trigger) joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/DropdownMenu',
		tags: ['autodocs']
	});
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<DropdownMenu>
			<DropdownMenuTrigger>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>Open menu</Button>
				{/snippet}
			</DropdownMenuTrigger>
			<DropdownMenuContent class="w-56">
				<DropdownMenuLabel>Resource</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Edit
					<DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>Duplicate</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	{/snippet}
</Story>

<Story name="DisabledItem">
	{#snippet template()}
		<DropdownMenu>
			<DropdownMenuTrigger>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>More</Button>
				{/snippet}
			</DropdownMenuTrigger>
			<DropdownMenuContent class="w-56">
				<DropdownMenuItem>Share</DropdownMenuItem>
				<DropdownMenuItem disabled>Archive</DropdownMenuItem>
				<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	{/snippet}
</Story>
