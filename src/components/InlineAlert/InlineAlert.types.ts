import type { HTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type InlineAlertVariant = 'success' | 'warning' | 'danger' | 'info' | 'discovery';

export interface InlineAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, BaseProps {
  variant?: InlineAlertVariant;
  /** Overrides the native `title` (tooltip) attribute — rendered as the alert's heading. */
  title?: ReactNode;
  description?: ReactNode;
  /** Renders a trailing dismiss button that calls this on click. */
  onDismiss?: () => void;
  /** Extra content (typically buttons) rendered below the description. */
  actions?: ReactNode;
  /** Overrides the variant's default icon. */
  icon?: ReactNode;
}
