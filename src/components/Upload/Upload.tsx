import { forwardRef, useRef, useState, type DragEvent, type KeyboardEvent } from 'react';
import { UploadCloud, File as FileIcon, Trash2, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { UploadItemProps, UploadItemStatus, UploadProps } from './Upload.types';

export const Upload = forwardRef<HTMLDivElement, UploadProps>(function Upload(
  { accept, multiple = false, maxSizeMB, hint, onFiles, disabled, className, dataTestId, ...rest },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const files = Array.from(event.dataTransfer.files ?? []);
    if (files.length) onFiles?.(files);
  };

  const hintText =
    hint ??
    `${accept ? accept.toUpperCase().replace(/\./g, '') : 'Any file'}${
      maxSizeMB ? `, up to ${maxSizeMB} MB` : ''
    }`;

  return (
    <div
      ref={ref}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      aria-disabled={disabled || undefined}
      data-test-id={dataTestId}
      className={cn(
        'flex flex-col items-center justify-center text-center gap-2 px-6 py-8 rounded-lg border-2 border-dashed cursor-pointer transition-colors outline-none',
        dragOver ? 'border-brand-500 bg-brand-20' : 'border-border-default bg-bg-container hover:bg-bg-subtle',
        'focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-1',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...rest}
    >
      <div className="h-10 w-10 rounded-full bg-bg-default flex items-center justify-center text-fg-secondary shadow-z1">
        <UploadCloud className="h-5 w-5" />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-p-std text-fg-default">
          <span className="font-semibold text-brand-700">Choose a file</span> or drag &amp; drop it here.
        </p>
        <p className="text-p-sm text-fg-tertiary">{hintText}</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          if (files.length) onFiles?.(files);
          event.target.value = '';
        }}
        className="sr-only"
      />
    </div>
  );
});

const statusStyles: Record<UploadItemStatus, string> = {
  processing: 'border-border-default bg-bg-default',
  completed: 'border-border-default bg-bg-default',
  error: 'border-red-300 bg-bg-danger-lighter',
};

export const UploadItem = forwardRef<HTMLDivElement, UploadItemProps>(function UploadItem(
  { name, meta, status = 'processing', progress = 0, errorText, onRetry, onRemove, className, dataTestId, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-test-id={dataTestId}
      className={cn('flex items-start gap-3 px-3 py-2.5 rounded-lg border', statusStyles[status], className)}
      {...rest}
    >
      <div
        className={cn(
          'shrink-0 flex items-center justify-center h-9 w-9 rounded-md',
          status === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-700' : 'bg-bg-subtle text-fg-secondary',
        )}
      >
        <FileIcon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-p-std font-medium text-fg-default">{name}</p>
          <div className="flex items-center gap-1 shrink-0">
            {status === 'completed' && (
              <CheckCircle2 className="h-4 w-4 text-green-600" aria-label="Completed" />
            )}
            {status === 'error' && <AlertCircle className="h-4 w-4 text-red-600" aria-label="Failed" />}
          </div>
        </div>
        {meta && <p className="text-p-sm text-fg-tertiary mt-0.5">{meta}</p>}
        {status === 'processing' && (
          <div className="mt-2 h-1 w-full rounded-full bg-bg-subtle overflow-hidden">
            <div
              className="h-full bg-brand-500 transition-[width] duration-200"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}
        {status === 'error' && errorText && (
          <p className="text-p-sm text-red-700 mt-1">
            {errorText}
            {onRetry && (
              <button type="button" onClick={onRetry} className="ml-2 underline font-medium hover:no-underline">
                Try again
              </button>
            )}
          </p>
        )}
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="shrink-0 p-1 rounded-md text-fg-tertiary hover:text-fg-default hover:bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
        >
          {status === 'completed' ? <Trash2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
});
