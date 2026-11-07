# Changelog — `@pack-challenge/ui`

All notable consumer-facing changes to this package are documented here.

Preprod SemVer: **`0.y.z` only** (this cut is **`0.1.0`**). This is **not** a production `1.x` release. The package remains **`private: true`** until a separate human-approved publish.

The public surface is whatever `package.json` `exports["."]` → `src/lib/index.ts` re-exports. Deep imports are unsupported.

## [0.1.0] — 2026-11-07

Preprod tag: `@pack-challenge/ui@0.1.0`

MVP design-system surface from brand tokens through `/ds` demo pages.

### Brand / tokens (consumed, not authored here)

- Theme CSS via `@pack-challenge/tokens/theme.css` (semantic + extension CSS variables).
- Components use token utilities only (no raw brand hex in the public UI surface).

### Particles

- `Stack`, `Spacer`, `Divider`, `VisuallyHidden`
- Helpers: `gapClass`, `spaceScale`, `spaceCssVar`, `SR_ONLY_CLASS`, `NOT_SR_ONLY_CLASS`, `resolveStack`, `resolveSpacer`, `resolveDivider`, `resolveVisuallyHidden`, …

### Atoms

- `Avatar` (+ `AvatarImage`, `AvatarFallback`)
- `Badge`, `Button`
- `Card` (+ `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`)
- `Dialog` (+ `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogOverlay`, `DialogPortal`, `DialogClose`)
- `DropdownMenu` (+ trigger/content/item/checkbox/radio/sub/… compounds)
- `Input`, `Label`
- `Select` (+ trigger/content/item/group/… compounds)
- `Separator`, `Table` (+ header/body/row/head/cell/footer/caption)
- `Tabs` (+ `TabsList`, `TabsTrigger`, `TabsContent`)
- `Textarea`
- `Toaster` + `toast` (svelte-sonner; Pack success styling)

### Molecules

- `FilePickerField`, `InputField`, `MultiSelectList` (+ `ROLE_MULTI_OPTIONS`)
- `SearchField`, `SelectField`

### Organisms

- `AppHeader`
- `ResourcesDataTable` (+ `countResourceTypes`, `sortResourceRows`, `resourceContentTypeLabel`, …)
- `ResourcesToolbar` (+ `isResourceTabEnabled`, `RESOURCE_CONTENT_TYPES`, `RESOURCE_TAB_VALUES`, `RESOURCE_TAB_LABELS`)
- `SupportChatFab`
- `UploadResourceDialog` (+ `UPLOAD_CATEGORY_OPTIONS`, `UPLOAD_LANGUAGE_OPTIONS`, `UPLOAD_PROVIDER_OPTIONS`)

### Templates

- `DashboardShell`
- `DsCatalogLayout`

### Pages

- `TokensReferencePage` (+ `SHIPPED_*_SWATCHES`, `tokenSwatchSurfaceStyle`, …) — also `/ds`
- `ResourcesCatalogPage` (+ fixtures `RESOURCES_CATALOG_EMPTY` / `VIDEOS_ONLY` / `MIXED`) — also `/ds/resources`
- `UploadResourceDemoPage` (+ `UPLOAD_SUCCESS_TOAST_MESSAGE`, `resolveMockUploadSuccess`)

### Contract notes

- Consumer install / peers / theme import: [`README.md`](./README.md)
- Export map + publish dry-run CI: [`CONSUMER_CONTRACT.md`](./CONSUMER_CONTRACT.md) (`pnpm consumer-contract`)
- Resources filter rule: **All** always enabled; other type tabs need ≥1 row of that type
- **No npm publish** in this tag flow unless separately approved
