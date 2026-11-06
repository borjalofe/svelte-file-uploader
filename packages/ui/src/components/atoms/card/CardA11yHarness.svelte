<script lang="ts">
	import { Button } from '../button/index.js';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from './index.js';

	let {
		title = 'Upload Resource',
		description = 'Add a new resource to the library.'
	}: {
		title?: string;
		description?: string;
	} = $props();
</script>

<Card class="max-w-sm">
	<CardHeader>
		<CardTitle>{title}</CardTitle>
		<CardDescription>{description}</CardDescription>
	</CardHeader>
	<CardContent>
		<p class="text-sm">Fill in the form fields to continue.</p>
	</CardContent>
	<CardFooter>
		<Button type="button">Continue</Button>
	</CardFooter>
</Card>
