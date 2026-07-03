# TypeScript Style

## Strictness

- `strict: true` in tsconfig. No `any`, no `as` casts unless absolutely necessary.
- When a cast is unavoidable, add a brief justification comment.

## Types vs Interfaces

- Prefer `type` for unions, intersections, and complex types.
- Prefer `interface` for object shapes that may be extended (props, DTOs).
- Either is acceptable for simple object shapes — be consistent within a file.

## File Organization

- **Types go in dedicated files** (e.g., `types.ts`, `{feature}.types.ts`).
- A type file must only import from other type files — never from components, hooks, or utils.
- Barrel exports (`index.ts`) are fine for type directories never use it for anything else.

## Naming

| Construct             | Convention      | Example                             |
| --------------------- | --------------- | ----------------------------------- |
| Variables/functions   | camelCase       | `getUser`, `isLoading`              |
| Types/interfaces      | PascalCase      | `UserProfile`, `TaskStatus`         |
| React components      | PascalCase      | `ProjectCard`, `TaskList`           |
| Files (components)    | PascalCase      | `ProjectCard.tsx`                   |
| Files (non-component) | kebab-case      | `use-mobile.ts`, `project-utils.ts` |
| Enums                 | PascalCase      | `ProjectStatus`                     |
| Enum values           | lowercase kebab | `'in-progress'`                     |

## Imports

- Use `@/` path alias for all project imports.
- Group imports: React → libraries → project modules → local relative.
- No default exports for components — prefer named exports.
