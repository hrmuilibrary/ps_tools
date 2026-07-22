import type { InputHTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type CheckboxSize = 'md' | 'sm';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    BaseProps {
  size?: CheckboxSize;
  label?: ReactNode;
  description?: ReactNode;
  /** Renders the mixed/"some selected" visual state (`aria-checked="mixed"`). */
  indeterminate?: boolean;
  error?: boolean;
}
