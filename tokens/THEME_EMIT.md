# Theme emit — `:root` / `.dark` / `@theme inline`

Issue: #18

## Strategy

- **Generate on build** (do not commit `packages/tokens/dist/`). `pnpm tokens:build` → `packages/tokens/dist/theme.css`.
- Custom Style Dictionary format `css/pack-theme`:
  1. `:root` — all tokens (primitives long names + semantic/extension short names)
  2. `.dark` — same short semantic/extension **colors** (light-only product look; no separate dark palette yet)
  3. `@theme inline` — `--color-{name}: var(--{name})` for those colors, plus `--radius` / `--font-sans` / `--font-mono`
- UI imports the generated file after Tailwind so utilities like `bg-primary` resolve.

## Consumers

| Surface | How |
| --- | --- |
| `@pack-challenge/ui` `layout.css` | `@import '@pack-challenge/tokens/theme.css'` + `@source '../'` |
| `@pack-challenge/web` `layout.css` | same theme import + `@source` → `packages/ui/src` (Tailwind v4 does not scan workspace UI otherwise) |
| Storybook | preview imports `layout.css`; Theme story uses `bg-primary` |

Also via `@theme inline`:

| Token | Tailwind |
| --- | --- |
| Semantic / extension colors | `--color-*` → `bg-primary`, `bg-success`, `border-info`, … |
| Semantic space | `--spacing-*` → `gap-4`, `p-4`, … |
| `primitive.shadow.soft` | `--shadow-soft` → `shadow-soft` (modal / toast elevation) |

## Guardrails

- Components use semantic/extension utilities (`bg-primary`, `text-muted-foreground`, …) — **no raw hex** in component styles.
- Run `pnpm tokens:build` (or `tokens:check`) before Storybook / UI lint/dev if `dist/theme.css` is missing (Prettier resolves the package export).

## Verify

```bash
pnpm tokens:check
pnpm --filter @pack-challenge/tokens test
pnpm --filter @pack-challenge/ui storybook
```
