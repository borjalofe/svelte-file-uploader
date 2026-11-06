# Extension status colors

Issue: #17  
Toast / alerts can use these without raw hex (`bg-success`, `text-success-foreground`, … once `@theme` is wired).

| Token path | CSS variable | Tailwind (via `@theme`) | Value | Notes |
| --- | --- | --- | --- | --- |
| `extension.color.success` | `--success` | `bg-success` / `text-success` | `#1C9C70` | Audited Pack toast green |
| `extension.color.success-foreground` | `--success-foreground` | `text-success-foreground` | `primitive.color.black` | AA ≈ 6.0:1 |
| `extension.color.warning` | `--warning` | `bg-warning` | `#D97706` | Provisional |
| `extension.color.warning-foreground` | `--warning-foreground` | `text-warning-foreground` | black | Provisional |
| `extension.color.info` | `--info` | `bg-info` | `#2563EB` | Provisional |
| `extension.color.info-foreground` | `--info-foreground` | `text-info-foreground` | white | AA ≈ 5.2:1 |

Emit registers variables on `:root`, mirrors them on `.dark` (light-only product look for now), and maps `--color-*` in `@theme inline`.

## Verify

```bash
pnpm tokens:check
rg -- '--success' packages/tokens/dist/theme.css
```
