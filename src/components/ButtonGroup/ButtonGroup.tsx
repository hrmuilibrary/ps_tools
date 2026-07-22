import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { ButtonGroupOrientation, ButtonGroupProps } from './ButtonGroup.types';

const orientationStyles: Record<ButtonGroupOrientation, string> = {
  horizontal:
    'flex-row [&>*]:rounded-none [&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg [&>*:not(:first-child)]:-ml-px',
  vertical:
    'flex-col [&>*]:rounded-none [&>*:first-child]:rounded-t-lg [&>*:last-child]:rounded-b-lg [&>*:not(:first-child)]:-mt-px',
};

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { orientation = 'horizontal', className, children, dataTestId, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="group"
      data-test-id={dataTestId}
      className={cn(
        'inline-flex isolate',
        orientationStyles[orientation],
        '[&>*]:relative [&>*:hover]:z-10 [&>*:focus-visible]:z-10',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
