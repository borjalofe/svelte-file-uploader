# svelte-file-uploader

**Status:** early — M0 Foundation

Pack take-home scaffold: a shared Svelte design system, a SvelteKit web app, a Nest API stub, and shared domain types in one installable monorepo.

## Problem

A take-home product needs a **UI design system**, a **web app**, an **API**, and **shared types** without four disconnected repos or conflicting package managers. Starting empty forces an early layout choice: if the seed is wrong, every later CI job and feature PR pays the tax.

This milestone only answers that foundation question — not the product yet.

## Scope

**In scope**

- pnpm workspace + Turborepo task graph
- `apps/web` (`@pack-challenge/web`) — SvelteKit app stub
- `apps/api` (`@pack-challenge/api`) — Nest Resources API (`POST`/`GET /resources` + local file store) + Drizzle migration
- `packages/ui` (`@pack-challenge/ui`) — library layout, `/ds` stub, Tailwind (`cssVariables: true` placeholder), Storybook welcome, Vitest smoke
- `packages/domain` (`@pack-challenge/domain`) — shared Zod Resource create/list schemas + constants (Nest + SvelteKit)
- Living ADRs under [docs/decisions/](./docs/decisions/)
- Compose **`db`** + **`api`** + **`web`** (Postgres, Nest, SvelteKit) for Pack evaluators
- Brand audit from Pack screenshots — [`docs/brand/AUDIT.md`](./docs/brand/AUDIT.md)
- Token pipeline CI — validate `tokens/**` + emit CSS vars (`pnpm tokens:check`)
- Primitive color ramps (`brand` / `neutral`) — [`tokens/COLOR_RAMPS.md`](./tokens/COLOR_RAMPS.md)
- Non-color primitives (space, type, single radius, shadow, motion) — [`tokens/NON_COLOR_PRIMITIVES.md`](./tokens/NON_COLOR_PRIMITIVES.md)
- Semantic → shadcn CSS variable map — [`tokens/SEMANTIC_SHADCN_MAP.md`](./tokens/SEMANTIC_SHADCN_MAP.md)
- Extension status colors (success/warning/info) — [`tokens/EXTENSION_STATUS.md`](./tokens/EXTENSION_STATUS.md)
- Theme emit — `:root` / `.dark` / `@theme inline` + Storybook `bg-primary` — [`tokens/THEME_EMIT.md`](./tokens/THEME_EMIT.md)
- Particles CI — `unit` covers `packages/ui/src/components/particles/**`; required `storybook` job (`pnpm storybook:build`)
- Semantic spacing scale — [`tokens/SEMANTIC_SPACE.md`](./tokens/SEMANTIC_SPACE.md)
- Particle **Stack** — `packages/ui/src/components/particles/stack/` (direction/gap/align/justify via semantic space)
- Particle **Spacer** — `packages/ui/src/components/particles/spacer/` (fixed semantic size or flex-grow)
- Particle **Divider** — `packages/ui/src/components/particles/divider/` (orientation + semantic `border` / `foreground`)
- Particle **VisuallyHidden** — `packages/ui/src/components/particles/visually-hidden/` (SR-only; unhides on focus)
- Atoms a11y CI — required `a11y` job (`pnpm a11y`); axe via Storybook Vitest for stories tagged `a11y-gate` — [`packages/ui/A11Y.md`](./packages/ui/A11Y.md)
- Atom **Avatar** — `packages/ui/src/components/atoms/avatar/` (bits-ui / shadcn-svelte new-york on semantic tokens; unit + axe + `a11y-gate` stories)
- Atom **Badge** — `packages/ui/src/components/atoms/badge/` (shadcn-svelte new-york on semantic tokens; unit + axe + `a11y-gate` story)
- Atom **Button** — `packages/ui/src/components/atoms/button/` (shadcn-svelte new-york on semantic tokens; unit + `a11y-gate` stories)
- Atom **Card** — `packages/ui/src/components/atoms/card/` (shadcn-svelte new-york on semantic tokens; unit + axe + `a11y-gate` stories)
- Atom **Dialog** — `packages/ui/src/components/atoms/dialog/` (bits-ui / shadcn-svelte new-york on semantic tokens; unit + axe + `a11y-gate` story)
- Atom **DropdownMenu** — `packages/ui/src/components/atoms/dropdownmenu/` (bits-ui / shadcn-svelte new-york on semantic tokens; unit + axe + `a11y-gate` stories)
- Atom **Input** — `packages/ui/src/components/atoms/input/` (shadcn-svelte new-york on semantic tokens; unit + axe + `a11y-gate` story)
- Atom **Label** — `packages/ui/src/components/atoms/label/` (bits-ui / shadcn-svelte new-york on semantic tokens; unit + axe + `a11y-gate` stories)
- Atom **Select** — `packages/ui/src/components/atoms/select/` (bits-ui / shadcn-svelte new-york on semantic tokens; unit + axe + `a11y-gate` stories)
- Atom **Separator** — `packages/ui/src/components/atoms/separator/` (bits-ui / shadcn-svelte new-york on semantic tokens; unit + axe + `a11y-gate` story)
- Atom **Table** — `packages/ui/src/components/atoms/table/` (shadcn-svelte new-york on semantic tokens; unit + axe + `a11y-gate` story)
- Atom **Tabs** — `packages/ui/src/components/atoms/tabs/` (bits-ui / shadcn-svelte new-york on semantic tokens; unit + axe + `a11y-gate` stories; per-item disabled)
- Atom **Textarea** — `packages/ui/src/components/atoms/textarea/` (shadcn-svelte new-york on semantic tokens; unit + axe + `a11y-gate` story)
- Atom **Toast (Sonner)** — `packages/ui/src/components/atoms/toast-sonner/` (svelte-sonner / shadcn-svelte new-york on semantic tokens; unit + axe + `a11y-gate` story)
- Molecule **FilePickerField** — `packages/ui/src/components/molecules/file-picker-field/` (filename + Select file + hidden input; unit + axe + `a11y-gate` stories)
- Molecule **InputField** — `packages/ui/src/components/molecules/input-field/` (Label + Input/Textarea + hint/error; unit + axe + `a11y-gate` stories)
- Molecule **MultiSelectList** — `packages/ui/src/components/molecules/multi-select-list/` (Role multi options: Mentor/Coach, Mentee/Coachee; unit + axe + `a11y-gate` stories)
- Molecule **SearchField** — `packages/ui/src/components/molecules/search-field/` (Input + leading search icon; unit + axe + `a11y-gate` stories)
- Molecule **SelectField** — `packages/ui/src/components/molecules/select-field/` (Label + Select + error; unit + axe + `a11y-gate` stories)
- Organism **AppHeader** — `packages/ui/src/components/organisms/app-header/` (logo slot + nav + locale slot + Avatar; primary active underline; unit + axe + `a11y-gate` story)
- Organism **ResourcesDataTable** — `packages/ui/src/components/organisms/resources-data-table/` (Table + sort + Badge + row DropdownMenu; type counts for toolbar; unit + axe + `a11y-gate` story)
- Organism **ResourcesToolbar** — `packages/ui/src/components/organisms/resources-toolbar/` (type Tabs + SearchField + Upload; **All** never disabled; other tabs need ≥1 of that type from parent `counts`; unit + axe + `a11y-gate` stories)
- Organism **SupportChatFab** — `packages/ui/src/components/organisms/support-chat-fab/` (circular primary FAB + extension success status dot; click callback only; unit + axe + `a11y-gate` story)
- Organism **UploadResourceDialog** — `packages/ui/src/components/organisms/upload-resource-dialog/` (Dialog + stacked InputField/SelectField/MultiSelectList/FilePickerField + Upload; mock `onUpload` payload; bits-ui focus trap; unit + axe + `a11y-gate` stories)
- Template **DashboardShell** — `packages/ui/src/components/templates/dashboard-shell/` (header + main Card + optional region slots; no domain copy; Storybook only — no automated unit/a11y)
- Template **DsCatalogLayout** — `packages/ui/src/components/templates/ds-catalog-layout/` (/ds docs shell: side nav + content slot; stories only; no domain copy)
- Page **ResourcesCatalogPage** — `packages/ui/src/components/pages/resources-catalog-page/` (DashboardShell + AppHeader + ResourcesToolbar + ResourcesDataTable + Toast; `/ds/resources`; unit + integration + axe + `a11y-gate` stories)
  - Fixtures: **Empty** (only All enabled), **VideosOnly** (All + Videos), **Mixed** (videos/documents/lessons/archive) — toolbar `counts` from the full dataset; table filtered client-side; no upload API
- Page **TokensReferencePage** — `packages/ui/src/components/pages/tokens-reference-page/` (DsCatalogLayout + live swatches for shipped tokens; unit + integration + axe + `a11y-gate` story; also on `/ds`)
- Pages integration CI — required `integration` job (`pnpm integration`); Vitest under `packages/ui/src/components/pages/**` — [`packages/ui/INTEGRATION.md`](./packages/ui/INTEGRATION.md)
- Consumer contract CI — required `consumer-contract` job (`pnpm consumer-contract`); public allowlist + export map + pack/publish dry-run for `@pack-challenge/ui` — [`packages/ui/CONSUMER_CONTRACT.md`](./packages/ui/CONSUMER_CONTRACT.md)
- Public API + SemVer **0.y.z** — root-only `@pack-challenge/ui` imports; allowlist in `src/lib/public-exports.allowlist.json`; preprod minor may break — [`packages/ui/PUBLIC_API.md`](./packages/ui/PUBLIC_API.md)

**Out of scope**

- Cloud DB / public deploy (later milestones)
- Remaining atoms; remaining `/ds` demo pages; container image scans

## Architecture

```mermaid
flowchart LR
  web["apps/web<br/>@pack-challenge/web"]
  api["apps/api<br/>@pack-challenge/api"]
  ui["packages/ui<br/>@pack-challenge/ui"]
  domain["packages/domain<br/>@pack-challenge/domain"]
  tokensPkg["packages/tokens<br/>@pack-challenge/tokens"]
  db["compose db<br/>Postgres 16"]

  web --> ui
  web --> domain
  api --> domain
  api --> db
  tokensPkg -->|emit CSS vars| ui
  ui -->|Storybook /ds| ui
```

| Path | Package | Role today |
| --- | --- | --- |
| `apps/web` | `@pack-challenge/web` | SvelteKit host |
| `apps/api` | `@pack-challenge/api` | Nest Resources create/list/search + local file store + Drizzle migration |
| `packages/ui` | `@pack-challenge/ui` | Design-system library + Storybook (particles + atoms; molecules FilePickerField, InputField, MultiSelectList, SearchField, SelectField; organisms AppHeader, ResourcesDataTable, ResourcesToolbar, SupportChatFab, UploadResourceDialog; templates DashboardShell, DsCatalogLayout; pages ResourcesCatalogPage, TokensReferencePage) |
| `packages/domain` | `@pack-challenge/domain` | Shared Zod Resource schemas (create/list + file metadata) |
| `packages/tokens` | `@pack-challenge/tokens` | Validate `tokens/**` + emit theme CSS |
| `tokens/` | — | DTCG sources (primitives + semantic + extension) → emitted theme CSS |

## How to run

**Prerequisites:** Docker (Pack evaluator path). Optional for contributors: Node ≥ 22, [pnpm](https://pnpm.io) 11.

### Pack evaluator (Compose full stack)

```bash
cp .env.example .env
docker compose up --build
```

- **Web UI:** http://localhost:5173
- **API health:** http://localhost:3000/health
- **API resources:** http://localhost:3000/resources

Compose applies Drizzle migrations on **`api`** start (`db` must be healthy first). Uploaded files persist in the `api_files` volume.

### Contributor (host pnpm + Compose `db` only)

```bash
pnpm install
cp .env.example .env
docker compose up -d db
pnpm --filter @pack-challenge/api db:migrate
pnpm --filter @pack-challenge/api start   # http://localhost:3000
pnpm --filter @pack-challenge/web dev     # http://localhost:5173
pnpm test
pnpm tokens:check
pnpm storybook                           # http://localhost:6006
```


## How we test

GitHub Actions workflow **PR gate** (`.github/workflows/pr-gate.yml`) on `pull_request` and `push` to `main`:

| Job | Command |
| --- | --- |
| `lint` | `pnpm lint` |
| `unit` | `pnpm test` (includes `packages/ui/src/components/particles/**`) |
| `api` | migrate + `pnpm api:test` + API typecheck (ephemeral Postgres 16) |
| `web` | `pnpm tokens:build` + `pnpm web:lint` + `pnpm web:test` + `pnpm web:check` |
| `storybook` | `pnpm storybook:build` |
| `a11y` | `pnpm a11y` (axe on stories tagged `a11y-gate`) |
| `integration` | `pnpm integration` (pages `*.integration.spec.ts`) |
| `tokens` | `pnpm tokens:check` (`tokens:validate` + `tokens:build`) |
| `consumer-contract` | `pnpm consumer-contract` (allowlist + export map + publish dry-run) |
| `audit` | `pnpm audit` (`pnpm audit --audit-level=high`) |

Audit fails the gate on **high** and **critical** advisories; moderate/low are reported in the job summary but do not fail. The **`api`** job fails when Nest Resources tests or API typecheck fail (runs `db:migrate` against job-scoped Postgres so Drizzle specs are not skipped). The **`web`** job fails when `@pack-challenge/web` lint, unit tests, or typecheck fail (emits theme CSS first so `layout.css` can import `@pack-challenge/tokens/theme.css`). The **`tokens`** job fails on invalid/cyclic aliases, forbidden semantic paths (`color.text.*`, `color.action.*`, `color.surface.elevated`, `color.focus`), and `radius.sm` / `md` / `lg`; it emits CSS vars to `packages/tokens/dist/` (gitignored). The **`storybook`** job fails on a broken Storybook build. The **`a11y`** job fails on axe violations for atom-gated stories (`parameters.a11y.test = 'error'` + tag `a11y-gate` — see [`packages/ui/A11Y.md`](./packages/ui/A11Y.md)). The **`integration`** job fails when page integration specs fail (stub under `pages/` proves the wire — see [`packages/ui/INTEGRATION.md`](./packages/ui/INTEGRATION.md)). The **`consumer-contract`** job fails when the public allowlist drifts, `@pack-challenge/ui` export paths are missing, or pack/publish dry-run fails — see [`packages/ui/CONSUMER_CONTRACT.md`](./packages/ui/CONSUMER_CONTRACT.md) and [`packages/ui/PUBLIC_API.md`](./packages/ui/PUBLIC_API.md) (preprod SemVer **0.y.z**). Mark `lint`, `unit`, `api`, `web`, `storybook`, `a11y`, `integration`, `tokens`, `consumer-contract`, and `audit` as required on `main` for an honest merge.

### Daily vulnerability scan

Workflow **Daily audit** (`.github/workflows/daily-audit.yml`) — independent of the PR gate:

| Trigger | Detail |
| --- | --- |
| Schedule | Cron `0 6 * * *` (06:00 UTC daily) |
| Manual | Actions → **Daily audit** → Run workflow (`workflow_dispatch`) |

Job: `audit` → `pnpm audit` (fail at **high**/**critical**). Failures show in the Actions run / job summary; triage is manual.

## Brand

Visual contract audit (screenshots + findings): [`docs/brand/AUDIT.md`](./docs/brand/AUDIT.md). Includes color anchors, atomic classification, open questions, and the Resources filter rule (**All** always enabled; other type tabs disabled unless ≥1 resource of that type).

Primitive ramps: [`tokens/COLOR_RAMPS.md`](./tokens/COLOR_RAMPS.md) — `brand.500` = `#FC8034`, `neutral.50` = `#F9FAFC`, `neutral.600` = `#5C5C5C`; other stops provisional via OKLCH.

Non-color primitives: [`tokens/NON_COLOR_PRIMITIVES.md`](./tokens/NON_COLOR_PRIMITIVES.md) — single `radius.default`; provisional system/ui-sans fonts until font/logo review.

Semantic map: [`tokens/SEMANTIC_SHADCN_MAP.md`](./tokens/SEMANTIC_SHADCN_MAP.md) — token → `--css-var` → Tailwind (`primary` ← brand orange; AA-safe `primary-foreground`). Components must not import `primitive.*`.

Extension status: [`tokens/EXTENSION_STATUS.md`](./tokens/EXTENSION_STATUS.md) — `success` ≈ `#1C9C70` (audited); `warning`/`info` provisional; registered on `:root`, `.dark`, and `@theme inline`.

Theme emit: [`tokens/THEME_EMIT.md`](./tokens/THEME_EMIT.md) — generate-on-build `theme.css`; UI/Storybook import; `bg-primary` via `@theme inline`. Components use semantic/extension utilities — no raw hex.

Semantic space: [`tokens/SEMANTIC_SPACE.md`](./tokens/SEMANTIC_SPACE.md) — `semantic.space.*` → `--space-*` / `@theme --spacing-*` (Tailwind `gap-*` / `w-*` / `h-*`). **Stack** uses this for gap; **Spacer** for fixed size or flex-grow (no raw rem/px).

## Technical decisions

| Choice | Why | Discarded |
| --- | --- | --- |
| **pnpm + Turborepo** monorepo | One lockfile, filtered scripts, cached tasks; matches Pack stack (SvelteKit UI + Nest API + shared domain) | Separate repos (cross-cutting PRs hurt); npm/yarn workspaces alone (weaker task caching); Nx (heavier than needed for this seed) |
| Storybook + Vitest on `@pack-challenge/ui` | Design system is the long-lived surface; app can stay thin | Storybook-only app package (extra hop for a seed) |
| Compose **`db`/`api`/`web`** + env credentials | Stable names for M10/M12; secrets stay in `.env` | Cloud DB for M0; baking passwords into `compose.yaml`; default `postgres`/`postgres` |
| Shared Zod in `@pack-challenge/domain` | One Resource contract for Nest + SvelteKit | Duplicated types per app; SvelteKit-only schemas |
| **Drizzle** migrations in `apps/api` | SQL + TS schema mapped to domain Zod; Nest-ready | Prisma (heavier); TypeORM; hand-only SQL with no schema module |
| Nest + local FS object keys for uploads | Multipart create validated with shared Zod; paths stay off the public API | Direct public FS URLs; SvelteKit-only upload |
| Style Dictionary + custom token guards | Emit CSS vars; fail CI on bad aliases / forbidden paths | Schema-only CI (can’t resolve `{aliases}`); hand-maintained CSS vars |
| Generate-on-build theme (`:root` / `.dark` / `@theme`) | One source of truth; Tailwind utilities from CSS vars | Committing generated CSS; hand-maintained `@theme` |

ADRs: [0001](./docs/decisions/0001-turborepo-pnpm-monorepo.md), [0002](./docs/decisions/0002-compose-postgres-env-contract.md), [0003 — token pipeline](./docs/decisions/0003-token-pipeline.md), [0004 — theme CSS emit](./docs/decisions/0004-theme-css-emit.md), [0005 — Drizzle resources migration](./docs/decisions/0005-drizzle-resources-migration.md), [0006 — Nest local file store](./docs/decisions/0006-nest-local-file-store.md), [0007 — Compose full stack](./docs/decisions/0007-compose-full-stack.md). The [Decisions index](./docs/decisions/) lists only ADRs that shipped with code.

Working hypothesis (not locked): shadcn-svelte `new-york`, `baseColor` `neutral` — see `packages/ui/components.json` (`cssVariables: true`) and color/filter notes in [`docs/brand/AUDIT.md`](./docs/brand/AUDIT.md).

## Trade-offs and limitations

- **Library UI as SvelteKit app** — `/ds` and Storybook need a Kit surface; that adds demo-app weight versus a pure component folder.
- **PR gate ≠ full quality matrix** — lint/unit/api/web/storybook/a11y/integration/tokens/audit; product E2E still later.
- **Node 22+** — aligns with current toolchain; older LTS is out of scope.

## Quality evidence

| Check | Command | Expected |
| --- | --- | --- |
| Install | `pnpm install` | Lockfile resolves all `@pack-challenge/*` workspaces |
| PR lint | `pnpm lint` (CI job `lint`) | Workspace lint green |
| PR unit | `pnpm test` (CI job `unit`) | Smoke tests green for web, api, ui, domain (particles under UI) |
| PR api | `pnpm api:test` + API typecheck (CI job `api`) | Nest Resources tests + types green against ephemeral Postgres |
| PR web | `pnpm web:lint` + `pnpm web:test` + `pnpm web:check` (CI job `web`) | SvelteKit Resources page lint/tests/types green |
| PR storybook | `pnpm storybook:build` (CI job `storybook`) | Static Storybook build for `@pack-challenge/ui` |
| PR a11y | `pnpm a11y` (CI job `a11y`) | Axe green for `a11y-gate` stories (atoms+) |
| PR integration | `pnpm integration` (CI job `integration`) | Pages integration Vitest green (TokensReferencePage + gate stub) |
| PR consumer-contract | `pnpm consumer-contract` (CI job `consumer-contract`) | Allowlist + export map + pack/publish dry-run green (SemVer 0.y.z policy in PUBLIC_API.md) |
| PR audit | `pnpm audit` (CI job `audit`) | No high/critical advisories; summary in the job log |
| PR tokens | `pnpm tokens:check` (CI job `tokens`) | Alias/forbidden-path validation + theme CSS emit |
| Daily audit | Actions → **Daily audit** → Run workflow | Same high threshold; visible failure if regressions land |
| UI typecheck/build | `pnpm --filter @pack-challenge/ui build` | `svelte-check` clean |
| Postgres | `docker compose up -d db` | `db` healthcheck **healthy** |
| Resources migrate | `pnpm --filter @pack-challenge/api db:migrate` | `resources` table + enums apply (idempotent) |
| API unit | `pnpm api:test` | Nest create/list/search/download + storage tests green |

## Lessons learned

- Locking the monorepo (and writing the ADR) in the **same** seed PR avoids “layout drift” before the first feature lands.
- Exporting `@pack-challenge/ui` from `src` (workspace-friendly) beats forcing a publish/`dist` step on every smoke run for a private package.
- Storybook init pulls a heavy Vitest-browser path; keeping `pnpm test` on a **server** project keeps the foundation gate fast.

## Next steps

1. Wire upload dialog → `POST /resources` (#76) if still open.
2. Mark PR gate jobs **`api`** and **`web`** required on `main` branch protection (if not already).
