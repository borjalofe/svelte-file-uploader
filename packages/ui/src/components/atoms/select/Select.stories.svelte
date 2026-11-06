<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Stack } from '../../particles/stack/index.js';
	import { Label } from '../label/index.js';
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectGroupHeading,
		SelectItem,
		SelectSeparator,
		SelectTrigger,
		SelectValue
	} from './index.js';

	/**
	 * shadcn-svelte new-york Select (bits-ui) on Pack semantic tokens.
	 * Default joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/Select',
		tags: ['autodocs']
	});
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-sm">
			<Label for="story-select-default">Role</Label>
			<Select type="single">
				<SelectTrigger id="story-select-default" class="w-full" aria-label="Role">
					<SelectValue placeholder="Select role" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="admin" label="Admin" />
					<SelectItem value="editor" label="Editor" />
					<SelectItem value="viewer" label="Viewer" />
				</SelectContent>
			</Select>
		</Stack>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<Stack direction="column" gap="4" class="max-w-sm">
			<Stack direction="column" gap="2">
				<Label for="story-select-sm">Small</Label>
				<Select type="single">
					<SelectTrigger id="story-select-sm" size="sm" class="w-full" aria-label="Small">
						<SelectValue placeholder="Small select" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="a" label="Option A" />
						<SelectItem value="b" label="Option B" />
					</SelectContent>
				</Select>
			</Stack>
			<Stack direction="column" gap="2">
				<Label for="story-select-default-size">Default</Label>
				<Select type="single">
					<SelectTrigger
						id="story-select-default-size"
						size="default"
						class="w-full"
						aria-label="Default"
					>
						<SelectValue placeholder="Default select" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="a" label="Option A" />
						<SelectItem value="b" label="Option B" />
					</SelectContent>
				</Select>
			</Stack>
		</Stack>
	{/snippet}
</Story>

<Story name="Grouped">
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-sm">
			<Label for="story-select-grouped">Visibility</Label>
			<Select type="single">
				<SelectTrigger id="story-select-grouped" class="w-full" aria-label="Visibility">
					<SelectValue placeholder="Choose visibility" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectGroupHeading>Public</SelectGroupHeading>
						<SelectItem value="everyone" label="Everyone" />
						<SelectItem value="link" label="Anyone with the link" />
					</SelectGroup>
					<SelectSeparator />
					<SelectGroup>
						<SelectGroupHeading>Restricted</SelectGroupHeading>
						<SelectItem value="team" label="Team only" />
						<SelectItem value="private" label="Only me" />
					</SelectGroup>
				</SelectContent>
			</Select>
		</Stack>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template()}
		<Stack direction="column" gap="2" class="max-w-sm">
			<Label for="story-select-disabled">Provider</Label>
			<Select type="single" value="aws">
				<SelectTrigger id="story-select-disabled" class="w-full" disabled aria-label="Provider">
					<SelectValue placeholder="Provider" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="aws" label="AWS" />
					<SelectItem value="gcp" label="GCP" />
				</SelectContent>
			</Select>
		</Stack>
	{/snippet}
</Story>
