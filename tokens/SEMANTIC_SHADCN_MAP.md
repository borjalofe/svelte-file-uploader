# Semantic → shadcn CSS variables → Tailwind

Issue: #16  
Style: shadcn-svelte **new-york** / `baseColor` **neutral** (`packages/ui/components.json`)

Emit: `pnpm tokens:build` writes `packages/tokens/dist/theme.css` via `css/pack-theme` — `:root` (all tokens), `.dark` (short colors, light-aliased), `@theme inline` (`--color-primary` → `bg-primary`, …). Semantic tokens use short names; primitives keep long names. See [`THEME_EMIT.md`](./THEME_EMIT.md).

## Colors (`semantic.color.*` → `--*` → utilities)

| Token path | CSS variable | Tailwind (examples) | Source |
| --- | --- | --- | --- |
| `semantic.color.background` | `--background` | `bg-background` | `primitive.color.neutral.50` (`#F9FAFC`) |
| `semantic.color.foreground` | `--foreground` | `text-foreground` | `primitive.color.black` |
| `semantic.color.card` | `--card` | `bg-card` | `primitive.color.white` |
| `semantic.color.card-foreground` | `--card-foreground` | `text-card-foreground` | `primitive.color.black` |
| `semantic.color.popover` | `--popover` | `bg-popover` | `primitive.color.white` |
| `semantic.color.popover-foreground` | `--popover-foreground` | `text-popover-foreground` | `primitive.color.black` |
| `semantic.color.primary` | `--primary` | `bg-primary` | `primitive.color.brand.500` (`#FC8034`) |
| `semantic.color.primary-foreground` | `--primary-foreground` | `text-primary-foreground` | `primitive.color.black` (AA ≈ **8.3:1** on primary; white fails AA) |
| `semantic.color.secondary` | `--secondary` | `bg-secondary` | `primitive.color.neutral.100` |
| `semantic.color.secondary-foreground` | `--secondary-foreground` | `text-secondary-foreground` | `primitive.color.neutral.900` |
| `semantic.color.muted` | `--muted` | `bg-muted` | `primitive.color.neutral.100` |
| `semantic.color.muted-foreground` | `--muted-foreground` | `text-muted-foreground` | `primitive.color.neutral.600` (`#5C5C5C`) |
| `semantic.color.accent` | `--accent` | `bg-accent` | `primitive.color.brand.100` (provisional) |
| `semantic.color.accent-foreground` | `--accent-foreground` | `text-accent-foreground` | `primitive.color.neutral.900` |
| `semantic.color.destructive` | `--destructive` | `bg-destructive` | `#DC2626` provisional (AA ≈ **4.8:1** w/ white) |
| `semantic.color.destructive-foreground` | `--destructive-foreground` | `text-destructive-foreground` | `primitive.color.white` |
| `semantic.color.border` | `--border` | `border-border` | `primitive.color.neutral.200` |
| `semantic.color.input` | `--input` | `border-input` | `primitive.color.neutral.200` |
| `semantic.color.ring` | `--ring` | `ring-ring` | `primitive.color.brand.500` |

### Forbidden semantic color paths (CI)

Do **not** author: `color.text.*`, `color.action.*`, `color.surface.elevated`, `color.focus` — use shadcn names above (`foreground`, `primary`, `card`, `ring`, …).

## Radius

| Token path | CSS variable | Tailwind | Source |
| --- | --- | --- | --- |
| `semantic.radius` | `--radius` | `rounded-[var(--radius)]` / shadcn radius utils | `primitive.radius.default` |

## Fonts

| Token path | CSS variable | Tailwind | Source |
| --- | --- | --- | --- |
| `semantic.font.sans` | `--font-sans` | `font-sans` | `primitive.fontFamily.sans` (provisional) |
| `semantic.font.mono` | `--font-mono` | `font-mono` | `primitive.fontFamily.mono` (provisional) |

## Contrast (WCAG AA)

| Pair | Ratio | Result |
| --- | --- | --- |
| `#FC8034` / `#000000` (primary / primary-foreground) | ≈ 8.3:1 | Pass |
| `#FC8034` / `#FFFFFF` | ≈ 2.5:1 | Fail — not used as primary-foreground |
| `#DC2626` / `#FFFFFF` (destructive / destructive-foreground) | ≈ 4.8:1 | Pass |

## Verify

```bash
pnpm tokens:check
pnpm --filter @pack-challenge/tokens test
```
