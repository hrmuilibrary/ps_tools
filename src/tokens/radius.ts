/**
 * Border radii, mirrored as `--radius-*` in src/styles/tokens.css. Ported
 * from the People Space design system (packages/design-system/src/tokens/radii.css)
 * as a fixed step scale rather than a single calc()-derived base value.
 */
export const radius = {
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const;
