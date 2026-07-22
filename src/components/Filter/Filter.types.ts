import type { HTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type FilterSize = 'lg' | 'md' | 'sm';

export interface FilterProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Trigger label, always visible. */
  label: ReactNode;
  /** Selected value rendered after the label, separated by a dot. Its presence (even `""`) marks the filter as active. */
  value?: ReactNode;
  /** Forces the active (selected) visual style regardless of `value`. */
  active?: boolean;
  size?: FilterSize;
  disabled?: boolean;
  /** Called when the clear (×) affordance is activated. Only rendered when the filter is active. */
  onClear?: () => void;
  /** Popover content shown below the trigger while open. */
  children?: ReactNode;
}
