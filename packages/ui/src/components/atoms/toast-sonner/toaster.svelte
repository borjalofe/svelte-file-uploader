<script lang="ts">
	import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
	import InfoIcon from '@lucide/svelte/icons/info';
	import Loader2Icon from '@lucide/svelte/icons/loader-2';
	import OctagonXIcon from '@lucide/svelte/icons/octagon-x';
	import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
	import { Toaster as Sonner } from 'svelte-sonner';
	import { resolveToaster, toasterDefaultTheme } from './toast-sonner.js';
	import type { ToasterProps } from './types.js';

	let {
		theme = toasterDefaultTheme,
		class: className,
		style,
		toastOptions,
		richColors = true,
		...restProps
	}: ToasterProps = $props();

	const resolved = $derived(
		resolveToaster({ class: className, style: style ?? undefined, toastOptions })
	);
</script>

<Sonner
	{theme}
	class={resolved.className}
	style={resolved.style}
	toastOptions={resolved.toastOptions}
	{richColors}
	{...restProps}
>
	{#snippet loadingIcon()}
		<Loader2Icon class="size-4 animate-spin" />
	{/snippet}
	{#snippet successIcon()}
		<CircleCheckIcon class="size-4" />
	{/snippet}
	{#snippet errorIcon()}
		<OctagonXIcon class="size-4" />
	{/snippet}
	{#snippet infoIcon()}
		<InfoIcon class="size-4" />
	{/snippet}
	{#snippet warningIcon()}
		<TriangleAlertIcon class="size-4" />
	{/snippet}
</Sonner>
