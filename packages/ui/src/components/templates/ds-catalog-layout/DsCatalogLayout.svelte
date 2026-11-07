<script lang="ts">
	import {
		dsCatalogLayoutAsideBaseClass,
		dsCatalogLayoutMainBaseClass,
		dsCatalogLayoutNavBaseClass,
		dsCatalogLayoutTitleBaseClass,
		resolveDsCatalogLayoutRoot,
		resolveDsCatalogNavLink
	} from './ds-catalog-layout.js';
	import type { DsCatalogLayoutProps } from './types.js';

	let {
		ref = $bindable(null),
		navItems = [
			{ href: '#foundations', label: 'Foundations', active: true },
			{ href: '#tokens', label: 'Tokens' },
			{ href: '#components', label: 'Components' }
		],
		navLabel = 'Design system',
		title = 'Design system',
		class: className,
		children,
		...restProps
	}: DsCatalogLayoutProps = $props();

	const root = $derived(resolveDsCatalogLayoutRoot({ class: className }));
</script>

<div bind:this={ref} data-slot="ds-catalog-layout" class={root.className} {...restProps}>
	<aside data-slot="ds-catalog-layout-aside" class={dsCatalogLayoutAsideBaseClass}>
		{#if title}
			<p data-slot="ds-catalog-layout-title" class={dsCatalogLayoutTitleBaseClass}>{title}</p>
		{/if}
		<nav
			data-slot="ds-catalog-layout-nav"
			class={dsCatalogLayoutNavBaseClass}
			aria-label={navLabel}
		>
			{#each navItems as item (item.href + item.label)}
				{@const link = resolveDsCatalogNavLink({ active: item.active })}
				<a
					href={item.href}
					class={link.className}
					aria-current={item.active ? 'page' : undefined}
					data-slot="ds-catalog-layout-nav-link"
					data-active={item.active ? 'true' : undefined}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</aside>
	<main data-slot="ds-catalog-layout-main" class={dsCatalogLayoutMainBaseClass}>
		{@render children?.()}
	</main>
</div>
