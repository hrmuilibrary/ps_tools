import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type TabsVariant = 'underline' | 'pills' | 'boxed';
export type TabsSize = 'lg' | 'md' | 'sm';

export interface TabsProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Uncontrolled initial active tab value. Falls back to the first `<Tab>`'s value if omitted. */
  defaultValue?: string;
  /** Controlled active tab value. Pass alongside `onValueChange` to fully control which tab is active. */
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement>, BaseProps {}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  /** Unique identifier matched against the parent `Tabs`'s active value. */
  value: string;
  icon?: ReactNode;
  /** Count/indicator rendered after the label. Hidden when `undefined`, `null`, or `false`. */
  badge?: ReactNode;
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Matched against the parent `Tabs`'s active value; renders nothing (unmounted) when not active. */
  value: string;
}
