import type { Meta, StoryObj } from '@storybook/react-vite';
import { PersonCard } from './PersonCard';

const meta = {
  title: 'Components/PersonCard',
  component: PersonCard,
  // Docs page is authored by hand in PersonCard.docs.mdx instead of the
  // `autodocs` tag, per the architecture's Component.docs.mdx convention.
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'highlight', 'warning'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
  args: {
    name: 'Ana Petrosyan',
    role: 'Product Designer',
    variant: 'default',
    size: 'md',
  },
} satisfies Meta<typeof PersonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Highlight: Story = {
  args: { variant: 'highlight', name: 'You', role: 'Frontend Engineer' },
};

export const Warning: Story = {
  args: { variant: 'warning', role: 'Awaiting review' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const WithAvatar: Story = {
  args: {
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
};

export const WithBadge: Story = {
  args: {
    variant: 'highlight',
    name: 'You',
    badge: (
      <span className="rounded-full bg-brand-500 px-2 py-0.5 text-p-xs font-semibold text-white">
        YOU
      </span>
    ),
  },
};

export const NoRole: Story = {
  args: { role: undefined },
};

export const Clickable: Story = {
  args: {
    onClick: () => alert('Person card clicked'),
  },
};

export const CustomClassName: Story = {
  name: 'Overriding classes via className',
  args: {
    className: 'rounded-full',
  },
};

const VARIANTS = ['default', 'highlight', 'warning'] as const;
const SIZES = ['sm', 'md'] as const;

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <PersonCard key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {SIZES.map((size) => (
        <PersonCard key={size} {...args} size={size} />
      ))}
    </div>
  ),
};
