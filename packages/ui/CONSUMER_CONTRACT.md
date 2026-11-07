# Consumer contract CI gate

Issues: #62, #63  
Package: `@pack-challenge/ui`

Runner: `pnpm consumer-contract` → `packages/ui` script `check:consumer-contract` (`scripts/check-consumer-contract.mjs`).

Public API / SemVer policy: [`PUBLIC_API.md`](./PUBLIC_API.md).

## What it checks

1. **Public allowlist** — root export names in `src/lib/index.ts` match `public-exports.allowlist.json`; `exports` map is root-only.
2. **Export map** — every file path in `package.json` `exports` exists on disk.
3. **Pack dry-run** — `pnpm pack --dry-run --json` includes those export targets (broken / omitted paths fail).
4. **Publish dry-run** — `pnpm publish --dry-run --no-git-checks` succeeds (no registry write).

## Commands

```bash
# Local / CI
pnpm consumer-contract
```

CI job **`consumer-contract`** (`.github/workflows/pr-gate.yml`) runs the same script and should be **required** on `main`.

## Smoke

```bash
pnpm consumer-contract
# → export map + publish dry-run OK
```

A missing export target (deleted or mistyped path) must fail the job.
