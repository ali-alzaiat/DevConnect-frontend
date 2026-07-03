# DevConnect Frontend — AI Instructions

## Stack

React 19, Vite 8, TanStack Query v5, Zustand, Tailwind v4, shadcn/ui, react-router v7, react-hook-form + zod, react-dnd, MSW, Orval, Storybook.

## Architecture

- **Feature-based folders** under `src/components/`. Each feature has subfolders per component (e.g., `projects/NewProject/NewProject.tsx`).
- **Atomic design**: `ui/` (atoms — shadcn primitives), `components/` features (molecules), pages/templates (composed views).
- **Route-based lazy loading**: All pages are lazy-loaded via `React.lazy()` in `App.tsx`.
- **API layer**: Orval generates TanStack Query hooks + types + MSW mocks from the backend's OpenAPI spec.
- **State**: Server state via TanStack Query. Client state via Zustand **only when necessary** — prefer local state + React Query cache.

## Hard Rules

### Types

- Types live in **dedicated files**. Each type file must only import from other type files.
- Never import from components, hooks, utils, or lib inside a type file.
- Never redefine API shapes — import from `@/api/model/`.

### Hooks & Utils

- Hooks can import types and other utils/hooks. Never import components.
- Utils can import types and other utils. Never import components or hooks.

### Components

- Functional components only. No classes.
- Props are typed as `interface` or `type` in the same file (or imported from a nearby `types.ts` for shared props).
- **No circular dependencies** — if A imports B, B must not import A (directly or transitively).

### API Contract

- Run `npm run generate-api` after every backend endpoint change.
- Never manually edit files under `src/api/generated/` or `src/api/model/` — they are overwritten.
- If Orval cannot express what you need, update the backend's Swagger decorators first.

### Styling

- Use Tailwind v4 utilities from the project's design tokens (defined in `src/index.css` via `@theme inline`).
- Use the existing color palette (`--color-brand`, `--color-surface`, etc.). Extend it in `index.css` if needed.
- shadcn/ui components use `cn()` from `@/lib/utils` and `cva()` from `class-variance-authority`.

### Testing

- Unit test hooks, utils, and pure functions.
- Integration test feature behaviors (render + API mock + assertions).
- E2E test critical paths (auth, project CRUD).
- Use generated MSW handlers from Orval for integration tests.

### Documentation

- Storybook for all UI components (atoms, molecules, feature components).
- Stories should cover loading, empty, error, and success states.

### Performance

- Lazy load all route-level components.
- Use `React.memo` only when profiling shows a bottleneck — not preemptively.
- Keep bundle size in check: no unnecessary re-renders, no large libraries without approval.

### No Comments

- Do not add comments to code. Use descriptive names and TypeScript types.
- Exception: JSDoc on public API of shared hooks/utils if the signature is non-obvious.

## Folder Structure

```
src/
  api/
    generated/       -- Orval output (auth, projects, articles, snippets, users)
    model/           -- Orval-generated TypeScript interfaces (index.ts barrel)
  components/
    ui/              -- shadcn/ui primitives (atoms)
    general/         -- shared app components (Header, Card, ProtectedRoute, etc.)
    {feature}/       -- feature folders (home, login, projects, snippets, etc.)
      {Component}/   -- subfolder per component group
        {Component}.tsx
        constants.ts
        types.ts     -- if types are shared within the feature
    layout/          -- app shell (Layout, Sidebar)
  hooks/
    api/             -- custom wrappers around Orval-generated hooks
    use-mobile.ts
    useLogout.ts
  lib/               -- pure utility functions (no React imports)
  contexts/          -- React context providers (theme, form field, sidebar)
  constants.ts       -- app-wide constants (drag types, CVA variants)
  index.css          -- Tailwind v4 base + design tokens
  App.tsx            -- router configuration
  main.tsx           -- entry point (providers hierarchy)
  vite-env.d.ts
```

## Git

- Conventional commits (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`).
- `npm run lint` and `npm run format` before every commit.
- Husky + Commitlint enforce commit message format.
