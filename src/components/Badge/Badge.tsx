import { forwardRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { BadgeProps, BadgeSize, BadgeVariant } from './Badge.types';

const sizeStyles: Record<BadgeSize, string> = {
  lg: 'h-7 px-2.5 text-p-std gap-1.5 rounded-md',
  md: 'h-6 px-2 text-p-sm gap-1 rounded-md',
  sm: 'h-5 px-1.5 text-p-sm gap-1 rounded',
  xs: 'h-4 px-1 text-p-xs gap-0.5 rounded',
};

const filledStyles: Record<BadgeVariant, string> = {
  neutral: 'bg-bg-subtle text-fg-default border border-border-default',
  brand: 'bg-brand-20 text-brand-800 border border-brand-100',
  success: 'bg-green-50 text-green-800 border border-green-100',
  warning: 'bg-yellow-50 text-yellow-900 border border-yellow-100',
  danger: 'bg-red-50 text-red-800 border border-red-100',
  info: 'bg-blue-50 text-blue-800 border border-blue-100',
  privacy: 'bg-purple-50 text-purple-800 border border-purple-100',
};

const outlineStyles: Record<BadgeVariant, string> = {
  neutral: 'bg-transparent text-fg-default border border-border-strong',
  brand: 'bg-transparent text-brand-700 border border-brand-500',
  success: 'bg-transparent text-green-700 border border-green-500',
  warning: 'bg-transparent text-yellow-800 border border-yellow-600',
  danger: 'bg-transparent text-red-700 border border-red-500',
  info: 'bg-transparent text-blue-700 border border-blue-500',
  privacy: 'bg-transparent text-purple-700 border border-purple-500',
};

const accentStyles: Record<BadgeVariant, string> = {
  neutral: 'bg-fg-default text-bg-default',
  brand: 'bg-brand-500 text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-yellow-600 text-gray-900 dark:text-gray-900',
  danger: 'bg-red-700 text-white',
  info: 'bg-blue-600 text-white',
  privacy: 'bg-purple-500 text-white',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = 'neutral',
    appearance = 'filled',
    size = 'md',
    leftIcon,
    rightIcon,
    onDismiss,
    className,
    children,
    dataTestId,
    ...rest
  },
  ref,
) {
  const palette =
    appearance === 'filled'
      ? filledStyles[variant]
      : appearance === 'outline'
        ? outlineStyles[variant]
        : accentStyles[variant];

  return (
    <span
      ref={ref}
      data-test-id={dataTestId}
      className={cn(
        'inline-flex items-center font-medium whitespace-nowrap select-none',
        sizeStyles[size],
        palette,
        className,
      )}
      {...rest}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && !onDismiss && <span className="inline-flex shrink-0">{rightIcon}</span>}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="inline-flex shrink-0 -mr-0.5 rounded-full p-0.5 hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
});
