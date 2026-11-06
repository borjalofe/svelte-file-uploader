<script lang="ts">
	import { onMount } from 'svelte';
	import { toast, Toaster } from './index.js';

	let {
		message = 'Resource Uploaded Successfully!',
		fireSuccess = false
	}: {
		message?: string;
		fireSuccess?: boolean;
	} = $props();

	onMount(() => {
		if (fireSuccess) {
			toast.success(message);
		}
	});
</script>

<Toaster richColors position="bottom-right" />
