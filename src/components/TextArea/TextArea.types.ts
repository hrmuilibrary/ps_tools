import type { TextareaHTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseProps {
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  error?: boolean;
  wrapperClassName?: string;
  showCount?: boolean;
}
