import type { HTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type PersonCardVariant = 'default' | 'highlight' | 'warning';
export type PersonCardSize = 'sm' | 'md';

export interface PersonCardProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  name: string;
  role?: string;
  avatar?: string;
  /** Visual treatment.
   *  - default: neutral border
   *  - highlight: brand-green tint + border (use for "you" / current user / featured)
   *  - warning: amber border + small status dot (use for "needs attention")
   */
  variant?: PersonCardVariant;
  size?: PersonCardSize;
  /** Optional badge rendered inline at the end of the row (e.g. "YOU"). */
  badge?: ReactNode;
  /** If set, renders as a button so it's clickable. */
  onClick?: () => void;
}
