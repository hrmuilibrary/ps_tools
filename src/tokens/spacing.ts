/**
 * Component-level sizing tokens (control heights, icon sizes).
 * General layout spacing intentionally reuses Tailwind's default 4px scale
 * rather than redefining it here — same convention as the People Space
 * design system (packages/design-system/src/tokens/spacing.css), which
 * documents an 8px rhythm (p-2, p-4, p-6, p-8...) on top of that scale
 * without overriding any token.
 */
export const controlHeight = {
  sm: '2rem',
  md: '2.5rem',
  lg: '3rem',
} as const;

export const iconSize = {
  sm: '0.875rem',
  md: '1rem',
  lg: '1.25rem',
} as const;
