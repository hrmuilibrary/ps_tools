import type { ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type DatePickerSize = 'lg' | 'md' | 'sm';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DatePickerProps extends BaseProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  /** Enable range-selection mode. */
  range?: boolean;
  rangeValue?: DateRange;
  onChangeRange?: (range: DateRange) => void;
  size?: DatePickerSize;
  label?: ReactNode;
  placeholder?: string;
  /** Fill the parent's width (like Input/Select) instead of the intrinsic
   *  min-width. Use inside form grids so dates line up with other fields. */
  fullWidth?: boolean;
  id?: string;
  className?: string;
  wrapperClassName?: string;
}
