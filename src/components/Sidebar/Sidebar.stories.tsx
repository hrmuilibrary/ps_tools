import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, Home, Settings, ShieldCheck, Users } from 'lucide-react';
import { Sidebar, SidebarItem } from './Sidebar';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  // Docs page is authored by hand in Sidebar.docs.mdx instead of the
  // `autodocs` tag, per the architecture's Component.docs.mdx convention.
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Acme Inc.',
    subtitle: 'Workspace',
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <div className="h-[28rem]">
      <Sidebar {...args}>
        <SidebarItem icon={<Home className="size-4" />} label="Home" active />
        <SidebarItem icon={<Users className="size-4" />} label="Team" />
        <SidebarItem icon={<Bell className="size-4" />} label="Notifications" badge="3" />
        <SidebarItem icon={<Settings className="size-4" />} label="Settings" />
      </Sidebar>
    </div>
  ),
};

export const Collapsed: Story = {
  args: { defaultCollapsed: true },
  render: (args) => (
    <div className="h-[28rem]">
      <Sidebar {...args}>
        <SidebarItem icon={<Home className="size-4" />} label="Home" active />
        <SidebarItem icon={<Users className="size-4" />} label="Team" />
        <SidebarItem icon={<Bell className="size-4" />} label="Notifications" badge="3" />
        <SidebarItem icon={<Settings className="size-4" />} label="Settings" />
      </Sidebar>
    </div>
  ),
};

export const WithNestedItems: Story = {
  name: 'With nested items',
  render: (args) => (
    <div className="h-[28rem]">
      <Sidebar {...args}>
        <SidebarItem icon={<Home className="size-4" />} label="Home" active />
        <SidebarItem icon={<Users className="size-4" />} label="Team" active>
          <SidebarItem label="Members" />
          <SidebarItem label="Invitations" />
          <SidebarItem label="Roles" />
        </SidebarItem>
        <SidebarItem icon={<ShieldCheck className="size-4" />} label="Security" />
        <SidebarItem icon={<Settings className="size-4" />} label="Settings" />
      </Sidebar>
    </div>
  ),
};

export const AsLinks: Story = {
  name: 'As links',
  render: (args) => (
    <div className="h-[28rem]">
      <Sidebar {...args}>
        <SidebarItem icon={<Home className="size-4" />} label="Home" href="#home" active />
        <SidebarItem icon={<Users className="size-4" />} label="Team" href="#team" />
        <SidebarItem icon={<Settings className="size-4" />} label="Settings" href="#settings" />
      </Sidebar>
    </div>
  ),
};

export const WithoutLogoOrTitle: Story = {
  name: 'Without logo or title',
  args: { title: undefined, subtitle: undefined },
  render: (args) => (
    <div className="h-[28rem]">
      <Sidebar {...args}>
        <SidebarItem icon={<Home className="size-4" />} label="Home" active />
        <SidebarItem icon={<Users className="size-4" />} label="Team" />
        <SidebarItem icon={<Settings className="size-4" />} label="Settings" />
      </Sidebar>
    </div>
  ),
};

export const CustomClassName: Story = {
  name: 'Overriding classes via className',
  render: (args) => (
    <div className="h-[28rem]">
      <Sidebar {...args} className="border-brand-500 shadow-z3">
        <SidebarItem icon={<Home className="size-4" />} label="Home" active />
        <SidebarItem icon={<Users className="size-4" />} label="Team" />
        <SidebarItem icon={<Settings className="size-4" />} label="Settings" />
      </Sidebar>
    </div>
  ),
};
