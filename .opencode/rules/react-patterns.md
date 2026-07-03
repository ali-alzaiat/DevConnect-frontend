# React Patterns

## Component Rules

1. **Functional only** — no class components. Use hooks for state and side effects.
2. **Lazy load** all route-level components via `React.lazy()`.
3. **Small focused components** — if a component exceeds ~150 lines, extract subcomponents.
4. **No prop drilling beyond 2 levels** — compose or use context. For shared server data, let TanStack Query handle it.

## Custom Hooks

1. Extract complex logic into custom hooks (data fetching, form state, drag-and-drop).
2. Hooks must be pure — no side effects in the hook body (use `useEffect` explicitly).
3. Hook naming: `use<Feature><Action>` e.g. `useLogin`, `useProjectTasks`.

## State Management

1. **Server state** → TanStack Query (via Orval-generated hooks). Use `staleTime` and `gcTime` wisely.
2. **Client state** → local `useState`/`useReducer`. Use Zustand **only** when state must be shared across unrelated components.
3. Do not put server-derived data in Zustand.

## Design System (Atomic Design)

- **Atoms** (`src/components/ui/`): shadcn primitives. Single-purpose, no business logic.
- **Molecules** (feature subfolders): composed atoms + some logic. Reusable within a feature.
- **Organisms/Templates** (page components): composed molecules, connected to data.
- Use the project's color palette (`--color-*` tokens from `index.css`). Extend via CSS variables, never hardcode hex values.
