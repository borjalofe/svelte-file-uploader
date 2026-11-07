<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import UploadResourceDemoPage from './UploadResourceDemoPage.svelte';

	/**
	 * Pack UploadResourceDemoPage — DashboardShell + UploadResourceDialog + success Toast.
	 * Mock upload only (FilePickerField → Upload → toast.success). No API.
	 * Default (closed dialog) joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Pages/UploadResourceDemoPage',
		tags: ['autodocs']
	});
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<UploadResourceDemoPage />
	{/snippet}
</Story>

<Story name="DialogOpen">
	{#snippet template()}
		<UploadResourceDemoPage dialogOpen />
	{/snippet}
</Story>
