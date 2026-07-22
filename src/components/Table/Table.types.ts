import type { HTMLAttributes, ReactNode, ThHTMLAttributes, TdHTMLAttributes } from 'react';
import type { BaseProps } from '../../types';

export type TableDensity = 'comfortable' | 'compact';
export type SortDir = 'asc' | 'desc' | null;

/** Horizontal alignment shared by `TH`, `TD`, and `TableColumn`. */
export type TableAlign = 'left' | 'center' | 'right';

export interface TableProps extends HTMLAttributes<HTMLTableElement>, BaseProps {
  density?: TableDensity;
  striped?: boolean;
  hoverable?: boolean;
  stickyHeader?: boolean;
  /**
   * Applied to the outer scroll container (border/background/rounding) —
   * `className` is applied to the `<table>` element itself, matching where
   * `ref` and the rest of `HTMLAttributes<HTMLTableElement>` land.
   */
  wrapperClassName?: string;
}

export interface THeadProps extends HTMLAttributes<HTMLTableSectionElement>, BaseProps {}

export interface TBodyProps extends HTMLAttributes<HTMLTableSectionElement>, BaseProps {}

export interface TRProps extends HTMLAttributes<HTMLTableRowElement>, BaseProps {}

export interface THProps extends ThHTMLAttributes<HTMLTableCellElement>, BaseProps {
  sortable?: boolean;
  sortDir?: SortDir;
  onSortChange?: (dir: SortDir) => void;
  align?: TableAlign;
}

export interface TDProps extends TdHTMLAttributes<HTMLTableCellElement>, BaseProps {
  align?: TableAlign;
}

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
  accessor?: (row: T) => ReactNode;
  align?: TableAlign;
  sortable?: boolean;
}

export interface DataTableProps<T> extends BaseProps {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T, i: number) => string;
  empty?: ReactNode;
  density?: TableDensity;
  striped?: boolean;
  hoverable?: boolean;
  sortKey?: string;
  sortDir?: SortDir;
  onSortChange?: (key: string, dir: SortDir) => void;
  onRowClick?: (row: T) => void;
  className?: string;
}
