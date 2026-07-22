import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell } from 'lucide-react';
import { NotificationBadge } from './NotificationBadge';

const meta = {
  title: 'Components/NotificationBadge',
  component: NotificationBadge,
  // Docs page is authored by hand in NotificationBadge.docs.mdx instead of
  // the `autodocs` tag, per the architecture's Component.docs.mdx convention.
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    kind: {
      control: 'select',
      options: ['count', 'dot'],
    },
    size: {
      control: 'select',
      options: ['lg', 'sm'],
    },
    variant: {
      control: 'select',
      options: ['brand', 'danger', 'success', 'warning', 'info'],
    },
  },
  args: {
    count: 3,
    max: 99,
    kind: 'count',
    size: 'lg',
    variant: 'danger',
    showZero: false,
  },
} satisfies Meta<typeof NotificationBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standalone: Story = {};

export const Dot: Story = {
  args: { kind: 'dot' },
};

export const OverflowCount: Story = {
  name: 'Overflow count (99+)',
  args: { count: 140 },
};

export const ThousandsCount: Story = {
  name: 'Thousands count (2K)',
  args: { count: 2400, max: 9999 },
};

export const ShowZero: Story = {
  args: { count: 0, showZero: true },
};

export const HiddenWhenZero: Story = {
  name: 'Hidden when zero (default)',
  args: { count: 0 },
};

export const OnIcon: Story = {
  name: 'Overlaid on an icon',
  args: {
    children: <Bell className="size-6 text-fg-secondary" />,
  },
};

export const DotOnIcon: Story = {
  name: 'Dot overlaid on an icon',
  args: {
    kind: 'dot',
    children: <Bell className="size-6 text-fg-secondary" />,
  },
};

export const SmallSize: Story = {
  args: { size: 'sm', children: <Bell className="size-5 text-fg-secondary" /> },
};

export const CustomClassName: Story = {
  name: 'Overriding classes via className',
  args: {
    className: 'bg-purple-500 ring-offset-0',
    children: <Bell className="size-6 text-fg-secondary" />,
  },
};

const VARIANTS = ['brand', 'danger', 'success', 'warning', 'info'] as const;

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      {VARIANTS.map((variant) => (
        <NotificationBadge key={variant} {...args} variant={variant}>
          <Bell className="size-6 text-fg-secondary" />
        </NotificationBadge>
      ))}
    </div>
  ),
};

const SIZES = ['sm', 'lg'] as const;

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      {SIZES.map((size) => (
        <NotificationBadge key={size} {...args} size={size}>
          <Bell className="size-6 text-fg-secondary" />
        </NotificationBadge>
      ))}
    </div>
  ),
};
