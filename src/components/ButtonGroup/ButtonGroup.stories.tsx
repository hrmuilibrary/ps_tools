import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Bell, Settings } from 'lucide-react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  // Docs page is authored by hand in ButtonGroup.docs.mdx instead of the
  // `autodocs` tag, per the architecture's Component.docs.mdx convention.
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">One</Button>
      <Button variant="secondary">Two</Button>
      <Button variant="secondary">Three</Button>
    </ButtonGroup>
  ),
};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Day</Button>
      <Button variant="secondary">Week</Button>
      <Button variant="secondary">Month</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Day</Button>
      <Button variant="secondary">Week</Button>
      <Button variant="secondary">Month</Button>
    </ButtonGroup>
  ),
};

export const IconOnly: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary" iconOnly aria-label="Mail">
        <Mail className="size-4" />
      </Button>
      <Button variant="secondary" iconOnly aria-label="Notifications">
        <Bell className="size-4" />
      </Button>
      <Button variant="secondary" iconOnly aria-label="Settings">
        <Settings className="size-4" />
      </Button>
    </ButtonGroup>
  ),
};

export const WithPressedButton: Story = {
  name: 'With a pressed/active button',
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary" pressed>
        Day
      </Button>
      <Button variant="secondary">Week</Button>
      <Button variant="secondary">Month</Button>
    </ButtonGroup>
  ),
};

export const CustomClassName: Story = {
  name: 'Overriding classes via className',
  render: (args) => (
    <ButtonGroup {...args} className="shadow-z3">
      <Button variant="secondary">One</Button>
      <Button variant="secondary">Two</Button>
    </ButtonGroup>
  ),
};
