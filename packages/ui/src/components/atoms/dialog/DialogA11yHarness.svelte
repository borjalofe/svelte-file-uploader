<script lang="ts">
	import { Button } from '../button/index.js';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from './index.js';

	let {
		open = $bindable(false),
		title = 'Upload Resource',
		description = 'Add a new resource to the library.'
	}: {
		open?: boolean;
		title?: string;
		description?: string;
	} = $props();
</script>

<Dialog bind:open>
	<DialogTrigger>
		{#snippet child({ props })}
			<Button variant="default" {...props}>Upload</Button>
		{/snippet}
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>{title}</DialogTitle>
			<DialogDescription>{description}</DialogDescription>
		</DialogHeader>
		<DialogFooter showCloseButton />
	</DialogContent>
</Dialog>
