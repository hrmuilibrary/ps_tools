import type { HTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  variant?: CardVariant;
  padding?: CardPadding;
  /** Renders a top slot inside the card, separated by a subtle divider. */
  header?: ReactNode;
  /** Renders a bottom slot inside the card, separated by a subtle divider. */
  footer?: ReactNode;
  /** When true, the whole card reacts to hover (border highlight + raised shadow). */
  interactive?: boolean;
}
