<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../stack/index.js';
	import VisuallyHidden from './VisuallyHidden.svelte';

	/**
	 * Screen-reader-only content. Unhides on `:focus-within` by default so focusable controls stay visible while focused.
	 */
	const { Story } = defineMeta({
		title: 'Particles/VisuallyHidden',
		component: VisuallyHidden,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	const box = 'rounded-[var(--radius)] bg-muted px-[var(--space-4)] py-[var(--space-2)] text-sm';
	const link =
		'text-primary underline focus-visible:ring-ring rounded-[var(--radius)] focus-visible:ring-2 focus-visible:outline-none';
</script>

<Story name="Default" args={{ unhideOnFocus: true }}>
	{#snippet template(args)}
		<Stack direction="column" gap="3">
			<p class={box}>
				Visible label
				<VisuallyHidden {...args}>— extra context for assistive tech</VisuallyHidden>
			</p>
			<p class="text-sm text-muted-foreground">
				The hidden phrase is clipped visually; inspect the DOM or use a screen reader.
			</p>
		</Stack>
	{/snippet}
</Story>

<Story name="Focusable control" args={{ unhideOnFocus: true }}>
	{#snippet template(args)}
		<Stack direction="column" gap="3">
			<p class="text-sm text-muted-foreground">
				Tab to the link — it unhides while focused (do not hide focusable controls).
			</p>
			<div class={box}>
				Visible surrounding text
				<VisuallyHidden {...args}>
					<a class={link} href="#main">Skip to main content</a>
				</VisuallyHidden>
			</div>
		</Stack>
	{/snippet}
</Story>
