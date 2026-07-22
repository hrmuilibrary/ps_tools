import { createContext, forwardRef, useContext, useState, type Ref } from 'react';
import { ChevronRight, Menu as MenuIcon } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { SidebarItemProps, SidebarProps } from './Sidebar.types';

interface SidebarContextValue {
  collapsed: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebar(): SidebarContextValue {
  return useContext(SidebarContext) ?? { collapsed: false, toggle: () => {} };
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  {
    defaultCollapsed = false,
    collapsed,
    onCollapsedChange,
    children,
    className,
    logo,
    title,
    subtitle,
    dataTestId,
    ...rest
  },
  ref,
) {
  const [internal, setInternal] = useState(defaultCollapsed);
  const isControlled = collapsed !== undefined;
  const current = isControlled ? collapsed : internal;

  const toggle = () => {
    const next = !current;
    if (!isControlled) setInternal(next);
    onCollapsedChange?.(next);
  };

  return (
    <SidebarContext.Provider value={{ collapsed: current, toggle }}>
      <aside
        ref={ref}
        data-test-id={dataTestId}
        className={cn(
          'flex flex-col bg-bg-default border-r border-border-default transition-all duration-200',
          current ? 'w-16' : 'w-64',
          className,
        )}
        {...rest}
      >
        <div
          className={cn(
            'flex items-center gap-3 px-4 py-4 border-b border-border-default',
            current && 'justify-center px-2',
          )}
        >
          {logo && <div className="shrink-0">{logo}</div>}
          {!current && (
            <div className="flex flex-col min-w-0">
              {title && (
                <div className="text-p-md font-semibold text-fg-default truncate">{title}</div>
              )}
              {subtitle && <div className="text-p-sm text-fg-secondary truncate">{subtitle}</div>}
            </div>
          )}
          <button
            type="button"
            onClick={toggle}
            aria-label={current ? 'Expand sidebar' : 'Collapse sidebar'}
            className={cn(
              'ml-auto inline-flex items-center justify-center h-8 w-8 rounded-md text-fg-secondary hover:bg-bg-subtle hover:text-fg-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300',
              current && 'ml-0',
            )}
          >
            <MenuIcon className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 flex flex-col gap-0.5">{children}</nav>
      </aside>
    </SidebarContext.Provider>
  );
});

export const SidebarItem = forwardRef<HTMLAnchorElement | HTMLButtonElement, SidebarItemProps>(
  function SidebarItem(
    { icon, label, active, badge, children, onClick, href, className, dataTestId, ...rest },
    ref,
  ) {
    const { collapsed } = useSidebar();
    const [open, setOpen] = useState(active ?? false);
    const hasChildren = !!children;

    const content = (
      <>
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-left">{label}</span>
            {badge && <span className="shrink-0">{badge}</span>}
            {hasChildren && (
              <ChevronRight
                className={cn(
                  'h-4 w-4 shrink-0 text-fg-tertiary transition-transform',
                  open && 'rotate-90',
                )}
                aria-hidden
              />
            )}
          </>
        )}
      </>
    );

    const handleClick = () => {
      if (hasChildren) setOpen((o) => !o);
      onClick?.();
    };

    const itemCls = cn(
      'group relative flex items-center gap-3 rounded-md px-3 py-2 text-p-std font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300',
      collapsed && 'px-2 justify-center',
      active
        ? 'bg-brand-20 text-brand-800 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-0.5 before:rounded-r before:bg-brand-500'
        : 'text-fg-default hover:bg-bg-container',
      className,
    );

    return (
      <>
        {href ? (
          <a
            ref={ref as Ref<HTMLAnchorElement>}
            href={href}
            onClick={handleClick}
            data-test-id={dataTestId}
            className={itemCls}
            {...rest}
          >
            {content}
          </a>
        ) : (
          <button
            ref={ref as Ref<HTMLButtonElement>}
            type="button"
            onClick={handleClick}
            data-test-id={dataTestId}
            className={cn(itemCls, 'w-full')}
            {...rest}
          >
            {content}
          </button>
        )}
        {hasChildren && open && !collapsed && (
          <div className="flex flex-col gap-0.5 pl-8">{children}</div>
        )}
      </>
    );
  },
);
