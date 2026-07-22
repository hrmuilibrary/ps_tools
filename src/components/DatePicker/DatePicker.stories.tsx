import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import type { DateRange } from './DatePicker.types';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  // Docs page is authored by hand in DatePicker.docs.mdx instead of the
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
    placeholder: 'Select date',
    size: 'md',
    fullWidth: false,
    range: false,
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Start date',
  },
};

export const Controlled: Story = {
  render: (args) => {
    function ControlledDatePicker() {
      const [value, setValue] = useState<Date | null>(new Date());
      return <DatePicker {...args} value={value} onChange={setValue} />;
    }
    return <ControlledDatePicker />;
  },
  args: {
    label: 'Start date',
  },
};

export const RangeMode: Story = {
  render: (args) => {
    function ControlledRangePicker() {
      const [range, setRange] = useState<DateRange>({ start: null, end: null });
      return <DatePicker {...args} range rangeValue={range} onChangeRange={setRange} />;
    }
    return <ControlledRangePicker />;
  },
  args: {
    label: 'Trip dates',
    placeholder: 'Select date range',
  },
};

export const FullWidth: Story = {
  args: { fullWidth: true, label: 'Start date' },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

const SIZES = ['sm', 'md', 'lg'] as const;

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {SIZES.map((size) => (
        <DatePicker key={size} {...args} size={size} label={size} />
      ))}
    </div>
  ),
};
