import type { Preview } from '@storybook/react-vite';
import { useEffect } from 'react';
import '../src/styles/globals.css';

/**
 * A toolbar-driven theme switcher, so every story can be previewed in both
 * light and dark mode without duplicating stories. Dark mode is applied the
 * same way a consumer app would apply it: toggling the `.dark` class on the
 * document root (see @custom-variant dark in styles/globals.css).
 */
const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'light';

      useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }, [theme]);

      return (
        <div className="bg-bg-default text-fg-default min-h-24 rounded-md p-6">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
