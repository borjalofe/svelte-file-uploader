<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../../particles/stack/index.js';
	import Textarea from './Textarea.svelte';

	/**
	 * shadcn-svelte new-york Textarea on Pack semantic tokens (`border-input`, `ring-ring`).
	 * Storybook CI axe (`a11y-gate`) uses a labeled smoke story; unit axe lives in `textarea.a11y.spec.ts`.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Textarea',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	const labelClass = 'text-foreground text-sm font-medium';
</script>

<Story name="A11y" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<label class={labelClass} for="story-textarea-a11y">Description</label>
		<Textarea
			id="story-textarea-a11y"
			placeholder="Enter a description…"
			aria-label="Description"
		/>
	{/snippet}
</Story>

<Story name="Default">
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-md">
			<label class={labelClass} for="story-textarea-default">Description</label>
			<Textarea
				id="story-textarea-default"
				placeholder="Enter a description…"
				aria-label="Description"
			/>
		</Stack>
	{/snippet}
</Story>

<Story name="Invalid">
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-md">
			<label class={labelClass} for="story-textarea-invalid">Description</label>
			<Textarea
				id="story-textarea-invalid"
				placeholder="Required"
				aria-invalid="true"
				aria-label="Description"
			/>
		</Stack>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-md">
			<label class={labelClass} for="story-textarea-disabled">Notes</label>
			<Textarea
				id="story-textarea-disabled"
				disabled
				value="Read-only notes from Pack upload form."
				aria-label="Notes"
			/>
		</Stack>
	{/snippet}
</Story>
