import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  // Docs page is authored by hand in Button.docs.mdx instead of the
  // `autodocs` tag, per the architecture's Component.docs.mdx convention.
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm'],
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    iconOnly: false,
    fullWidth: false,
    pressed: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary' },
};

export const Danger: Story = {
  args: { variant: 'danger' },
};

export const Loading: Story = {
  args: { loading: true, children: 'Saving...' },
};

export const Pressed: Story = {
  args: { pressed: true, children: 'Toggled on' },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Mail className="size-4" />,
    children: 'Email',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <Mail className="size-4" />,
    children: 'Email',
  },
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    'aria-label': 'Send email',
    children: <Mail className="size-4" />,
  },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const CustomClassName: Story = {
  name: 'Overriding classes via className',
  args: {
    className: 'bg-green-600 text-fg-inverse hover:bg-green-700 rounded-full',
    children: 'Approve',
  },
};

const VARIANTS = ['primary', 'secondary', 'tertiary', 'danger'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};
