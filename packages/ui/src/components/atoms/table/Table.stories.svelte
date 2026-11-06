<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Badge } from '../badge/index.js';
	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableFooter,
		TableHead,
		TableHeader,
		TableRow
	} from './index.js';

	/**
	 * shadcn-svelte new-york Table on Pack semantic tokens (muted hover/selection).
	 * Default joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Table',
		tags: ['autodocs']
	});
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<Table>
			<TableCaption>Resources</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Title</TableHead>
					<TableHead>Provider</TableHead>
					<TableHead>Type</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Intro to Pack</TableCell>
					<TableCell><Badge variant="secondary">AWS</Badge></TableCell>
					<TableCell><Badge variant="secondary">Video</Badge></TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Design tokens</TableCell>
					<TableCell><Badge variant="secondary">GCP</Badge></TableCell>
					<TableCell><Badge variant="secondary">Document</Badge></TableCell>
				</TableRow>
			</TableBody>
		</Table>
	{/snippet}
</Story>

<Story name="SelectedRow">
	{#snippet template()}
		<Table>
			<TableCaption>Uploaded content</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Title</TableHead>
					<TableHead>Provider</TableHead>
					<TableHead>Type</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow data-state="selected">
					<TableCell>Intro to Pack</TableCell>
					<TableCell><Badge variant="secondary">AWS</Badge></TableCell>
					<TableCell><Badge variant="secondary">Video</Badge></TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Design tokens</TableCell>
					<TableCell><Badge variant="secondary">GCP</Badge></TableCell>
					<TableCell><Badge variant="secondary">Document</Badge></TableCell>
				</TableRow>
			</TableBody>
		</Table>
	{/snippet}
</Story>

<Story name="WithFooter">
	{#snippet template()}
		<Table>
			<TableCaption>Resource summary</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Type</TableHead>
					<TableHead class="text-right">Count</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Video</TableCell>
					<TableCell class="text-right">12</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Document</TableCell>
					<TableCell class="text-right">4</TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell>Total</TableCell>
					<TableCell class="text-right">16</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	{/snippet}
</Story>
