<script lang="ts">
	import Textarea from './Textarea.svelte';
	import type { TextareaProps } from './types.js';

	let {
		label = 'Description',
		id = 'textarea-a11y',
		...rest
	}: TextareaProps & { label?: string; id?: string } = $props();
</script>

<label class="text-sm font-medium text-foreground" for={id}>{label}</label>
<Textarea {id} {...rest} />
