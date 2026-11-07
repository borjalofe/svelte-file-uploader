<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TokensReferencePage from './TokensReferencePage.svelte';

	/**
	 * Pack TokensReferencePage — DsCatalogLayout filled with shipped token swatches.
	 * Default joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Pages/TokensReferencePage',
		tags: ['autodocs']
	});
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<TokensReferencePage />
	{/snippet}
</Story>
