import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { buildTheme, cssVariableName, isThemeSpaceToken } from './build.js';
import { loadTokenFiles } from './load-tokens.js';
import { themeCssPath, tokensDir } from './paths.js';
import { validateTokensDir } from './validate.js';

describe('semantic space scale (#21)', () => {
  it('aliases primitive.space.* and validates', () => {
    const { tree } = loadTokenFiles(tokensDir);
    const space = (tree.semantic as { space: Record<string, { $value: string }> }).space;
    expect(space['4']!.$value).toBe('{primitive.space.4}');
    expect(space['0']!.$value).toBe('{primitive.space.0}');
    expect(validateTokensDir().ok).toBe(true);
  });

  it('maps paths to --space-* and flags theme spacing tokens', () => {
    expect(cssVariableName(['semantic', 'space', '4'])).toBe('space-4');
    expect(isThemeSpaceToken(['semantic', 'space', '4'])).toBe(true);
    expect(isThemeSpaceToken(['primitive', 'space', '4'])).toBe(false);
  });

  it('emits --space-4 and @theme --spacing-4', async () => {
    await buildTheme();
    const css = fs.readFileSync(themeCssPath, 'utf8');
    expect(css).toMatch(/--space-4:\s*var\(--primitive-space-4\)/);
    expect(css).toMatch(/--spacing-4:\s*var\(--space-4\)/);
  });
});
