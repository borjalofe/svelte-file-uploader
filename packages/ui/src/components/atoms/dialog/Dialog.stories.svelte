<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Button } from '../button/index.js';
	import {
		Dialog,
		DialogClose,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from './index.js';

	/**
	 * shadcn-svelte new-york Dialog (bits-ui) on Pack semantic tokens.
	 * Default (closed trigger) joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Dialog',
		tags: ['autodocs']
	});
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<Dialog>
			<DialogTrigger>
				{#snippet child({ props })}
					<Button variant="default" {...props}>Upload</Button>
				{/snippet}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload Resource</DialogTitle>
					<DialogDescription>Add a new resource to the library.</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose>
						{#snippet child({ props })}
							<Button variant="outline" {...props}>Cancel</Button>
						{/snippet}
					</DialogClose>
					<Button variant="default">Upload</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	{/snippet}
</Story>

<Story name="Open">
	{#snippet template()}
		<Dialog open={true}>
			<DialogTrigger>
				{#snippet child({ props })}
					<Button variant="default" {...props}>Upload</Button>
				{/snippet}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload Resource</DialogTitle>
					<DialogDescription>
						Fill in the details below. Provider and Type appear as pills in the table.
					</DialogDescription>
				</DialogHeader>
				<p class="text-sm text-foreground">Form fields compose here in later molecules.</p>
				<DialogFooter showCloseButton>
					<Button variant="default">Upload</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	{/snippet}
</Story>

<Story name="WithoutCloseButton">
	{#snippet template()}
		<Dialog>
			<DialogTrigger>
				{#snippet child({ props })}
					<Button variant="secondary" {...props}>Open</Button>
				{/snippet}
			</DialogTrigger>
			<DialogContent showCloseButton={false}>
				<DialogHeader>
					<DialogTitle>Confirm</DialogTitle>
					<DialogDescription>Use the footer actions to dismiss.</DialogDescription>
				</DialogHeader>
				<DialogFooter showCloseButton />
			</DialogContent>
		</Dialog>
	{/snippet}
</Story>
