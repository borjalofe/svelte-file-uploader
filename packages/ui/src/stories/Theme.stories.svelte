<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Theme',
		tags: ['autodocs']
	});
</script>

<Story name="bg-primary">
	{#snippet template()}
		<div class="min-h-40 space-y-4 bg-background p-8 font-sans text-foreground">
			<p class="text-sm text-muted-foreground">
				Semantic tokens via <code class="text-foreground">@theme inline</code> — no raw hex.
			</p>
			<div
				class="inline-flex items-center rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
				data-testid="bg-primary-swatch"
			>
				bg-primary
			</div>
		</div>
	{/snippet}
</Story>
