# Pack brand audit (from vendor screenshots)

- Status: Draft findings for M1 — **not** a signed-off token set
- Issue: #10
- Sources: [`docs/brand/source/`](./source/) (three Pack PNGs from the take-home brief)

This document records what is **visible** in the screenshots. Missing scales are listed as unknowns — not invented.

## Sources

| File | Scene |
| --- | --- |
| [`01-unfilled-upload-wizard.png`](./source/01-unfilled-upload-wizard.png) | Resources page + empty **Upload Resource** modal |
| [`02-filled-upload-wizard.png`](./source/02-filled-upload-wizard.png) | Same modal filled; Role dropdown open; dimmed page behind overlay |
| [`03-table-uploaded-content.png`](./source/03-table-uploaded-content.png) | Resources table + success toast (no modal) |

**Sampling note:** Prefer anchors from (3) and non-dimmed chrome. Do **not** treat overlay-dimmed oranges from (1)/(2) as brand anchors.

## Color anchors (observed / brief)

| Role | Value | Evidence |
| --- | --- | --- |
| Primary / CTA orange | `#FC8034` | Brief + Upload button / accents in (3); sampled neighbors ~`#FF8135`–`#FF8334` |
| Page / chrome wash | `#F9FAFC` | Sampled under header chrome in (3) |
| Success | ~`#1C9C70` | Brief; toast check / green in (3) samples ~`#1B9E72`–`#209970` |
| Body / secondary text | ~`#5C5C5C` | Brief; muted labels and table secondary copy |

Also visible (not elevated to a full ramp): near-white surfaces (`#FFFFFF` / `#FEFEFE`), light borders/dividers (cool grays ~`#D0D0D0`–`#E0E0E0`), gray **pill** chips for Provider/Type, dark primary copy on titles.

## Type cues (no family locked)

- Sans-serif UI throughout; logo wordmark **pack** (lowercase) in the header.
- Hierarchy: page/modal titles heavier; form labels medium; table body and muted meta lighter/gray.
- **Unknown:** exact font-family, weights scale, and logo SVG/asset pack — see open questions.

## Radius, elevation, chrome

| Cue | Observation |
| --- | --- |
| Controls | Text fields, selects, and primary buttons use **rounded** corners (moderate radius — not pill buttons except chips). |
| Modal | Card-like panel, light border; sits above a **dimming overlay** (1)/(2). |
| Shadow | Soft elevation under modal / toast — recipe not measurable from PNGs; **provisional product lock:** `shadow-soft` (`0 4px 16px 0 #00000026`). |
| Pills | Provider/Type badges are pill-shaped, neutral gray fill, no strong border. |
| Nav | Active top-nav item (**Resources**) uses an underline accent in primary orange. |
| Sub-nav | Type tabs (All / Videos / …): active **All** uses a thin **blue** underline (not orange primary). Product lock: `extension.color.info` / `border-info` until brand sign-off. |

## Pattern → atomic classification

Working map for later DS folders (`particles` → `pages`). Classifications are structural guesses from the three screens — not implemented components.

| Pattern (from screenshots) | Level | Notes |
| --- | --- | --- |
| Color / spacing / radius / type primitives | **tokens** | Author later; this audit only anchors colors |
| Icons (search, close, chevron, check, overflow) | **particles** | Icon set unknown |
| Text field, select, checkbox-less inputs | **atoms** | Form controls in modal |
| Primary button (Upload), icon button (close, overflow) | **atoms** | Orange filled CTA |
| Pill / badge (Provider, Type) | **atoms** | Neutral chips in table |
| Search field (“Field”) | **molecules** | Input + leading icon |
| Nav link + active underline | **molecules** | Header item |
| Sub-nav / filter tab | **molecules** | All / Videos / … |
| Toast (“Resource Uploaded Successfully!”) | **molecules** | Icon + message |
| Upload Resource form (fields + CTA) | **organisms** | Modal body |
| Upload Resource **dialog** | **organisms** / **templates** | Modal shell + form |
| Resources toolbar (tabs + search + Upload) | **organisms** | |
| Resources **table** (columns, row actions) | **organisms** | |
| App header (logo + nav + locale + avatar) | **organisms** | |
| Resources **page** | **pages** | Table view ± dialog/toast |
| Floating support/chat control | **organisms** (deferred) | Bottom-right orange control in (3) — product chrome, not core upload |

## Working hypothesis (UI kit)

- **shadcn-svelte** style **`new-york`**, **`baseColor` `neutral`**, `cssVariables: true` (already stubbed in `packages/ui/components.json`).
- Align primary token to `#FC8034` when tokens land; keep neutral base for surfaces/borders.

Not a locked ADR until token authoring signs off ([review] Brand audit sign-off).

## Resources filter rule

Observed/product rule for the Resources type tabs:

1. **All** is **always enabled** (and is the default selected tab in (3)).
2. Other type tabs (**Videos**, **Documents**, **Lessons**, **Archive**, …) are **disabled** unless the current dataset contains **≥ 1 resource of that type**.

Implementations must not invent empty-type browsing UX that contradicts this.

## Open questions

Do **not** invent answers in token PRs until resolved or explicitly scoped:

| Topic | Why unknown |
| --- | --- |
| Exact **font-family** + weight scale | Screenshots are raster; no CSS |
| **Logo** SVG / asset pack | Only raster wordmark visible |
| Full **brand color ramp** (hover/pressed/muted primary, borders, surfaces) | Only a few anchors sampled |
| **Sub-nav active** color (blue/dark vs orange primary) | **Provisional product lock (P2):** `extension.color.info` `#2563EB` underline on Resources type tabs — observed blue in source (3); still open for brand sign-off |
| **Shadow** recipe (y-offset, blur, opacity) | **Provisional product lock (P2):** `primitive.shadow.soft` = `0 4px 16px 0 #00000026` → Tailwind `shadow-soft` on modal/toast; still open for brand sign-off |
| **Dark mode** | No dark UI in source images |
| Focus rings / motion / density scale | Not specified |
| Full type taxonomy beyond visible tabs | Only All / Videos / Documents / Lessons / Archive shown |

## Non-goals (this doc)

- Token JSON / CSS variables
- Component implementation
- Inventing missing scales to “complete” a theme
