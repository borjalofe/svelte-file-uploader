import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildTheme, cssVariableName } from './build.js';
import { loadTokenFiles } from './load-tokens.js';
import { themeCssPath, tokensDir } from './paths.js';
import { validateTokensDir } from './validate.js';

describe('extension status colors (#17)', () => {
  it('defines success/warning/info (+ foreground) tokens', () => {
    const { tree } = loadTokenFiles(tokensDir);
    const colors = (tree.extension as { color: Record<string, { $value: string }> }).color;

    expect(colors.success.$value.toUpperCase()).toBe('#1C9C70');
    expect(colors['success-foreground']!.$value).toBe('{primitive.color.black}');
    expect(colors.warning).toBeTruthy();
    expect(colors.info).toBeTruthy();
    expect(validateTokensDir().ok).toBe(true);
  });

  it('maps extension paths to short CSS names', () => {
    expect(cssVariableName(['extension', 'color', 'success'])).toBe('success');
    expect(cssVariableName(['extension', 'color', 'success-foreground'])).toBe(
      'success-foreground'
    );
  });

  it('emits :root, .dark, @theme inline with --success', async () => {
    await buildTheme();
    const css = fs.readFileSync(themeCssPath, 'utf8');
    expect(css).toMatch(/:root\s*\{/);
    expect(css).toMatch(/\.dark\s*\{/);
    expect(css).toMatch(/@theme inline\s*\{/);
    expect(css).toMatch(/--success:\s*#1c9c70/i);
    expect(css).toMatch(/--color-success:\s*var\(--success\)/);
    expect(css).toMatch(/--success-foreground:/);
  });

  it('documents extension status mapping', () => {
    const doc = path.join(tokensDir, 'EXTENSION_STATUS.md');
    expect(fs.readFileSync(doc, 'utf8')).toMatch(/#1C9C70/);
  });
});
