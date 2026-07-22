import type { Meta, StoryObj } from '@storybook/react-vite';
import { radius } from '../tokens';

/**
 * Reference page for the border-radius scale. Uses the real `rounded-*`
 * utility classes — Tailwind v4 maps the `--radius-*` theme namespace to
 * `rounded-*` directly, so these are the same classes components use.
 */
const meta = {
  title: 'Foundations/Radius',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Tile({ className, name, value }: { className: string; name: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`bg-bg-brand-lighter border-border-brand h-20 w-20 border ${className}`} />
      <div className="text-label-sm text-fg-default font-medium">rounded-{name}</div>
      <div className="text-p-xs text-fg-tertiary font-mono">{value}</div>
    </div>
  );
}

export const Scale: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-6">
      <Tile className="rounded-xs" name="xs" value={radius.xs} />
      <Tile className="rounded-sm" name="sm" value={radius.sm} />
      <Tile className="rounded-md" name="md" value={radius.md} />
      <Tile className="rounded-lg" name="lg" value={radius.lg} />
      <Tile className="rounded-xl" name="xl" value={radius.xl} />
      <Tile className="rounded-2xl" name="2xl" value={radius['2xl']} />
      <Tile className="rounded-3xl" name="3xl" value={radius['3xl']} />
      <Tile className="rounded-full" name="full" value={radius.full} />
    </div>
  ),
};
