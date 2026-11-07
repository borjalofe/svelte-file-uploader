# `@pack-challenge/ui` public API + SemVer 0.y.z

Issue: #63

## Public surface

Consumers must import only from the package root:

```ts
import { Button, ResourcesCatalogPage } from '@pack-challenge/ui';
```

- **`package.json` `exports`** exposes only `"."` → `src/lib/index.ts` (`types` / `svelte` / `default`).
- Deep paths (`@pack-challenge/ui/src/...`, helpers not re-exported from `index.ts`) are **not** part of the contract.
- The allowlist `src/lib/public-exports.allowlist.json` is the checked inventory of root export names. Drift fails `pnpm exports:check`.

## Preprod SemVer policy (`0.y.z`)

Until a stable 1.0.0:

| Change                                             | Version bump                                             |
| -------------------------------------------------- | -------------------------------------------------------- |
| Breaking public API / token contract for consumers | **`0.y.0`** (minor)                                      |
| Compatible features / new exports                  | **`0.y.z`** (patch) or minor if preferred for visibility |
| Bugfixes                                           | **`0.y.z`** (patch)                                      |

Rules:

1. **`0.y.z` is intentional** — minor bumps may break consumers; document in the PR / changelog.
2. Workspace version may stay `0.0.0` until the preprod tag task (`@pack-challenge/ui@0.1.0`).
3. Do not publish `1.x` until the public surface is declared stable.
4. New root exports require an allowlist update in the **same** PR.

## Commands

```bash
# Allowlist ↔ index.ts + root-only exports map
pnpm exports:check

# Regenerate allowlist after intentional API changes
pnpm --filter @pack-challenge/ui exports:write

# Publish dry-run (private package skips registry upload)
pnpm --filter @pack-challenge/ui publish:dry-run
```

CI job **`consumer-contract`** (`.github/workflows/pr-gate.yml`) runs allowlist + pack/publish dry-run via `pnpm consumer-contract` and should be required on `main` — see [`CONSUMER_CONTRACT.md`](./CONSUMER_CONTRACT.md).
