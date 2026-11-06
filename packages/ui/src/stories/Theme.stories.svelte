<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Theme',
		tags: ['autodocs']
	});
</script>

<Story name="bg-primary">
	{#snippet template()}
		<div class="bg-background text-foreground min-h-40 space-y-4 p-8 font-sans">
			<p class="text-muted-foreground text-sm">
				Semantic tokens via <code class="text-foreground">@theme inline</code> — no raw hex.
			</p>
			<div
				class="bg-primary text-primary-foreground inline-flex items-center rounded-[var(--radius)] px-4 py-2 text-sm font-medium"
				data-testid="bg-primary-swatch"
			>
				bg-primary
			</div>
		</div>
	{/snippet}
</Story>
