import type { ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type SnackbarVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

/**
 * A single toast entry. `dataTestId` is optional per-toast so callers can
 * tag a specific `show()` call for e2e selection (there's no other prop
 * surface to hang a QA hook off — the toast itself is never a
 * consumer-authored JSX element, just a data object passed to `show()`).
 */
export interface SnackbarItem extends BaseProps {
  id: string;
  message: ReactNode;
  variant?: SnackbarVariant;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

export interface SnackbarContextValue {
  show: (item: Omit<SnackbarItem, 'id'> & { id?: string }) => string;
  dismiss: (id: string) => void;
}

export interface SnackbarProviderProps extends BaseProps {
  children: ReactNode;
}
