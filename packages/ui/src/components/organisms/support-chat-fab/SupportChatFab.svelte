<script lang="ts">
	import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
	import { Button } from '../../atoms/button/index.js';
	import {
		resolveSupportChatFabButton,
		resolveSupportChatFabRoot,
		resolveSupportChatFabStatus
	} from './support-chat-fab.js';
	import type { SupportChatFabProps } from './types.js';

	let {
		ref = $bindable(null),
		'aria-label': ariaLabel = 'Open support chat',
		showStatus = true,
		statusLabel = 'Support available',
		class: className,
		disabled,
		onclick,
		...restProps
	}: SupportChatFabProps = $props();

	const root = $derived(resolveSupportChatFabRoot({ class: className }));
	const button = $derived(resolveSupportChatFabButton());
	const status = $derived(resolveSupportChatFabStatus());
</script>

<div data-slot="support-chat-fab" class={root.className} {...restProps}>
	<Button
		bind:ref
		type="button"
		variant="default"
		size="icon-lg"
		class={button.className}
		{disabled}
		{onclick}
		aria-label={ariaLabel}
		data-slot="support-chat-fab-button"
	>
		<MessageCircleIcon aria-hidden="true" />
	</Button>
	{#if showStatus}
		<span
			data-slot="support-chat-fab-status"
			class={status.className}
			aria-hidden="true"
			title={statusLabel}
		></span>
	{/if}
</div>
