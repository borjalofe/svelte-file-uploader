import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { collectLeaves, loadTokenFiles } from './load-tokens.js';
import { tokensDir } from './paths.js';
import { validateTokenTree, validateTokensDir } from './validate.js';

describe('non-color primitives (#15)', () => {
  it('exposes a single radius primitive (no sm|md|lg)', () => {
    const { tree } = loadTokenFiles(tokensDir);
    const leaves = collectLeaves(tree).map((l) => l.path);
    const radii = leaves.filter((p) => p.includes('radius'));

    expect(radii).toEqual(['primitive.radius.default']);
    expect(validateTokensDir().ok).toBe(true);
  });

  it('rejects radius.sm|md|lg if introduced', () => {
    const bad = validateTokenTree({
      primitive: {
        radius: {
          sm: { $type: 'dimension', $value: '0.25rem' }
        }
      }
    });
    expect(bad.ok).toBe(false);
    expect(bad.errors.some((e) => e.includes('radius'))).toBe(true);
  });

  it('labels font families as provisional in source + notes', () => {
    const fontFile = path.join(tokensDir, 'primitive/font.json');
    const notes = path.join(tokensDir, 'NON_COLOR_PRIMITIVES.md');
    const fontJson = fs.readFileSync(fontFile, 'utf8');
    const notesText = fs.readFileSync(notes, 'utf8');

    expect(fontJson).toMatch(/Provisional/);
    expect(fontJson).toMatch(/ui-sans-serif/);
    expect(notesText).toMatch(/Provisional/);
    expect(notesText).toMatch(/radius\.default/);
  });
});
