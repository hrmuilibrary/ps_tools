import {
  tailwindBorderRadius,
  tailwindBoxShadow,
  tailwindColors,
  tailwindFontFamily,
  tailwindFontSize,
} from './tokens';

/**
 * Minimal shape of the config fragment we export. Kept local instead of
 * importing Tailwind's own config type so this file has zero build-time
 * dependency on `tailwindcss` internals — it's just plain data.
 */
export interface UiPreset {
  darkMode: 'class';
  theme: {
    extend: {
      colors: typeof tailwindColors;
      borderRadius: typeof tailwindBorderRadius;
      boxShadow: typeof tailwindBoxShadow;
      fontFamily: typeof tailwindFontFamily;
      fontSize: typeof tailwindFontSize;
    };
  };
}

/**
 * Tailwind preset for consumer apps still on a JS config (Tailwind v3, or
 * v4 via the `@config` compatibility directive). Spread it into your own
 * config's `presets` array:
 *
 * ```js
 * // tailwind.config.js
 * import { uiPreset } from '@ps-tools/ui/preset';
 *
 * export default {
 *   presets: [uiPreset],
 *   content: [
 *     './src/**\/*.{ts,tsx}',
 *     './node_modules/@ps-tools/ui/dist/**\/*.js',
 *   ],
 * };
 * ```
 *
 * Native Tailwind v4 CSS-config consumers don't need this — importing
 * `@ps-tools/ui/styles.css` already registers every token via `@theme inline`.
 */
export const uiPreset: UiPreset = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: tailwindColors,
      borderRadius: tailwindBorderRadius,
      boxShadow: tailwindBoxShadow,
      fontFamily: tailwindFontFamily,
      fontSize: tailwindFontSize,
    },
  },
};

export default uiPreset;
