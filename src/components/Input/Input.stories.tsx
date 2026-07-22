import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Search } from 'lucide-react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  // Docs page is authored by hand in Input.docs.mdx instead of the
  // `autodocs` tag, per the architecture's Component.docs.mdx convention.
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm'],
    },
  },
  args: {
    placeholder: 'Enter a value',
    size: 'md',
    disabled: false,
    required: false,
    error: false,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithLabel: Story = {
  args: { label: 'Email address' },
};

export const Required: Story = {
  args: { label: 'Email address', required: true },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email address',
    helperText: "We'll never share your email.",
  },
};

export const WithError: Story = {
  args: {
    label: 'Email address',
    error: true,
    errorText: 'Please enter a valid email address.',
    defaultValue: 'not-an-email',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email address',
    disabled: true,
    defaultValue: 'disabled@example.com',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    leftIcon: <Search className="h-4 w-4" />,
    placeholder: 'Search...',
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Email address',
    rightIcon: <Mail className="h-4 w-4" />,
  },
};

export const WithAddons: Story = {
  args: {
    label: 'Website',
    leftAddon: 'https://',
    rightAddon: '.com',
    placeholder: 'example',
  },
};

export const CustomClassName: Story = {
  name: 'Overriding classes via className',
  args: {
    label: 'Email address',
    className: 'text-fg-brand',
  },
};

const SIZES = ['sm', 'md', 'lg'] as const;

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {SIZES.map((size) => (
        <Input key={size} {...args} size={size} label={`Size: ${size}`} />
      ))}
    </div>
  ),
};
