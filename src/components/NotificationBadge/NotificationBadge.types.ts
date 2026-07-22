import type { HTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type NotificationBadgeSize = 'lg' | 'sm';
export type NotificationBadgeVariant = 'brand' | 'danger' | 'success' | 'warning' | 'info';
export type NotificationBadgeKind = 'count' | 'dot';

export interface NotificationBadgeProps extends HTMLAttributes<HTMLSpanElement>, BaseProps {
  count?: number;
  max?: number;
  kind?: NotificationBadgeKind;
  size?: NotificationBadgeSize;
  variant?: NotificationBadgeVariant;
  /** Element the badge overlays. Omit to render the badge as a standalone element. */
  children?: ReactNode;
  showZero?: boolean;
}
