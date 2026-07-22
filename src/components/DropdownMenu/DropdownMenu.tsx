import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type Ref,
} from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/cn';
import type {
  DropdownContentProps,
  DropdownItemProps,
  DropdownLabelProps,
  DropdownMenuProps,
  DropdownSeparatorProps,
  DropdownTriggerProps,
} from './DropdownMenu.types';

interface DropdownCtx {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const DropdownContext = createContext<DropdownCtx | null>(null);

function useDropdown() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('Dropdown parts must be used inside <DropdownMenu>');
  return ctx;
}

// No shared ref-merge helper exists in the library yet; this keeps the
// forwarded consumer ref and the internal outside-click ref pointing at the
// same panel node without adding a new dependency.
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

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(function DropdownMenu(
  { children, defaultOpen = false, open, onOpenChange, className, dataTestId, ...rest },
  ref,
) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const current = isControlled ? open : internalOpen;
  const triggerRef = useRef<HTMLElement | null>(null);

  const setOpen = (value: boolean) => {
    if (!isControlled) setInternalOpen(value);
    onOpenChange?.(value);
  };

  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <DropdownContext.Provider value={{ open: current, setOpen, triggerRef }}>
      <div
        ref={ref}
        data-test-id={dataTestId}
        className={cn('relative inline-block', className)}
        {...rest}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
});

export function DropdownTrigger({ children }: DropdownTriggerProps) {
  const { open, setOpen, triggerRef } = useDropdown();
  if (!isValidElement(children)) return children;
  const childProps = (children.props ?? {}) as Record<string, unknown>;

  return cloneElement(children, {
    ref: triggerRef,
    onClick: (e: ReactMouseEvent) => {
      const orig = childProps.onClick as ((e: ReactMouseEvent) => void) | undefined;
      orig?.(e);
      if (!e.defaultPrevented) setOpen(!open);
    },
    'aria-haspopup': 'menu',
    'aria-expanded': open,
  } as Record<string, unknown>);
}

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  function DropdownContent({ children, align = 'start', className, dataTestId, ...rest }, ref) {
    const { open, setOpen, triggerRef } = useDropdown();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;
      const onDoc = (e: MouseEvent) => {
        const target = e.target as Node;
        if (contentRef.current?.contains(target)) return;
        if (triggerRef.current?.contains(target)) return;
        setOpen(false);
      };
      document.addEventListener('mousedown', onDoc);
      return () => document.removeEventListener('mousedown', onDoc);
    }, [open, setOpen, triggerRef]);

    if (!open) return null;

    return (
      <div
        ref={mergeRefs(ref, contentRef)}
        role="menu"
        data-test-id={dataTestId}
        className={cn(
          'absolute top-full mt-1 min-w-[200px] rounded-lg border border-border-default bg-bg-default shadow-z4 z-50 py-1',
          align === 'end' ? 'right-0' : 'left-0',
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(function DropdownItem(
  { children, onSelect, disabled, icon, shortcut, destructive, checked, className, dataTestId, onClick, ...rest },
  ref,
) {
  const { setOpen } = useDropdown();
  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      disabled={disabled}
      data-test-id={dataTestId}
      onClick={(event) => {
        onClick?.(event);
        onSelect?.();
        setOpen(false);
      }}
      className={cn(
        'flex w-full items-center gap-2 px-3 py-2 text-left text-p-std text-fg-default',
        'hover:bg-bg-subtle focus-visible:outline-none focus-visible:bg-bg-subtle',
        disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
        destructive && 'text-red-700 hover:bg-red-50',
        className,
      )}
      {...rest}
    >
      {checked !== undefined && (
        <span className="w-4 shrink-0">{checked && <Check className="h-4 w-4 text-brand-500" />}</span>
      )}
      {icon && <span className="inline-flex shrink-0 text-fg-secondary">{icon}</span>}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && <span className="text-p-sm text-fg-tertiary shrink-0 tabular-nums">{shortcut}</span>}
    </button>
  );
});

export const DropdownSeparator = forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  function DropdownSeparator({ className, dataTestId, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="separator"
        data-test-id={dataTestId}
        className={cn('my-1 h-px bg-border-default', className)}
        {...rest}
      />
    );
  },
);

export const DropdownLabel = forwardRef<HTMLDivElement, DropdownLabelProps>(function DropdownLabel(
  { children, className, dataTestId, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-test-id={dataTestId}
      className={cn(
        'px-3 py-1.5 text-p-xs font-semibold uppercase tracking-wider text-fg-tertiary',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
