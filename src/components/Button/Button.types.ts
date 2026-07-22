import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type ButtonSize = 'lg' | 'md' | 'sm';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  iconOnly?: boolean;
  fullWidth?: boolean;
  /** Toggle/active state — renders as pressed and blocks interaction while true. */
  pressed?: boolean;
}
