<script lang="ts">
	import { Button } from '../button/index.js';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from './index.js';
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>Open menu</Button>
		{/snippet}
	</DropdownMenuTrigger>
	<DropdownMenuContent class="w-56">
		<DropdownMenuLabel>Actions</DropdownMenuLabel>
		<DropdownMenuSeparator />
		<DropdownMenuItem>Edit</DropdownMenuItem>
		<DropdownMenuItem>Duplicate</DropdownMenuItem>
		<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>
