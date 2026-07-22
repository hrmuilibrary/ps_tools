import type { HTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { BaseProps } from '../../types';
import type { IconTileTone } from '../IconTile';

export interface InfoFieldProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  /** Leading lucide-react icon. */
  icon: LucideIcon;
  /** IconTile tone for the leading badge. Defaults to "brand". */
  iconTone?: IconTileTone;
  /** Small uppercase label above the value. */
  label: string;
  /** The actual value — string or any node (chips, links, etc). */
  value: ReactNode;
  /** Optional right-aligned slot for inline actions (edit button, pill, link). */
  action?: ReactNode;
}
