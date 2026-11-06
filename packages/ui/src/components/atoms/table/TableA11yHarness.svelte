<script lang="ts">
	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from './index.js';

	let {
		caption = 'Resources',
		selected = false
	}: {
		caption?: string;
		selected?: boolean;
	} = $props();
</script>

<Table>
	<TableCaption>{caption}</TableCaption>
	<TableHeader>
		<TableRow>
			<TableHead>Title</TableHead>
			<TableHead>Provider</TableHead>
			<TableHead>Type</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		<TableRow data-state={selected ? 'selected' : undefined}>
			<TableCell>Intro to Pack</TableCell>
			<TableCell>AWS</TableCell>
			<TableCell>Video</TableCell>
		</TableRow>
		<TableRow>
			<TableCell>Design tokens</TableCell>
			<TableCell>GCP</TableCell>
			<TableCell>Document</TableCell>
		</TableRow>
	</TableBody>
</Table>
