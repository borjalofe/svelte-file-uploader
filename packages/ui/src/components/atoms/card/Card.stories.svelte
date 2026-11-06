<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Button } from '../button/index.js';
	import {
		Card,
		CardAction,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from './index.js';

	/**
	 * shadcn-svelte new-york Card on Pack semantic tokens (`bg-card`).
	 * Default joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Card',
		tags: ['autodocs']
	});
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<Card class="max-w-sm">
			<CardHeader>
				<CardTitle>Upload Resource</CardTitle>
				<CardDescription>Add a new resource to the library.</CardDescription>
			</CardHeader>
			<CardContent>
				<p class="text-sm">Fill in the form fields to continue.</p>
			</CardContent>
			<CardFooter>
				<Button type="button">Continue</Button>
			</CardFooter>
		</Card>
	{/snippet}
</Story>

<Story name="WithAction">
	{#snippet template()}
		<Card class="max-w-sm">
			<CardHeader>
				<CardTitle>Resource details</CardTitle>
				<CardDescription>Metadata for the selected item.</CardDescription>
				<CardAction>
					<Button variant="outline" size="sm" type="button">Edit</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p class="text-sm">Provider and type appear in the table row.</p>
			</CardContent>
		</Card>
	{/snippet}
</Story>
