# Non-color primitives — authoring notes

Issue: #15  
Related: [`docs/brand/AUDIT.md`](../docs/brand/AUDIT.md) open questions (font, shadow, motion)

## Contents

| File | Tokens | Notes |
| --- | --- | --- |
| `primitive/space.json` | `space.0…16` | rem scale (4px base); provisional density |
| `primitive/font.json` | `fontFamily`, `fontSize`, `fontWeight`, `lineHeight` | **Provisional** `ui-sans-serif` / `system-ui` until font/logo review |
| `primitive/radius.json` | `radius.default` only | **No** `radius.sm\|md\|lg` (CI forbidden) |
| `primitive/shadow.json` | `shadow.soft` | Optional; recipe not measurable from PNGs |
| `primitive/motion.json` | `duration.*`, `easing.*` | Provisional |

## Rules

- Single radius source: `primitive.radius.default`
- Font stacks must stay labeled provisional until brand type/logo sign-off
- Components consume semantic tokens later — not raw primitives

## Verify

```bash
pnpm tokens:check
pnpm --filter @pack-challenge/tokens test
```
