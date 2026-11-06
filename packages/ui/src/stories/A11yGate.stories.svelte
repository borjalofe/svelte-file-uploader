<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	/**
	 * CI smoke for the `a11y` Vitest project (axe via @storybook/addon-a11y).
	 * Atom stories should copy the `a11y-gate` tag + `parameters.a11y.test = 'error'` — see `packages/ui/A11Y.md`.
	 */
	const { Story } = defineMeta({
		title: 'CI/A11yGate',
		tags: ['a11y-gate', 'autodocs'],
		parameters: {
			a11y: {
				test: 'error'
			}
		}
	});
</script>

<script lang="ts">
	let { label = 'Accessible sample' }: { label?: string } = $props();
</script>

<Story name="Smoke">
	{#snippet template()}
		<button
			type="button"
			class="rounded-[var(--radius)] bg-primary px-[var(--space-4)] py-[var(--space-2)] text-primary-foreground"
		>
			{label}
		</button>
	{/snippet}
</Story>
