/**
 * Typography tokens, mirrored as `--text-*` / `--font-*` in
 * src/styles/tokens.css. Ported from the People Space design system
 * (packages/design-system/src/tokens/typography.css). Sizes are paired
 * with their line-height; weight is composed separately via Tailwind's
 * default `font-*` utilities.
 */
export const fontFamily = {
  ps: ['Noto Sans Armenian', 'Noto Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  sans: ['Noto Sans Armenian', 'Noto Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
} as const;

export const headline = {
  xl: { fontSize: '64px', lineHeight: '72px' },
  lg: { fontSize: '48px', lineHeight: '56px' },
  md: { fontSize: '40px', lineHeight: '48px' },
  std: { fontSize: '36px', lineHeight: '44px' },
  sm: { fontSize: '32px', lineHeight: '40px' },
  xs: { fontSize: '24px', lineHeight: '32px' },
} as const;

export const paragraph = {
  lg: { fontSize: '20px', lineHeight: '28px' },
  md: { fontSize: '16px', lineHeight: '24px' },
  std: { fontSize: '14px', lineHeight: '20px' },
  sm: { fontSize: '12px', lineHeight: '16px' },
  xs: { fontSize: '10px', lineHeight: '14px' },
} as const;

export const label = {
  lg: { fontSize: '20px', lineHeight: '28px' },
  md: { fontSize: '16px', lineHeight: '24px' },
  std: { fontSize: '14px', lineHeight: '20px' },
  sm: { fontSize: '12px', lineHeight: '16px' },
  xs: { fontSize: '10px', lineHeight: '14px' },
  xxs: { fontSize: '6px', lineHeight: '6px' },
} as const;

export const typography = { headline, paragraph, label } as const;
