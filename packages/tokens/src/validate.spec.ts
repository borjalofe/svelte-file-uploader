import { describe, expect, it } from 'vitest';
import { forbiddenPathReason } from './forbidden.js';
import { validateTokenTree } from './validate.js';

describe('forbidden paths', () => {
  it('rejects semantic color.text / action / surface.elevated / focus', () => {
    expect(forbiddenPathReason('semantic.color.text.primary')).toMatch(/forbidden semantic/);
    expect(forbiddenPathReason('semantic.color.action.primary')).toMatch(/forbidden semantic/);
    expect(forbiddenPathReason('semantic.color.surface.elevated')).toMatch(/forbidden semantic/);
    expect(forbiddenPathReason('semantic.color.focus')).toMatch(/forbidden semantic/);
  });

  it('rejects primitive radius.sm|md|lg', () => {
    expect(forbiddenPathReason('primitive.radius.sm')).toMatch(/radius/);
    expect(forbiddenPathReason('primitive.radius.md')).toMatch(/radius/);
    expect(forbiddenPathReason('primitive.radius.lg')).toMatch(/radius/);
  });

  it('allows a single radius source and shadcn-like semantic colors', () => {
    expect(forbiddenPathReason('primitive.radius.default')).toBeNull();
    expect(forbiddenPathReason('semantic.color.primary')).toBeNull();
  });
});

describe('alias validation', () => {
  it('fails on invalid alias targets', () => {
    const result = validateTokenTree({
      primitive: {
        color: {
          white: { $type: 'color', $value: '#ffffff' }
        }
      },
      semantic: {
        color: {
          background: { $type: 'color', $value: '{primitive.color.missing}' }
        }
      }
    });

    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes('invalid alias'))).toBe(true);
  });

  it('fails on cyclic aliases', () => {
    const result = validateTokenTree({
      a: { $value: '{b}' },
      b: { $value: '{a}' }
    });

    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes('cyclic'))).toBe(true);
  });

  it('accepts a valid alias chain', () => {
    const result = validateTokenTree({
      primitive: {
        color: {
          white: { $type: 'color', $value: '#ffffff' }
        }
      },
      semantic: {
        color: {
          background: { $type: 'color', $value: '{primitive.color.white}' }
        }
      }
    });

    expect(result.ok).toBe(true);
  });
});
