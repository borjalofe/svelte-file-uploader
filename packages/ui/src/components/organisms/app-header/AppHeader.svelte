<script lang="ts">
	import { Avatar, AvatarFallback } from '../../atoms/avatar/index.js';
	import {
		PACK_APP_HEADER_NAV_ITEMS,
		appHeaderActionsBaseClass,
		appHeaderBrandBaseClass,
		appHeaderLocaleBaseClass,
		appHeaderNavBaseClass,
		resolveAppHeaderNavLink,
		resolveAppHeaderRoot
	} from './app-header.js';
	import type { AppHeaderProps } from './types.js';

	let {
		ref = $bindable(null),
		navItems = [...PACK_APP_HEADER_NAV_ITEMS],
		brandLabel = 'pack',
		avatarLabel = 'Account',
		avatarInitials = 'PK',
		class: className,
		logo,
		locale,
		...restProps
	}: AppHeaderProps = $props();

	const root = $derived(resolveAppHeaderRoot({ class: className }));
</script>

<header bind:this={ref} data-slot="app-header" class={root.className} {...restProps}>
	<div data-slot="app-header-brand" class="flex min-w-0 items-center gap-3">
		{#if logo}
			{@render logo()}
		{:else}
			<a href="#home" class={appHeaderBrandBaseClass} data-slot="app-header-wordmark"
				>{brandLabel}</a
			>
		{/if}
	</div>

	<nav data-slot="app-header-nav" class={appHeaderNavBaseClass} aria-label="Primary">
		{#each navItems as item (item.href + item.label)}
			{@const link = resolveAppHeaderNavLink({ active: item.active })}
			<a
				href={item.href}
				class={link.className}
				aria-current={item.active ? 'page' : undefined}
				data-slot="app-header-nav-link"
				data-active={item.active ? 'true' : undefined}
			>
				{item.label}
			</a>
		{/each}
	</nav>

	<div data-slot="app-header-actions" class={appHeaderActionsBaseClass}>
		{#if locale}
			{@render locale()}
		{:else}
			<span
				class={appHeaderLocaleBaseClass}
				data-slot="app-header-locale"
				aria-label="Language United States (placeholder)"
				role="img"
			>
				🇺🇸
			</span>
		{/if}
		<Avatar class="size-8" role="img" aria-label={avatarLabel}>
			<AvatarFallback aria-hidden="true">{avatarInitials}</AvatarFallback>
		</Avatar>
	</div>
</header>
