<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../../particles/stack/index.js';
	import Input from './Input.svelte';

	/**
	 * shadcn-svelte new-york Input on Pack semantic tokens (`border-input`, `ring-ring`).
	 * Storybook CI axe (`a11y-gate`) uses labeled harness stories; unit axe lives in `input.a11y.spec.ts`.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Input',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	const labelClass = 'text-foreground text-sm font-medium';
</script>

<!-- Dedicated a11y-gate story: single labeled control (portable stories + axe). -->
<Story name="A11y" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<label class={labelClass} for="story-input-a11y">Search</label>
		<Input id="story-input-a11y" type="text" placeholder="Field" aria-label="Search" />
	{/snippet}
</Story>

<Story name="Default">
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-sm">
			<label class={labelClass} for="story-input-default">Search</label>
			<Input id="story-input-default" type="text" placeholder="Field" aria-label="Search" />
		</Stack>
	{/snippet}
</Story>

<Story name="Types">
	{#snippet template()}
		<Stack direction="column" gap="4" class="max-w-sm">
			<Stack direction="column" gap="2">
				<label class={labelClass} for="story-input-text">Title</label>
				<Input id="story-input-text" type="text" placeholder="Resource title" aria-label="Title" />
			</Stack>
			<Stack direction="column" gap="2">
				<label class={labelClass} for="story-input-email">Email</label>
				<Input
					id="story-input-email"
					type="email"
					placeholder="you@example.com"
					aria-label="Email"
				/>
			</Stack>
			<Stack direction="column" gap="2">
				<label class={labelClass} for="story-input-password">Password</label>
				<Input
					id="story-input-password"
					type="password"
					placeholder="••••••••"
					aria-label="Password"
				/>
			</Stack>
		</Stack>
	{/snippet}
</Story>

<Story name="Invalid">
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-sm">
			<label class={labelClass} for="story-input-invalid">Description</label>
			<Input
				id="story-input-invalid"
				type="text"
				placeholder="Required"
				aria-invalid="true"
				aria-label="Description"
			/>
		</Stack>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-sm">
			<label class={labelClass} for="story-input-disabled">Provider</label>
			<Input
				id="story-input-disabled"
				type="text"
				disabled
				value="Read only value"
				aria-label="Provider"
			/>
		</Stack>
	{/snippet}
</Story>
