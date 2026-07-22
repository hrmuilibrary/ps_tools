import type { HTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'privacy';
export type BadgeStyle = 'filled' | 'outline' | 'accent';
export type BadgeSize = 'lg' | 'md' | 'sm' | 'xs';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BaseProps {
  variant?: BadgeVariant;
  appearance?: BadgeStyle;
  size?: BadgeSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Renders a trailing dismiss button (replacing `rightIcon`) that calls this on click. */
  onDismiss?: () => void;
}
