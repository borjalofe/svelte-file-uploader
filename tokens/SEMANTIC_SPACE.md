# Semantic spacing scale

Issue: #21 (Stack) — also used by Spacer / layout particles.

| Token path | CSS variable | Tailwind | Source |
| --- | --- | --- | --- |
| `semantic.space.0` | `--space-0` | `gap-0` / `p-0` / … | `primitive.space.0` |
| `semantic.space.1` | `--space-1` | `gap-1` | `primitive.space.1` (4px) |
| `semantic.space.2` | `--space-2` | `gap-2` | `primitive.space.2` (8px) |
| `semantic.space.3` | `--space-3` | `gap-3` | `primitive.space.3` (12px) |
| `semantic.space.4` | `--space-4` | `gap-4` | `primitive.space.4` (16px) |
| `semantic.space.5` | `--space-5` | `gap-5` | `primitive.space.5` (20px) |
| `semantic.space.6` | `--space-6` | `gap-6` | `primitive.space.6` (24px) |
| `semantic.space.8` | `--space-8` | `gap-8` | `primitive.space.8` (32px) |
| `semantic.space.10` | `--space-10` | `gap-10` | `primitive.space.10` (40px) |
| `semantic.space.12` | `--space-12` | `gap-12` | `primitive.space.12` (48px) |
| `semantic.space.16` | `--space-16` | `gap-16` | `primitive.space.16` (64px) |

Emit registers `--spacing-{n}: var(--space-{n})` in `@theme inline` so Tailwind spacing utilities resolve to semantic tokens (no raw rem/px in components).

## Verify

```bash
pnpm tokens:check
rg -- '--space-4|--spacing-4' packages/tokens/dist/theme.css
```
