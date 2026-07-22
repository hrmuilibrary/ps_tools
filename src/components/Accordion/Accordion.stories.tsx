import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, CreditCard, HelpCircle, Shield } from 'lucide-react';
import { Accordion, AccordionItem } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  // Docs page is authored by hand in Accordion.docs.mdx instead of the
  // `autodocs` tag, per the architecture's Component.docs.mdx convention.
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
  },
  args: {
    type: 'single',
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <Accordion {...args} defaultValue="billing" className="w-96">
      <AccordionItem value="billing" title="How does billing work?">
        Billing is monthly, based on active seats. Upgrading or downgrading prorates automatically
        on your next invoice.
      </AccordionItem>
      <AccordionItem value="cancel" title="Can I cancel anytime?">
        Yes — cancel from account settings and access continues through the end of the current
        billing period.
      </AccordionItem>
      <AccordionItem value="support" title="What support is included?">
        All plans include email support; Enterprise plans add a dedicated Slack channel and a 1-hour
        response SLA.
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: { type: 'multiple' },
  render: (args) => (
    <Accordion {...args} defaultValue={['billing', 'support']} className="w-96">
      <AccordionItem value="billing" title="How does billing work?">
        Billing is monthly, based on active seats. Upgrading or downgrading prorates automatically
        on your next invoice.
      </AccordionItem>
      <AccordionItem value="cancel" title="Can I cancel anytime?">
        Yes — cancel from account settings and access continues through the end of the current
        billing period.
      </AccordionItem>
      <AccordionItem value="support" title="What support is included?">
        All plans include email support; Enterprise plans add a dedicated Slack channel and a 1-hour
        response SLA.
      </AccordionItem>
    </Accordion>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Accordion {...args} defaultValue="billing" className="w-96">
      <AccordionItem value="billing" title="Billing" icon={<CreditCard className="size-4" />}>
        Billing is monthly, based on active seats.
      </AccordionItem>
      <AccordionItem value="notifications" title="Notifications" icon={<Bell className="size-4" />}>
        Configure which events trigger an email or in-app notification.
      </AccordionItem>
      <AccordionItem value="security" title="Security" icon={<Shield className="size-4" />}>
        Enable SSO and enforce two-factor authentication for your workspace.
      </AccordionItem>
      <AccordionItem value="help" title="Help & FAQ" icon={<HelpCircle className="size-4" />}>
        Browse the knowledge base or contact support for anything else.
      </AccordionItem>
    </Accordion>
  ),
};

export const DisabledItem: Story = {
  name: 'Disabled item',
  render: (args) => (
    <Accordion {...args} defaultValue="billing" className="w-96">
      <AccordionItem value="billing" title="How does billing work?">
        Billing is monthly, based on active seats.
      </AccordionItem>
      <AccordionItem value="legacy" title="Legacy plans (unavailable)" disabled>
        Legacy plans are no longer available to new customers.
      </AccordionItem>
      <AccordionItem value="support" title="What support is included?">
        All plans include email support.
      </AccordionItem>
    </Accordion>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    function ControlledExample() {
      const [value, setValue] = useState('billing');
      return (
        <Accordion
          {...args}
          value={value}
          onValueChange={(next) => setValue(next as string)}
          className="w-96"
        >
          <AccordionItem value="billing" title="How does billing work?">
            Billing is monthly, based on active seats.
          </AccordionItem>
          <AccordionItem value="cancel" title="Can I cancel anytime?">
            Yes — cancel from account settings anytime.
          </AccordionItem>
        </Accordion>
      );
    }
    return <ControlledExample />;
  },
};

export const CustomClassName: Story = {
  name: 'Overriding classes via className',
  render: (args) => (
    <Accordion {...args} defaultValue="billing" className="w-96 border-brand-500 shadow-z3">
      <AccordionItem value="billing" title="How does billing work?">
        Billing is monthly, based on active seats.
      </AccordionItem>
      <AccordionItem value="cancel" title="Can I cancel anytime?">
        Yes — cancel from account settings anytime.
      </AccordionItem>
    </Accordion>
  ),
};
