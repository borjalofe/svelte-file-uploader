<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import UploadResourceDialog from './UploadResourceDialog.svelte';

	/**
	 * Pack UploadResourceDialog — Dialog + stacked Upload Resource fields + Upload CTA.
	 * Focus trap via bits-ui Dialog.Content. Open joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Organisms/UploadResourceDialog',
		tags: ['autodocs']
	});
</script>

<Story name="Open" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<UploadResourceDialog open />
	{/snippet}
</Story>

<Story name="Filled">
	{#snippet template()}
		<UploadResourceDialog
			open
			title="Conflict Resolution Basics"
			description="A short introduction to resolving workplace conflict."
			category="conflict-resolution"
			language="en"
			provider="pack"
			roles={['mentor-coach']}
			filename="conflict-basics.pdf"
		/>
	{/snippet}
</Story>

<Story name="Closed">
	{#snippet template()}
		<UploadResourceDialog />
	{/snippet}
</Story>
