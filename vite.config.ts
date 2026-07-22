import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Dev/Storybook config only. The actual package build (library mode, type
 * declarations, externalized peer deps) lives in vite.lib.config.ts — kept
 * separate so Storybook's Vite discovery never picks up lib-mode build
 * options meant for `npm run build`.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
