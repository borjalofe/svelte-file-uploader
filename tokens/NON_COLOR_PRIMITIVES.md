# Non-color primitives — authoring notes

Issue: #15  
Related: [`docs/brand/AUDIT.md`](../docs/brand/AUDIT.md) open questions (font, shadow, motion)

## Contents

| File | Tokens | Notes |
| --- | --- | --- |
| `primitive/space.json` | `space.0…16` | rem scale (4px base); provisional density |
| `primitive/font.json` | `fontFamily`, `fontSize`, `fontWeight`, `lineHeight` | **Provisional** `ui-sans-serif` / `system-ui` until font/logo review |
| `primitive/radius.json` | `radius.default` only | **No** `radius.sm\|md\|lg` (CI forbidden) |
| `primitive/shadow.json` | `shadow.soft` | Provisional product lock: `0 4px 16px 0 #00000026` → `@theme --shadow-soft` / `shadow-soft` (modal + toast). Not measurable from PNGs — replace on brand sign-off |
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
