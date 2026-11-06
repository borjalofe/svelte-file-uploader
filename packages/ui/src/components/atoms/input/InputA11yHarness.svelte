<script lang="ts">
	import Input from './Input.svelte';
	import type { InputProps } from './types.js';

	let {
		label = 'Title',
		id = 'input-a11y',
		...rest
	}: InputProps & { label?: string; id?: string } = $props();
</script>

<label class="text-sm font-medium text-foreground" for={id}>{label}</label>
<Input {id} {...rest} />
