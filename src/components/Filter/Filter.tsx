import { forwardRef, useEffect, useRef, useState, type Ref } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { FilterProps, FilterSize } from './Filter.types';

const sizeStyles: Record<FilterSize, string> = {
  lg: 'h-10 px-3 text-p-std gap-2',
  md: 'h-9 px-2.5 text-p-std gap-1.5',
  sm: 'h-8 px-2 text-p-sm gap-1.5',
};

// No shared ref-merge helper exists in the library yet; this keeps the
// forwarded consumer ref and the internal outside-click ref pointing at the
// same wrapper node without adding a new dependency.
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

export const Filter = forwardRef<HTMLDivElement, FilterProps>(function Filter(
  {
    label,
    value,
    active = false,
    size = 'md',
    disabled,
    onClear,
    children,
    className,
    dataTestId,
    ...rest
  },
  ref,
) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const isActive = active || value !== undefined;

  return (
    <div
      ref={mergeRefs(ref, wrapperRef)}
      data-test-id={dataTestId}
      className={cn('relative inline-flex', className)}
      {...rest}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          'inline-flex items-center rounded-full border transition-colors outline-none',
          sizeStyles[size],
          isActive
            ? 'bg-brand-20 text-brand-800 border-brand-500'
            : 'bg-bg-default text-fg-default border-border-default',
          !disabled && 'hover:border-border-strong',
          'focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-1',
          disabled && 'bg-bg-container text-fg-disabled cursor-not-allowed',
        )}
      >
        <span className="font-medium">{label}</span>
        {value !== undefined && (
          <>
            <span className="mx-0.5 text-fg-tertiary" aria-hidden>
              •
            </span>
            <span className="font-semibold truncate max-w-[140px]">{value}</span>
          </>
        )}
        {isActive && onClear ? (
          <span
            role="button"
            tabIndex={0}
            aria-label="Clear filter"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onClear();
              }
            }}
            className="inline-flex items-center justify-center rounded-full p-0.5 hover:bg-black/10"
          >
            <X className="h-3 w-3" />
          </span>
        ) : (
          <ChevronDown
            className={cn('h-4 w-4 text-fg-secondary transition-transform', open && 'rotate-180')}
            aria-hidden
          />
        )}
      </button>
      {open && children && (
        <div className="absolute left-0 top-full mt-1 min-w-[220px] rounded-lg border border-border-default bg-bg-default shadow-z4 z-50 p-3">
          {children}
        </div>
      )}
    </div>
  );
});
