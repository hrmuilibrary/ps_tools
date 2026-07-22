import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';
import type { PaginationProps } from './Pagination.types';

// Pagination is a controlled component (no internal page state), so every
// story renders a small wrapper that owns `page` and wires it back through
// `onPageChange` — this is what makes the controls in Storybook interactive
// instead of just re-rendering the same page on every click.
function Controlled(args: Omit<PaginationProps, 'page' | 'onPageChange'> & { page: number }) {
  const [page, setPage] = useState(args.page);
  return <Pagination {...args} page={page} onPageChange={setPage} />;
}

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  // Docs page is authored by hand in Pagination.docs.mdx instead of the
  // `autodocs` tag, per the architecture's Component.docs.mdx convention.
  parameters: {
    layout: 'centered',
  },
  args: {
    page: 1,
    pageCount: 10,
    siblingCount: 1,
    boundaryCount: 1,
  },
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const MiddleOfRange: Story = {
  args: { page: 5, pageCount: 10 },
};

export const LastPage: Story = {
  args: { page: 10, pageCount: 10 },
};

export const FewPages: Story = {
  name: 'Few pages (no ellipsis needed)',
  args: { page: 2, pageCount: 4 },
};

export const ManyPages: Story = {
  name: 'Many pages (both ellipses)',
  args: { page: 50, pageCount: 100 },
};

export const WiderSiblingCount: Story = {
  args: { page: 10, pageCount: 20, siblingCount: 2 },
};

export const WiderBoundaryCount: Story = {
  args: { page: 10, pageCount: 20, boundaryCount: 2 },
};

export const CustomAriaLabel: Story = {
  name: 'Custom aria-label',
  args: { 'aria-label': 'Search results pages' },
};

export const CustomClassName: Story = {
  name: 'Overriding classes via className',
  args: {
    page: 3,
    pageCount: 8,
    className: 'gap-2 p-2 bg-bg-container rounded-lg',
  },
};
