<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DsCatalogLayout from './DsCatalogLayout.svelte';

	/**
	 * Pack DsCatalogLayout template — /ds docs shell (side nav + content slot).
	 * Stories only for this milestone (no unit/a11y specs claimed).
	 * Nav labels stay design-system neutral (no product domain copy).
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Templates/DsCatalogLayout',
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<DsCatalogLayout
			title="Design system"
			navItems={[
				{ href: '#foundations', label: 'Foundations', active: true },
				{ href: '#tokens', label: 'Tokens' },
				{ href: '#components', label: 'Components' }
			]}
		>
			<h1 class="text-2xl font-semibold text-foreground">Foundations</h1>
			<p class="text-sm text-muted-foreground">
				Catalog content slot — pages compose into this shell later.
			</p>
		</DsCatalogLayout>
	{/snippet}
</Story>

<Story name="TokensActive">
	{#snippet template()}
		<DsCatalogLayout
			title="Design system"
			navItems={[
				{ href: '#foundations', label: 'Foundations' },
				{ href: '#tokens', label: 'Tokens', active: true },
				{ href: '#components', label: 'Components' }
			]}
		>
			<h1 class="text-2xl font-semibold text-foreground">Tokens</h1>
			<p class="text-sm text-muted-foreground">Content slot for the tokens reference page.</p>
		</DsCatalogLayout>
	{/snippet}
</Story>
