# Testing Rules

## Test Types

| Level | What | Tool | Location |
|---|---|---|---|
| Unit | Hooks, utils, pure functions | Vitest | Co-located (`*.test.ts`) |
| Integration | Component + API mock + assertions | Vitest + Testing Library + MSW | Co-located or `__tests__/` |
| E2E | Critical user journeys | Playwright | `e2e/` |

## Guidelines

1. **Every hook must have a unit test** covering: happy path, loading, error, empty.
2. **Every util must have a unit test** covering edge cases.
3. **Every feature page must have an integration test** rendering with mock data.
4. Use **generated MSW handlers** from Orval for integration tests — never mock fetch manually.
5. Write tests that assert behavior, not implementation. Prefer testing DOM output over internal state.
6. Aim for > 80% coverage on hooks/utils, > 70% on components.

## Patterns

```ts
// Hook test
it('returns user data on successful login', async () => {
  const { result } = renderHook(() => useLogin());
  // ...
});

// Component test
it('renders project list', async () => {
  render(<ProjectsListContent />);
  expect(screen.getByText('My Project')).toBeInTheDocument();
});
```
