<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Button } from '../button/index.js';
	import { toast, Toaster } from './index.js';

	/**
	 * shadcn-svelte new-york Sonner Toaster on Pack semantic tokens.
	 * Pack audited success toast → `toast.success` + richColors / extension success.
	 * Idle toaster joins the CI axe gate — see packages/ui/A11Y.md.
	 *
	 * Note: omit `component` in defineMeta so CSF does not wrap the template.
	 */
	const { Story } = defineMeta({
		title: 'Atoms/ToastSonner',
		tags: ['autodocs']
	});
</script>

<Story name="Default" tags={['a11y-gate']} parameters={{ a11y: { test: 'error' } }}>
	{#snippet template()}
		<Toaster richColors position="bottom-right" />
		<p class="text-sm text-muted-foreground">Toaster mounted (idle notifications region).</p>
	{/snippet}
</Story>

<Story name="Success">
	{#snippet template()}
		<Toaster richColors position="bottom-right" />
		<Button variant="default" onclick={() => toast.success('Resource Uploaded Successfully!')}>
			Show success toast
		</Button>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<Toaster richColors position="bottom-right" />
		<div class="flex flex-wrap gap-2">
			<Button variant="secondary" onclick={() => toast('Saved draft')}>Default</Button>
			<Button variant="default" onclick={() => toast.success('Resource Uploaded Successfully!')}>
				Success
			</Button>
			<Button variant="outline" onclick={() => toast.info('Syncing resources…')}>Info</Button>
			<Button variant="outline" onclick={() => toast.warning('Almost out of storage')}>
				Warning
			</Button>
			<Button variant="destructive" onclick={() => toast.error('Upload failed')}>Error</Button>
		</div>
	{/snippet}
</Story>
