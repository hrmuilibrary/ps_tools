/**
 * Elevation scale, mirrored as `--shadow-z*` in src/styles/tokens.css.
 * Ported from the People Space design system
 * (packages/design-system/src/tokens/shadows.css) — z4 verified from
 * Figma, others interpolated.
 */
export const shadows = {
  z1: '0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  z2: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
  z3: '0 4px 8px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
  z4: '0 1px 4px 0 rgba(0, 0, 0, 0.12), 0 12px 16px 0 rgba(0, 0, 0, 0.10), 0 3px 5px 0 rgba(0, 0, 0, 0.12)',
  z5: '0 8px 16px 0 rgba(0, 0, 0, 0.12), 0 24px 32px 0 rgba(0, 0, 0, 0.12)',
} as const;
