import type { HTMLAttributes } from 'react';
import type { BaseProps } from '../../types';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  orientation?: ButtonGroupOrientation;
}
