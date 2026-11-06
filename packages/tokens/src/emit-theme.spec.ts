import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { buildTheme, isThemeColorToken } from './build.js';
import { themeCssPath } from './paths.js';

describe('emit :root / .dark / @theme inline (#18)', () => {
  it('classifies semantic (and extension) colors for @theme', () => {
    expect(isThemeColorToken(['semantic', 'color', 'primary'])).toBe(true);
    expect(isThemeColorToken(['extension', 'color', 'success'])).toBe(true);
    expect(isThemeColorToken(['primitive', 'color', 'brand', '500'])).toBe(false);
    expect(isThemeColorToken(['semantic', 'radius'])).toBe(false);
  });

  it('emits :root, light-aliased .dark, and @theme --color-primary', async () => {
    await buildTheme();
    const css = fs.readFileSync(themeCssPath, 'utf8');

    expect(css).toMatch(/:root\s*\{/);
    expect(css).toMatch(/\.dark\s*\{/);
    expect(css).toMatch(/@theme inline\s*\{/);
    expect(css).toMatch(/--primary:\s*var\(--primitive-color-brand-500\)/);
    expect(css).toMatch(/--color-primary:\s*var\(--primary\)/);
    expect(css).toMatch(/--color-background:\s*var\(--background\)/);
    expect(css).toMatch(/--radius:\s*var\(--radius\)/);
    expect(css).toMatch(/--font-sans:\s*var\(--font-sans\)/);
    expect(css).toMatch(/Light-only product look/);
  });
});
