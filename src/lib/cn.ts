import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names, resolving conflicting Tailwind utilities in favor of
 * the last one specified (e.g. `cn('px-2', 'px-4')` -> `'px-4'`). This is
 * what lets consumers pass a `className` prop that overrides a component's
 * defaults instead of just appending to them.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
