<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Welcome',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	let { title = '@pack-challenge/ui' }: { title?: string } = $props();
</script>

<Story name="Design system">
	{#snippet template()}
		<main style="font-family: system-ui, sans-serif; padding: 2rem; max-width: 40rem;">
			<h1>{title}</h1>
			<p>Storybook is wired for the design-system package. Product components land later.</p>
		</main>
	{/snippet}
</Story>
