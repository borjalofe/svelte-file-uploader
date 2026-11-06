/**
 * Guardrails for Pack token tree (enforced in CI before Style Dictionary emit).
 * Paths are dotted token paths (e.g. semantic.color.text.primary).
 */

const FORBIDDEN_SEMANTIC_PATH_PATTERNS: RegExp[] = [
  /(^|\.)color\.text(\.|$)/,
  /(^|\.)color\.action(\.|$)/,
  /(^|\.)color\.surface\.elevated(\.|$)/,
  /(^|\.)color\.focus(\.|$)/
];

/** Primitive radius must be a single source — no sm|md|lg scale. */
const FORBIDDEN_PRIMITIVE_RADIUS = /(^|\.)radius\.(sm|md|lg)(\.|$)/;

export function forbiddenPathReason(tokenPath: string): string | null {
  const normalized = tokenPath.replace(/\//g, '.');

  for (const pattern of FORBIDDEN_SEMANTIC_PATH_PATTERNS) {
    if (pattern.test(normalized)) {
      return `forbidden semantic path "${normalized}" (no color.text|action|surface.elevated|focus)`;
    }
  }

  if (FORBIDDEN_PRIMITIVE_RADIUS.test(normalized)) {
    return `forbidden primitive radius scale "${normalized}" (use a single radius source; no radius.sm|md|lg)`;
  }

  return null;
}
