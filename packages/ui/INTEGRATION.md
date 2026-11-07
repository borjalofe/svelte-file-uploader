# Pages integration CI gate

Issue: #57  
Runner: Vitest project **`integration`** (jsdom + Svelte), scoped to `packages/ui/src/components/pages/**/*.integration.{test,spec}.{js,ts}`.

## Commands

```bash
# Local / CI
pnpm integration
```

CI job **`integration`** (`.github/workflows/pr-gate.yml`) runs the same script and should be **required** on `main`.

## How page specs join the gate

1. Co-locate `*.integration.spec.ts` under `packages/ui/src/components/pages/<name>/`.
2. Keep unit/a11y stories separate (`*.spec.ts` / `*.a11y.spec.ts` / Storybook) as each page issue requires.
3. A failing integration assertion fails the `integration` job (the stub in `pages.integration.spec.ts` proves the wire; page specs mount composition).

## Smoke

```bash
pnpm integration
```
