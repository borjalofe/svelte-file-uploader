# `@pack-challenge/ui`

Pack design-system library for Svelte 5 apps (particles → atoms → molecules → organisms → templates → pages). Public entry: `packages/ui/src/lib/index.ts` via `package.json` `exports["."]`.

Preprod version **`0.1.0`** (`0.y.z` only — not production `1.x`). The package remains **workspace-private** (`private: true`) until a separate human-approved publish. Consumers in this monorepo use `workspace:*`. See [`CHANGELOG.md`](./CHANGELOG.md).

Related gates:

- Export map + publish dry-run — [`CONSUMER_CONTRACT.md`](./CONSUMER_CONTRACT.md) (`pnpm consumer-contract`)
- Storybook axe — [`A11Y.md`](./A11Y.md) (`pnpm a11y`)
- Pages integration — [`INTEGRATION.md`](./INTEGRATION.md) (`pnpm integration`)

## Install

### Monorepo (apps/web)

```bash
pnpm add @pack-challenge/ui --filter @pack-challenge/web
# or declare in apps/web/package.json:
#   "@pack-challenge/ui": "workspace:*"
pnpm install
```

### Future published package (after preprod tag)

```bash
pnpm add @pack-challenge/ui
pnpm add -D svelte@^5   # peer — if the app does not already depend on Svelte 5
```

Also ensure the app can resolve `@pack-challenge/tokens` (theme CSS). In this workspace it is a workspace dependency of `@pack-challenge/ui`; publish consumers will need the tokens package (or an equivalent emitted `theme.css`) available.

## Peer dependencies

| Package  | Range    | Notes                                             |
| -------- | -------- | ------------------------------------------------- |
| `svelte` | `^5.0.0` | Required peer (`package.json` `peerDependencies`) |

Runtime dependencies pulled with the library (do not re-declare unless you need a different version): `@pack-challenge/tokens`, `bits-ui`, `@lucide/svelte`, `svelte-sonner`.

## Theme import

Components use Tailwind v4 utilities bound to Pack CSS variables. Import the emitted theme **before** (or with) Tailwind in the app stylesheet:

```css
@import 'tailwindcss';
@import '@pack-challenge/tokens/theme.css';
```

Build tokens first when the CSS is missing (`packages/tokens/dist/` is gitignored):

```bash
pnpm tokens:build
# or
pnpm tokens:check
```

Do **not** hard-code Pack brand hex in product UI — use semantic / extension utilities (`bg-primary`, `text-muted-foreground`, `bg-success`, …).

## Usage

```svelte
<script lang="ts">
	import { Button, ResourcesToolbar, toast, Toaster } from '@pack-challenge/ui';
</script>

<ResourcesToolbar
	value="all"
	counts={{ videos: 2, documents: 0, lessons: 0, archive: 0 }}
	onUpload={() => toast.success('Resource Uploaded Successfully!')}
/>
<Toaster richColors position="bottom-right" />
<Button variant="default">Upload</Button>
```

Only symbols re-exported from `@pack-challenge/ui` (see portfolio below) are part of the consumer contract. Deep imports into `packages/ui/src/components/**` are unsupported.

## Portfolio (shipped)

Aligned with `src/lib/index.ts` as of this document. If it is not exported there, it is not a public API.

### Particles

`Stack`, `Spacer`, `Divider`, `VisuallyHidden`

### Atoms

`Avatar` (+ `AvatarImage`, `AvatarFallback`), `Badge`, `Button`, `Card` (+ header/title/description/action/content/footer), `Dialog` (+ content/header/footer/title/description/overlay/portal/close/trigger), `DropdownMenu` (+ item/content/trigger/… compounds), `Input`, `Label`, `Select` (+ trigger/content/item/… compounds), `Separator`, `Table` (+ header/body/row/head/cell/footer/caption), `Tabs` (+ list/trigger/content), `Textarea`, `Toaster` + `toast`

### Molecules

`FilePickerField`, `InputField`, `MultiSelectList` (+ `ROLE_MULTI_OPTIONS`), `SearchField`, `SelectField`

### Organisms

`AppHeader`, `ResourcesDataTable` (+ `countResourceTypes`, …), `ResourcesToolbar` (+ `isResourceTabEnabled`, `RESOURCE_*`), `SupportChatFab`, `UploadResourceDialog` (+ `UPLOAD_*_OPTIONS`)

### Templates

`DashboardShell`, `DsCatalogLayout`

### Pages (demo /ds)

`TokensReferencePage`, `ResourcesCatalogPage` (+ fixtures `RESOURCES_CATALOG_*`), `UploadResourceDemoPage` (+ `UPLOAD_SUCCESS_TOAST_MESSAGE`)

Storybook: `pnpm storybook` (package) or `pnpm storybook` from the repo root. Living routes: `/ds` (tokens), `/ds/resources` (catalog).

## Resources filter rule

Product rule for Resources type tabs (toolbar / catalog demos):

1. **All** is **always enabled** (and is the default selected tab).
2. Other type tabs (**Videos**, **Documents**, **Lessons**, **Archive**, …) are **disabled** unless the current dataset contains **≥ 1 resource of that type**.

Use `isResourceTabEnabled(tab, counts)` / `countResourceTypes(rows)` from this package. Do not invent empty-type browsing UX that contradicts this rule. Source: [`docs/brand/AUDIT.md`](../../docs/brand/AUDIT.md).

## Local library commands

```bash
pnpm --filter @pack-challenge/ui dev          # Kit host incl. /ds
pnpm --filter @pack-challenge/ui test         # unit + a11y-specs
pnpm --filter @pack-challenge/ui test:a11y    # Storybook axe (a11y-gate)
pnpm --filter @pack-challenge/ui test:integration
pnpm --filter @pack-challenge/ui check:consumer-contract
pnpm --filter @pack-challenge/ui build-storybook
```

## Non-goals (this package README)

- npm registry publish (preprod tag only unless separately approved)
- Production SemVer `1.x`
- Nest API, Zod domain schemas, or production upload backends
- Guaranteeing deep component-path imports
