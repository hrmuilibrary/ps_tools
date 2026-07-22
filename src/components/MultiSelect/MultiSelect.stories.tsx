import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MultiSelect } from './MultiSelect';
import type { MultiSelectOption } from './MultiSelect.types';

const tagOptions: MultiSelectOption[] = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'legal', label: 'Legal (disabled)', disabled: true },
  { value: 'hr', label: 'People Ops' },
];

const peopleOptions: MultiSelectOption[] = [
  {
    value: 'ada',
    label: 'Ada Lovelace',
    description: 'Engineering · London',
    avatarSrc: 'https://i.pravatar.cc/64?img=47',
  },
  {
    value: 'grace',
    label: 'Grace Hopper',
    description: 'Engineering · Remote',
    avatarSrc: 'https://i.pravatar.cc/64?img=48',
    badge: 'You',
  },
  {
    value: 'alan',
    label: 'Alan Turing',
    description: 'Research · Cambridge',
    avatarSrc: 'https://i.pravatar.cc/64?img=12',
  },
  {
    value: 'margaret',
    label: 'Margaret Hamilton',
    description: 'Engineering · Boston',
    avatarSrc: 'https://i.pravatar.cc/64?img=32',
  },
  {
    value: 'katherine',
    label: 'Katherine Johnson',
    description: 'Data Science · Remote (disabled)',
    avatarSrc: 'https://i.pravatar.cc/64?img=44',
    disabled: true,
  },
];

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  // Docs page is authored by hand in MultiSelect.docs.mdx instead of the
  // `autodocs` tag, per the architecture's Component.docs.mdx convention.
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    options: tagOptions,
    placeholder: 'Select teams…',
    size: 'md',
    disabled: false,
    error: false,
    searchable: true,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    function Controlled() {
      const [value, setValue] = useState<string[]>(['design']);
      return <MultiSelect {...args} value={value} onChange={setValue} />;
    }
    return <Controlled />;
  },
};

export const WithLabel: Story = {
  render: (args) => {
    function Controlled() {
      const [value, setValue] = useState<string[]>([]);
      return <MultiSelect {...args} value={value} onChange={setValue} />;
    }
    return <Controlled />;
  },
  args: {
    label: 'Teams',
    required: true,
  },
};

export const WithHelperText: Story = {
  render: (args) => {
    function Controlled() {
      const [value, setValue] = useState<string[]>(['engineering']);
      return <MultiSelect {...args} value={value} onChange={setValue} />;
    }
    return <Controlled />;
  },
  args: {
    label: 'Teams',
    helperText: 'Select every team involved in this project.',
  },
};

export const WithError: Story = {
  render: (args) => {
    function Controlled() {
      const [value, setValue] = useState<string[]>([]);
      return <MultiSelect {...args} value={value} onChange={setValue} />;
    }
    return <Controlled />;
  },
  args: {
    label: 'Teams',
    error: true,
    errorText: 'Select at least one team.',
  },
};

export const Disabled: Story = {
  render: (args) => {
    function Controlled() {
      const [value, setValue] = useState<string[]>(['design', 'product']);
      return <MultiSelect {...args} value={value} onChange={setValue} />;
    }
    return <Controlled />;
  },
  args: {
    label: 'Teams',
    disabled: true,
  },
};

export const WithAvatarsAndBadges: Story = {
  name: 'People picker (avatars, descriptions, badges)',
  render: (args) => {
    function Controlled() {
      const [value, setValue] = useState<string[]>(['grace']);
      return <MultiSelect {...args} value={value} onChange={setValue} />;
    }
    return <Controlled />;
  },
  args: {
    options: peopleOptions,
    label: 'Reviewers',
    placeholder: 'Add reviewers…',
    suggestionsLabel: 'Team members',
  },
};

export const LockedValues: Story = {
  render: (args) => {
    function Controlled() {
      const [value, setValue] = useState<string[]>(['grace', 'ada']);
      return <MultiSelect {...args} value={value} onChange={setValue} />;
    }
    return <Controlled />;
  },
  args: {
    options: peopleOptions,
    label: 'Reviewers',
    lockedValues: ['grace'],
    helperText: '"Grace Hopper" is the requester and can\'t be removed.',
  },
};

export const MaxReached: Story = {
  render: (args) => {
    function Controlled() {
      const [value, setValue] = useState<string[]>(['design', 'engineering']);
      return <MultiSelect {...args} value={value} onChange={setValue} />;
    }
    return <Controlled />;
  },
  args: {
    label: 'Teams',
    max: 2,
    helperText: 'Up to 2 teams.',
  },
};

export const NotSearchable: Story = {
  name: 'Click-to-open (searchable=false)',
  render: (args) => {
    function Controlled() {
      const [value, setValue] = useState<string[]>([]);
      return <MultiSelect {...args} value={value} onChange={setValue} />;
    }
    return <Controlled />;
  },
  args: {
    label: 'Teams',
    searchable: false,
  },
};

export const Empty: Story = {
  render: (args) => {
    function Controlled() {
      const [value, setValue] = useState<string[]>([]);
      return <MultiSelect {...args} value={value} onChange={setValue} />;
    }
    return <Controlled />;
  },
  args: {
    options: [],
    label: 'Teams',
  },
};

const SIZES = ['sm', 'md', 'lg'] as const;

export const AllSizes: Story = {
  render: (args) => {
    function Controlled() {
      const [value, setValue] = useState<string[]>(['design']);
      return (
        <div className="flex flex-col gap-4">
          {SIZES.map((size) => (
            <MultiSelect key={size} {...args} size={size} value={value} onChange={setValue} label={size} />
          ))}
        </div>
      );
    }
    return <Controlled />;
  },
};
