import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadTokenFiles } from './load-tokens.js';
import { tokensDir } from './paths.js';
import { validateTokensDir } from './validate.js';

describe('primitive color ramps (#14)', () => {
  it('pins audited brand and neutral anchors', () => {
    const { tree } = loadTokenFiles(tokensDir);
    const brand = tree.primitive as Record<string, unknown>;
    const color = (brand.color as Record<string, unknown>).brand as Record<
      string,
      { $value: string }
    >;
    const neutral = (brand.color as Record<string, unknown>).neutral as Record<
      string,
      { $value: string }
    >;

    expect(color['500']!.$value.toUpperCase()).toBe('#FC8034');
    expect(neutral['50']!.$value.toUpperCase()).toBe('#F9FAFC');
    expect(neutral['600']!.$value.toUpperCase()).toBe('#5C5C5C');
  });

  it('passes token validation / CI contract', () => {
    const result = validateTokensDir();
    expect(result.ok, result.errors.join('\n')).toBe(true);
  });

  it('documents generation method next to sources', () => {
    const doc = path.join(tokensDir, 'COLOR_RAMPS.md');
    expect(fs.existsSync(doc)).toBe(true);
    const text = fs.readFileSync(doc, 'utf8');
    expect(text).toMatch(/OKLCH/i);
    expect(text).toMatch(/#FC8034/i);
  });
});
