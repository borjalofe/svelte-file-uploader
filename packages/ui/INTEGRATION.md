# Pages integration CI gate

Issue: #57  
Runner: Vitest project **`integration`** (node), scoped to `packages/ui/src/components/pages/**/*.integration.{test,spec}.{js,ts}`.

## Commands

```bash
# Local / CI
pnpm integration
```

CI job **`integration`** (`.github/workflows/pr-gate.yml`) runs the same script and should be **required** on `main`.

## How page specs join the gate

1. Co-locate `*.integration.spec.ts` under `packages/ui/src/components/pages/<name>/`.
2. Specs must stay **node-safe** (no `.svelte` imports / DOM mounts). Assert page contracts, catalogs, and style helpers in plain TypeScript.
3. Keep mount/axe coverage in `*.a11y.spec.ts` + Storybook `a11y-gate` as each page issue requires.
4. A failing integration assertion fails the `integration` job (the stub in `pages.integration.spec.ts` proves the wire).

## Smoke

```bash
pnpm integration
```
