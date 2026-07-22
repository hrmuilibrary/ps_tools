import type { Meta, StoryObj } from '@storybook/react-vite';
import { shadows } from '../tokens';

/**
 * Reference page for the elevation scale. Uses the real `shadow-z*` utility
 * classes generated from the `--shadow-*` theme namespace in
 * styles/tokens.css, on a bg-container backdrop so shadows read clearly in
 * both light and dark mode.
 */
const meta = {
  title: 'Foundations/Shadows',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Tile({ className, name, value }: { className: string; name: string; value: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className={`bg-bg-default h-24 w-40 rounded-lg ${className}`} />
      <div className="text-label-sm text-fg-default font-medium">shadow-{name}</div>
      <div className="text-p-xs text-fg-tertiary max-w-40 font-mono break-words">{value}</div>
    </div>
  );
}

export const Scale: Story = {
  render: () => (
    <div className="bg-bg-container flex flex-wrap gap-10 rounded-xl p-8">
      <Tile className="shadow-z1" name="z1" value={shadows.z1} />
      <Tile className="shadow-z2" name="z2" value={shadows.z2} />
      <Tile className="shadow-z3" name="z3" value={shadows.z3} />
      <Tile className="shadow-z4" name="z4" value={shadows.z4} />
      <Tile className="shadow-z5" name="z5" value={shadows.z5} />
    </div>
  ),
};
