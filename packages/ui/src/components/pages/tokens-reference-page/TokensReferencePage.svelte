<script lang="ts">
	import { DsCatalogLayout } from '../../templates/ds-catalog-layout/index.js';
	import {
		SHIPPED_COLOR_SWATCHES,
		SHIPPED_RADIUS_SWATCHES,
		SHIPPED_SPACE_SWATCHES,
		resolveTokensReferencePageRoot,
		tokenSwatchSurfaceStyle,
		tokensReferencePageGridBaseClass,
		tokensReferencePageSectionBaseClass,
		tokensReferencePageSwatchCardBaseClass,
		tokensReferencePageSwatchSurfaceBaseClass
	} from './tokens-reference-page.js';
	import type { TokensReferencePageProps } from './types.js';

	let { ref = $bindable(null), class: className }: TokensReferencePageProps = $props();

	const root = $derived(resolveTokensReferencePageRoot({ class: className }));
</script>

<DsCatalogLayout
	bind:ref
	title="Design system"
	navLabel="Design system"
	navItems={[
		{ href: '#foundations', label: 'Foundations' },
		{ href: '#tokens', label: 'Tokens', active: true },
		{ href: '#components', label: 'Components' }
	]}
	data-slot="tokens-reference-page"
>
	<div class={root.className}>
		<header class="flex flex-col gap-1">
			<h1 class="text-2xl font-semibold text-foreground">Tokens</h1>
			<p class="text-sm text-muted-foreground">
				Live swatches for shipped Pack theme tokens (semantic + extension). Values come from CSS
				variables — no invented token paths.
			</p>
		</header>

		<section
			class={tokensReferencePageSectionBaseClass}
			aria-labelledby="tokens-reference-colors"
			data-slot="tokens-reference-colors"
		>
			<h2 id="tokens-reference-colors" class="text-lg font-medium text-foreground">Color</h2>
			<ul class={tokensReferencePageGridBaseClass}>
				{#each SHIPPED_COLOR_SWATCHES as swatch (swatch.cssVar)}
					<li class={tokensReferencePageSwatchCardBaseClass} data-token={swatch.cssVar}>
						<div
							class={tokensReferencePageSwatchSurfaceBaseClass}
							style={tokenSwatchSurfaceStyle(swatch)}
							aria-hidden="true"
						></div>
						<p class="text-xs font-medium text-foreground">{swatch.label}</p>
						<p class="font-mono text-[0.65rem] text-muted-foreground">{swatch.cssVar}</p>
					</li>
				{/each}
			</ul>
		</section>

		<section
			class={tokensReferencePageSectionBaseClass}
			aria-labelledby="tokens-reference-space"
			data-slot="tokens-reference-space"
		>
			<h2 id="tokens-reference-space" class="text-lg font-medium text-foreground">Space</h2>
			<ul class={tokensReferencePageGridBaseClass}>
				{#each SHIPPED_SPACE_SWATCHES as swatch (swatch.cssVar)}
					<li class={tokensReferencePageSwatchCardBaseClass} data-token={swatch.cssVar}>
						<div class="flex h-12 items-end" aria-hidden="true">
							<div class="border border-border" style={tokenSwatchSurfaceStyle(swatch)}></div>
						</div>
						<p class="text-xs font-medium text-foreground">{swatch.label}</p>
						<p class="font-mono text-[0.65rem] text-muted-foreground">{swatch.cssVar}</p>
					</li>
				{/each}
			</ul>
		</section>

		<section
			class={tokensReferencePageSectionBaseClass}
			aria-labelledby="tokens-reference-radius"
			data-slot="tokens-reference-radius"
		>
			<h2 id="tokens-reference-radius" class="text-lg font-medium text-foreground">Radius</h2>
			<ul class={tokensReferencePageGridBaseClass}>
				{#each SHIPPED_RADIUS_SWATCHES as swatch (swatch.cssVar)}
					<li class={tokensReferencePageSwatchCardBaseClass} data-token={swatch.cssVar}>
						<div
							class={tokensReferencePageSwatchSurfaceBaseClass}
							style={tokenSwatchSurfaceStyle(swatch)}
							aria-hidden="true"
						></div>
						<p class="text-xs font-medium text-foreground">{swatch.label}</p>
						<p class="font-mono text-[0.65rem] text-muted-foreground">{swatch.cssVar}</p>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</DsCatalogLayout>
