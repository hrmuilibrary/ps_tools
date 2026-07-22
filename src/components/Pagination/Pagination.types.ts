import type { HTMLAttributes } from 'react';
import type { BaseProps } from '../../types';

export interface PaginationProps extends HTMLAttributes<HTMLElement>, BaseProps {
  /** Current active page, 1-indexed. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Called with the target page number when a page, previous, or next control is activated. */
  onPageChange: (page: number) => void;
  /** How many page numbers to show on each side of the current page. @default 1 */
  siblingCount?: number;
  /** How many page numbers to always show at the start and end of the range. @default 1 */
  boundaryCount?: number;
}
