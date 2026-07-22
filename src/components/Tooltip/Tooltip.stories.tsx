import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  // Docs page is authored by hand in Tooltip.docs.mdx instead of the
  // `autodocs` tag, per the architecture's Component.docs.mdx convention.
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    size: {
      control: 'select',
      options: ['lg', 'sm'],
    },
    delay: {
      control: 'number',
    },
  },
  args: {
    content: 'Tooltip content',
    side: 'top',
    size: 'sm',
    delay: 150,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const Top: Story = {
  args: { side: 'top' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Top</Button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: { side: 'bottom' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Bottom</Button>
    </Tooltip>
  ),
};

export const Left: Story = {
  args: { side: 'left' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Left</Button>
    </Tooltip>
  ),
};

export const Right: Story = {
  args: { side: 'right' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Right</Button>
    </Tooltip>
  ),
};

export const LargeSize: Story = {
  args: { size: 'lg', content: 'A larger tooltip bubble' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Large tooltip</Button>
    </Tooltip>
  ),
};

export const CustomClassName: Story = {
  name: 'Overriding classes via className',
  args: {
    className: 'bg-brand-500 text-white',
    content: 'Branded tooltip',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

const SIDES = ['top', 'bottom', 'left', 'right'] as const;

export const AllSides: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-12 p-12">
      {SIDES.map((side) => (
        <Tooltip key={side} {...args} side={side}>
          <Button>{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
