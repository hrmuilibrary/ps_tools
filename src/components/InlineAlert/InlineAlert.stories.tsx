import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { InlineAlert } from './InlineAlert';

const meta = {
  title: 'Components/InlineAlert',
  component: InlineAlert,
  // Docs page is authored by hand in InlineAlert.docs.mdx instead of the
  // `autodocs` tag, per the architecture's Component.docs.mdx convention.
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info', 'discovery'],
    },
  },
  args: {
    variant: 'info',
    title: 'Heads up',
    description: 'This is an inline alert with a title and description.',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InlineAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Changes saved',
    description: 'Your profile has been updated successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Review required',
    description: 'Some fields need your attention before you can continue.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Something went wrong',
    description: 'We couldn’t process your request. Please try again.',
  },
};

export const Discovery: Story = {
  args: {
    variant: 'discovery',
    title: 'New feature available',
    description: 'Check out the new dashboard layout in your settings.',
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Saved as draft',
    description: undefined,
  },
};

export const Dismissible: Story = {
  args: {
    title: 'Dismissible alert',
    description: 'Click the close button to dismiss this alert.',
    onDismiss: () => {},
  },
};

export const WithActions: Story = {
  args: {
    variant: 'warning',
    title: 'Unsaved changes',
    description: 'You have unsaved changes that will be lost if you leave this page.',
    actions: (
      <>
        <Button size="sm" variant="secondary">
          Discard
        </Button>
        <Button size="sm" variant="primary">
          Save changes
        </Button>
      </>
    ),
  },
};

export const WithCustomIcon: Story = {
  name: 'Custom icon',
  args: {
    icon: <span className="text-lg leading-none">{'\u{1F680}'}</span>,
    title: 'Custom icon override',
    description: 'The `icon` prop replaces the variant’s default icon.',
  },
};

export const CustomClassName: Story = {
  name: 'Overriding classes via className',
  args: {
    variant: 'success',
    className: 'bg-green-100 border-green-300 rounded-2xl',
    title: 'Custom styling',
    description: 'className merges with tailwind-merge, so it wins over defaults.',
  },
};

const VARIANTS = ['success', 'warning', 'danger', 'info', 'discovery'] as const;

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <InlineAlert
          key={variant}
          {...args}
          variant={variant}
          title={variant.charAt(0).toUpperCase() + variant.slice(1)}
        />
      ))}
    </div>
  ),
};
