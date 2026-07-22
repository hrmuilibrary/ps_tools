import type { ReactNode } from 'react';
import type { BaseProps } from '../../types';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ModalProps extends BaseProps {
  /** Whether the modal is mounted and visible. Nothing renders (not even to the portal) when false. */
  open: boolean;
  /** Called when the user presses Escape, clicks the overlay (if enabled), or clicks the close button. */
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Rendered in a bordered footer row, right-aligned — typically action buttons. */
  footer?: ReactNode;
  size?: ModalSize;
  /** Close the modal when the backdrop is clicked. Defaults to `true`. */
  closeOnOverlayClick?: boolean;
  /** Show the close (X) button in the header. Defaults to `true`. */
  showClose?: boolean;
  /** Merged with the panel's own classes via `cn()` — last conflicting utility wins. */
  className?: string;
}
