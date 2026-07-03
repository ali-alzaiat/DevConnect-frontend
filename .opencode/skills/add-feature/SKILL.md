---
name: add-feature
description: Create a new frontend feature with components, hooks, routes, and tests
license: MIT
compatibility: opencode
metadata:
  repo: DevConnect-frontend
  type: workflow
---

## What I do

Guide you through creating a complete frontend feature in the DevConnect codebase, from API generation to route registration.

## When to use me

Use this skill when adding a new page, component group, or feature area that requires:
- New API endpoints (coordinate with backend first)
- Feature components under `src/components/{Feature}/`
- Custom hooks wrapping generated Orval hooks
- Lazy-loaded route registration in `App.tsx`
- Storybook stories and tests

## Steps

1. **Read the AGENTS.md** at frontend root for conventions.
2. **Identify the API endpoints** needed. If they don't exist, create them in the backend first.
3. **Generate the API client**: run `npm run generate-api` in the frontend.
4. **Create the feature folder** under `src/components/{Feature}/`.

   If the feature has sub-components, create subfolders:
   ```
   src/components/{Feature}/
     {Feature}.tsx
     {SubComponent1}/
       {SubComponent1}.tsx
       types.ts
       constants.ts
     {SubComponent2}/
       {SubComponent2}.tsx
   ```

5. **Create types** (if needed) in `types.ts` files — only import from other type files.
6. **Create custom hooks** in `src/hooks/api/` wrapping generated hooks, or in a `hooks/` subfolder if feature-specific.
7. **Create the page component** — compose subcomponents, use hooks, handle loading/empty/error states.
8. **Add the route** in `src/App.tsx` — import via `React.lazy()` and wrap in `<ProtectedRoute>` if needed.
9. **Write stories** in Storybook covering loading, empty, error, and populated states.
10. **Write tests** — unit tests for hooks/utils, integration tests for the feature page.
11. **Run lint + typecheck** before committing.

## Files to Check Before Starting

- `src/api/model/` — existing API types
- `src/api/generated/` — existing hooks
- `src/components/` — similar feature for pattern reference
- `src/hooks/api/` — existing custom hooks for pattern reference
- `src/App.tsx` — router configuration