import { forwardRef, useEffect, useRef, type Ref } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { DrawerProps, DrawerSide, DrawerSize } from './Drawer.types';

const horizontalSize: Record<DrawerSize, string> = {
  sm: 'w-[320px]',
  md: 'w-[420px]',
  lg: 'w-[560px]',
  xl: 'w-[720px]',
};

const verticalSize: Record<DrawerSize, string> = {
  sm: 'h-[240px]',
  md: 'h-[360px]',
  lg: 'h-[480px]',
  xl: 'h-[600px]',
};

const sideClasses: Record<DrawerSide, string> = {
  right: 'inset-y-0 right-0 border-l',
  left: 'inset-y-0 left-0 border-r',
  top: 'inset-x-0 top-0 border-b',
  bottom: 'inset-x-0 bottom-0 border-t',
};

// No shared ref-merge helper exists in the library yet; this keeps the
// forwarded consumer ref and the internal focus-management ref pointing at
// the same panel node without adding a new dependency.
function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): (node: T | null) => void {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as { current: T | null }).current = node;
      }
    }
  };
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    open,
    onClose,
    side = 'right',
    size = 'md',
    title,
    description,
    children,
    footer,
    closeOnOverlayClick = true,
    showClose = true,
    className,
    dataTestId,
  },
  ref,
) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    return () => prevFocus?.focus?.();
  }, [open]);

  if (!open) return null;

  const isHorizontal = side === 'left' || side === 'right';
  const sizeCls = isHorizontal ? horizontalSize[size] : verticalSize[size];

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'drawer-title' : undefined}
      aria-describedby={description ? 'drawer-desc' : undefined}
      className="fixed inset-0 z-50"
      data-test-id={dataTestId}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => closeOnOverlayClick && onClose()}
        aria-hidden
      />
      <div
        ref={mergeRefs(ref, panelRef)}
        tabIndex={-1}
        className={cn(
          'absolute bg-bg-default shadow-z5 outline-none flex flex-col',
          sideClasses[side],
          isHorizontal ? `${sizeCls} h-full max-w-full` : `${sizeCls} w-full max-h-full`,
          'border-border-default',
          className,
        )}
      >
        {(title || showClose) && (
          <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-border-default">
            <div className="flex-1 min-w-0">
              {title && (
                <h2 id="drawer-title" className="text-h-xs font-semibold text-fg-default">
                  {title}
                </h2>
              )}
              {description && (
                <p id="drawer-desc" className="mt-1 text-p-std text-fg-secondary">
                  {description}
                </p>
              )}
            </div>
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-2 -mt-2 p-2 rounded-md text-fg-secondary hover:text-fg-default hover:bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
        {children && <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>}
        {footer && (
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border-default bg-bg-container">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
});
