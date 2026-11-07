<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AppHeader from './AppHeader.svelte';

	/**
	 * Pack AppHeader organism — logo slot + nav + locale slot + Avatar.
	 * Active nav underline uses `border-primary` (no raw brand hex).
	 * Default joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Organisms/AppHeader',
		tags: ['autodocs']
	});
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<AppHeader
			brandLabel="pack"
			avatarLabel="Ada Lovelace"
			avatarInitials="AL"
			navItems={[
				{ href: '#resources', label: 'Resources', active: true },
				{ href: '#library', label: 'Library' },
				{ href: '#settings', label: 'Settings' }
			]}
		/>
	{/snippet}
</Story>

<Story name="WithSlots">
	{#snippet template()}
		<AppHeader
			avatarLabel="Grace Hopper"
			avatarInitials="GH"
			navItems={[
				{ href: '#resources', label: 'Resources' },
				{ href: '#library', label: 'Library', active: true },
				{ href: '#settings', label: 'Settings' }
			]}
		>
			{#snippet logo()}
				<a href="#home" class="text-lg font-semibold tracking-tight text-foreground">
					pack<span class="text-primary">.</span>
				</a>
			{/snippet}
			{#snippet locale()}
				<button
					type="button"
					class="inline-flex size-9 items-center justify-center rounded-md text-xs font-medium text-muted-foreground uppercase hover:text-foreground"
					aria-label="Language ES (placeholder)"
				>
					ES
				</button>
			{/snippet}
		</AppHeader>
	{/snippet}
</Story>
