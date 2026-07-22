import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  // Docs page is authored by hand in Switch.docs.mdx instead of the
  // `autodocs` tag, per the architecture's Component.docs.mdx convention.
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm'],
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
  args: {
    size: 'md',
    labelPosition: 'right',
    disabled: false,
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const WithLabel: Story = {
  args: { label: 'Enable notifications' },
};

export const WithLabelAndDescription: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Get notified when someone mentions you.',
  },
};

export const LabelOnLeft: Story = {
  args: {
    label: 'Enable notifications',
    labelPosition: 'left',
  },
};

export const CustomClassName: Story = {
  name: 'Overriding classes via className',
  args: {
    label: 'Custom wrapper spacing',
    className: 'gap-6',
  },
};

const SIZES = ['sm', 'md'] as const;

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      {SIZES.map((size) => (
        <Switch key={size} {...args} size={size} label={size} />
      ))}
    </div>
  ),
};
