import type { InputHTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type InputSize = 'lg' | 'md' | 'sm';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseProps {
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  size?: InputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  error?: boolean;
  wrapperClassName?: string;
}
