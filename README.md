# Design System

An enterprise React component library and design system built on
[Tailwind CSS v4](https://tailwindcss.com/) and React 19. It ships as an ESM
package with a separately-built stylesheet and an optional Tailwind
v3-style preset for consumers still on a JS config.

## Stack

- React 19
- Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js`)
- TypeScript 5.9
- Storybook 10 (`@storybook/react-vite`)
- Vite 8
- `class-variance-authority`, `clsx` + `tailwind-merge`
- `lucide-react` for icons
- ESLint 9 flat config + Prettier

## Design tokens

Tokens (palette, semantic aliases, radii, shadows, typography) are defined
in two parallel representations that are kept in sync by hand:

- **CSS custom properties** — `src/styles/tokens.css` (raw palette scales,
  radii, shadows, typography) and `src/styles/theme.css` (semantic
  aliases + dark mode), both using Tailwind v4's `@theme { ... }` directive.
  `src/styles/globals.css` is the entry point.
- **JS/TS token objects** — `src/tokens/*.ts`, plus a Tailwind v3-style
  preset at `src/tailwind/preset.ts` for consumers on a JS Tailwind config.

Prefer semantic aliases (`bg-default`, `fg-brand`, `border-danger`, ...)
over raw palette classes (`brand-500`, `red-700`, ...) in component code.

## Component architecture

Each component lives under `src/components/<Name>/` with a fixed file set:

```
src/components/<Name>/
  <Name>.tsx          # implementation
  <Name>.types.ts     # exported prop types
  <Name>.stories.tsx  # Storybook stories
  <Name>.docs.mdx     # hand-authored docs page
  index.ts            # barrel: re-export the component + its types
```

## Getting started

```bash
npm install
npm run dev              # Storybook dev server on port 6008
```

## Scripts

```bash
npm run build            # tsc --noEmit -> vite build (lib) -> build:css (Tailwind CLI)
npm run build:storybook  # storybook build
npm run lint              # eslint .
npm run format            # prettier --write .
```

## License

MIT
