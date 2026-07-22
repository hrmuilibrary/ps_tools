import { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn';
import type { TextAreaProps } from './TextArea.types';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    label,
    helperText,
    errorText,
    error = false,
    id,
    disabled,
    required,
    maxLength,
    showCount = false,
    className,
    wrapperClassName,
    value,
    defaultValue,
    rows = 4,
    dataTestId,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const hasError = error || !!errorText;
  const describedBy = errorText ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined;
  const currentLength =
    value !== undefined ? String(value).length : defaultValue !== undefined ? String(defaultValue).length : 0;

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', wrapperClassName)} data-test-id={dataTestId}>
      {label && (
        <label htmlFor={inputId} className="text-p-std font-medium text-fg-default inline-flex items-center gap-1">
          {label}
          {required && (
            <span className="text-red-600" aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        className={cn(
          'w-full px-3 py-2.5 rounded-lg border bg-bg-default text-p-std text-fg-default placeholder:text-fg-tertiary outline-none transition-colors resize-y',
          hasError ? 'border-red-600' : 'border-border-default',
          !disabled && !hasError && 'hover:border-border-strong',
          'focus:ring-2',
          hasError ? 'focus:ring-red-300 focus:border-red-600' : 'focus:ring-brand-300 focus:border-brand-500',
          disabled && 'bg-bg-container border-border-default cursor-not-allowed',
          className,
        )}
        {...rest}
      />
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {errorText ? (
            <p id={`${inputId}-error`} className="text-p-sm text-red-700">
              {errorText}
            </p>
          ) : helperText ? (
            <p id={`${inputId}-help`} className="text-p-sm text-fg-secondary">
              {helperText}
            </p>
          ) : null}
        </div>
        {showCount && maxLength && (
          <p className="text-p-sm text-fg-tertiary tabular-nums shrink-0">
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
});
