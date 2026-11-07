<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SupportChatFab from './SupportChatFab.svelte';

	/**
	 * Pack SupportChatFab organism — circular primary FAB + extension success status dot.
	 * Presentational only (click callback); no chat backend.
	 * Default joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Organisms/SupportChatFab',
		tags: ['autodocs']
	});
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<SupportChatFab class="fixed end-6 bottom-6" aria-label="Open support chat" />
	{/snippet}
</Story>

<Story name="WithoutStatus">
	{#snippet template()}
		<SupportChatFab showStatus={false} aria-label="Open support chat" />
	{/snippet}
</Story>
