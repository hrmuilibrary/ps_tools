import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { DatePickerProps, DatePickerSize } from './DatePicker.types';

// Heights, text sizes and horizontal padding mirror Input/Select exactly so a
// DatePicker lines up with the other fields in a form grid.
const sizeStyles: Record<DatePickerSize, string> = {
  lg: 'h-12 text-p-md px-3.5',
  md: 'h-10 text-p-std px-3',
  sm: 'h-8 text-p-sm px-2.5',
};

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function sameDay(a: Date | null, b: Date | null) {
  return (
    !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  );
}

function formatShort(date: Date) {
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
}

function buildGrid(view: Date) {
  const first = startOfMonth(view);
  const offset = (first.getDay() + 6) % 7; // Mon-first
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(new Date(view.getFullYear(), view.getMonth(), i));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(
  {
    value,
    onChange,
    range = false,
    rangeValue,
    onChangeRange,
    size = 'md',
    label,
    placeholder = 'Select date',
    fullWidth = false,
    id,
    className,
    wrapperClassName,
    dataTestId,
  },
  ref,
) {
  const reactId = useId();
  const triggerId = id ?? reactId;
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<Date>(value ?? rangeValue?.start ?? new Date());
  const [hoverEnd, setHoverEnd] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const display = range
    ? rangeValue?.start
      ? `${formatShort(rangeValue.start)}${rangeValue.end ? ` – ${formatShort(rangeValue.end)}` : ''}`
      : ''
    : value
      ? formatShort(value)
      : '';

  function pick(date: Date) {
    if (!range) {
      onChange?.(date);
      setOpen(false);
      return;
    }
    const current = rangeValue ?? { start: null, end: null };
    if (!current.start || (current.start && current.end)) {
      onChangeRange?.({ start: date, end: null });
      return;
    }
    if (date < current.start) {
      onChangeRange?.({ start: date, end: current.start });
      return;
    }
    onChangeRange?.({ start: current.start, end: date });
    setOpen(false);
  }

  const cells = buildGrid(view);
  const currentRange = rangeValue ?? { start: null, end: null };
  const rangeEnd = currentRange.end ?? hoverEnd;

  return (
    <div
      ref={containerRef}
      data-test-id={dataTestId}
      className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', wrapperClassName)}
    >
      {label && (
        <label htmlFor={triggerId} className="text-p-std font-medium text-fg-default inline-flex">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          ref={ref}
          id={triggerId}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg border border-border-default bg-bg-default text-left transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:border-brand-500',
            fullWidth ? 'w-full min-w-0' : 'min-w-[260px]',
            sizeStyles[size],
            className,
          )}
        >
          <span className={cn('flex-1 text-left truncate', display ? 'text-fg-default' : 'text-fg-tertiary')}>
            {display || placeholder}
          </span>
          <Calendar className="w-4 h-4 text-fg-secondary" />
        </button>

        {open && (
          <div className="absolute z-50 mt-1 left-0 rounded-xl border border-border-default bg-bg-default shadow-z3 p-3 w-[300px]">
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                className="w-8 h-8 rounded-md hover:bg-bg-container flex items-center justify-center text-fg-secondary"
                onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-p-md font-semibold text-fg-default">
                {MONTH_NAMES[view.getMonth()]} {view.getFullYear()}
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-md hover:bg-bg-container flex items-center justify-center text-fg-secondary"
                onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {DAY_NAMES.map((day) => (
                <div key={day} className="text-p-xs text-fg-tertiary py-1">
                  {day}
                </div>
              ))}
              {cells.map((date, index) => {
                if (!date) return <div key={index} />;
                const isSelected = !range && sameDay(date, value ?? null);
                const isStart = range && sameDay(date, currentRange.start);
                const isEnd = range && sameDay(date, rangeEnd);
                const isInRange = range && !!currentRange.start && !!rangeEnd && date > currentRange.start && date < rangeEnd;
                const stateClassName =
                  isSelected || isStart || isEnd
                    ? 'bg-brand-500 text-white'
                    : isInRange
                      ? 'bg-bg-brand-lighter text-brand-700'
                      : 'text-fg-default hover:bg-bg-container';
                return (
                  <button
                    key={index}
                    type="button"
                    onMouseEnter={() => range && currentRange.start && !currentRange.end && setHoverEnd(date)}
                    onClick={() => pick(date)}
                    className={cn('h-8 rounded-md text-p-sm font-medium', stateClassName)}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
