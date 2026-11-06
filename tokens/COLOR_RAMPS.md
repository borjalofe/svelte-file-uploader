# Primitive color ramps — generation method

Issue: #14  
Anchors: [`docs/brand/AUDIT.md`](../docs/brand/AUDIT.md) (non-dimmed samples only)

## Method

1. Convert audited hex to **OKLCH** (via OKLab).
2. Build stops `50 … 950` by varying **lightness** while keeping brand **hue** (and a tapered chroma) from the brand anchor.
3. Pin exact audited hex on named stops (no re-rounding):
   - `primitive.color.brand.500` → `#FC8034`
   - `primitive.color.neutral.50` → `#F9FAFC`
   - `primitive.color.neutral.600` → `#5C5C5C`
4. Mark every non-pinned stop **`Provisional`** in `$description` until brand sign-off expands sampled evidence.
5. Keep `white` / `black` as absolute `#ffffff` / `#000000`.

## Non-goals

- Overlay-dimmed oranges from modal screenshots as anchors
- Components importing `primitive.*` (semantic/extension only)
- Inventing a full marketing palette beyond these ramps

## Verify

```bash
pnpm tokens:check
pnpm --filter @pack-challenge/tokens test
```
