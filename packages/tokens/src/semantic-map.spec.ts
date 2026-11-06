import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { cssVariableName } from './build.js';
import { collectLeaves, loadTokenFiles } from './load-tokens.js';
import { tokensDir } from './paths.js';
import { validateTokensDir } from './validate.js';

const REQUIRED_COLORS = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring'
] as const;

describe('semantic → shadcn map (#16)', () => {
  it('defines the full core shadcn semantic.color set without forbidden names', () => {
    const { tree } = loadTokenFiles(tokensDir);
    const colors = (tree.semantic as { color: Record<string, unknown> }).color;
    for (const key of REQUIRED_COLORS) {
      expect(colors[key], key).toBeTruthy();
    }

    const paths = collectLeaves(tree).map((l) => l.path);
    expect(paths.some((p) => p.includes('color.text'))).toBe(false);
    expect(paths.some((p) => p.includes('color.action'))).toBe(false);
    expect(paths.some((p) => p.includes('color.surface.elevated'))).toBe(false);
    expect(paths.some((p) => p.includes('color.focus'))).toBe(false);
    expect(validateTokensDir().ok).toBe(true);
  });

  it('maps semantic paths to shadcn CSS variable names', () => {
    expect(cssVariableName(['semantic', 'color', 'primary'])).toBe('primary');
    expect(cssVariableName(['semantic', 'color', 'primary-foreground'])).toBe('primary-foreground');
    expect(cssVariableName(['semantic', 'radius'])).toBe('radius');
    expect(cssVariableName(['semantic', 'font', 'sans'])).toBe('font-sans');
    expect(cssVariableName(['primitive', 'color', 'brand', '500'])).toBe('primitive-color-brand-500');
  });

  it('documents token → css var → Tailwind mapping', () => {
    const doc = path.join(tokensDir, 'SEMANTIC_SHADCN_MAP.md');
    const text = fs.readFileSync(doc, 'utf8');
    expect(text).toMatch(/--primary/);
    expect(text).toMatch(/bg-primary/);
    expect(text).toMatch(/8\.3/);
    expect(text).toMatch(/--radius/);
    expect(text).toMatch(/--font-sans/);
  });

  it('aliases primary to brand.500 and radius to the single primitive', () => {
    const { tree } = loadTokenFiles(tokensDir);
    const primary = (tree.semantic as { color: Record<string, { $value: string }> }).color
      .primary;
    const radius = (tree.semantic as { radius: { $value: string } }).radius;
    expect(primary.$value).toBe('{primitive.color.brand.500}');
    expect(radius.$value).toBe('{primitive.radius.default}');
  });
});
