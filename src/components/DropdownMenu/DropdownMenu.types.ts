import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type DropdownContentAlign = 'start' | 'end';

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  children: ReactNode;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Controlled open state. Pass alongside `onOpenChange` to fully control the menu. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface DropdownTriggerProps {
  /** A single element cloned with the click handler and `aria-haspopup`/`aria-expanded` that open the menu. */
  children: ReactElement;
}

export interface DropdownContentProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  children: ReactNode;
  /** Horizontal alignment of the panel relative to the trigger. */
  align?: DropdownContentAlign;
}

export interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  children: ReactNode;
  /** Called on click, after any native `onClick`, then closes the menu. */
  onSelect?: () => void;
  icon?: ReactNode;
  /** Trailing hint text, e.g. a keyboard shortcut. */
  shortcut?: ReactNode;
  /** Renders the item in the danger palette for destructive actions. */
  destructive?: boolean;
  /** Renders a leading check mark when `true`; reserves the space (unchecked) when `false`. Omit entirely for items with no check state. */
  checked?: boolean;
}

export interface DropdownSeparatorProps extends HTMLAttributes<HTMLDivElement>, BaseProps {}

export interface DropdownLabelProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  children: ReactNode;
}
