import type { HTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types';

export interface UploadProps
  extends Omit<
      HTMLAttributes<HTMLDivElement>,
      'onClick' | 'onDrop' | 'onDragOver' | 'onDragLeave' | 'onKeyDown' | 'role' | 'tabIndex' | 'aria-disabled'
    >,
    BaseProps {
  /** Forwarded to the hidden native `<input type="file">`, e.g. `"image/png,image/jpeg"`. */
  accept?: string;
  multiple?: boolean;
  /** Shown in the default hint text (e.g. "PNG, up to 10 MB"); purely informational, not enforced. */
  maxSizeMB?: number;
  /** Overrides the auto-generated hint derived from `accept`/`maxSizeMB`. */
  hint?: ReactNode;
  onFiles?: (files: File[]) => void;
  disabled?: boolean;
}

export type UploadItemStatus = 'processing' | 'completed' | 'error';

export interface UploadItemProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  name: ReactNode;
  meta?: ReactNode;
  status?: UploadItemStatus;
  /** 0-100, only rendered while `status="processing"`. */
  progress?: number;
  errorText?: ReactNode;
  onRetry?: () => void;
  onRemove?: () => void;
}
