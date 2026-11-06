<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../../particles/stack/index.js';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from './index.js';

	/**
	 * shadcn-svelte new-york Tabs (bits-ui) on Pack semantic tokens (`bg-muted` list).
	 * Default joins the CI axe gate — see packages/ui/A11Y.md.
	 * Pack Resources filters: All always enabled; empty types stay disabled.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Tabs',
		tags: ['autodocs']
	});
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<Tabs value="all">
			<TabsList aria-label="Resource type">
				<TabsTrigger value="all">All</TabsTrigger>
				<TabsTrigger value="videos">Videos</TabsTrigger>
				<TabsTrigger value="documents">Documents</TabsTrigger>
			</TabsList>
			<TabsContent value="all">All resources</TabsContent>
			<TabsContent value="videos">Video resources</TabsContent>
			<TabsContent value="documents">Document resources</TabsContent>
		</Tabs>
	{/snippet}
</Story>

<Story name="DisabledItems">
	{#snippet template()}
		<Stack direction="column" gap="2">
			<p class="text-sm text-muted-foreground">
				Pack rule: All stays enabled; types with no resources are disabled.
			</p>
			<Tabs value="all">
				<TabsList aria-label="Resource type">
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="videos">Videos</TabsTrigger>
					<TabsTrigger value="documents" disabled>Documents</TabsTrigger>
					<TabsTrigger value="lessons" disabled>Lessons</TabsTrigger>
					<TabsTrigger value="archive" disabled>Archive</TabsTrigger>
				</TabsList>
				<TabsContent value="all">Showing every resource</TabsContent>
				<TabsContent value="videos">Video resources only</TabsContent>
				<TabsContent value="documents">Documents</TabsContent>
				<TabsContent value="lessons">Lessons</TabsContent>
				<TabsContent value="archive">Archive</TabsContent>
			</Tabs>
		</Stack>
	{/snippet}
</Story>
