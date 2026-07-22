import type { ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type MultiSelectSize = 'sm' | 'md' | 'lg';

export interface MultiSelectOption {
  value: string;
  label: string;
  /** Optional second line under the label in the dropdown. */
  description?: string;
  /** Optional avatar image — shown on the chip and the dropdown row. */
  avatarSrc?: string;
  /** Non-selectable option (shown dimmed in the list). */
  disabled?: boolean;
  /** Small tag rendered on the chip, e.g. "You". */
  badge?: ReactNode;
}

export interface MultiSelectProps extends BaseProps {
  options: MultiSelectOption[];
  /** Selected option values (controlled). */
  value: string[];
  onChange: (values: string[]) => void;
  size?: MultiSelectSize;
  placeholder?: string;
  /** Placeholder once at least one chip exists. Defaults to "Add another…". */
  addMorePlaceholder?: string;
  disabled?: boolean;
  error?: boolean;
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  required?: boolean;
  /** Values whose chips can't be removed. */
  lockedValues?: string[];
  /** Cap on how many can be selected (default: unlimited). */
  max?: number;
  /** Set false for a click-to-open picker with no text filter. */
  searchable?: boolean;
  /** Dropdown header shown when the query is empty. */
  suggestionsLabel?: string;
  /** Message shown when nothing matches. */
  emptyText?: string;
  id?: string;
  className?: string;
  wrapperClassName?: string;
}
