# API Contract Rules

## Source of Truth

The backend's **Swagger spec** is the single source of truth for the API contract.

## Generation

1. Run `npm run generate-api` (orval) after any backend endpoint change.
2. The command fetches the OpenAPI spec from `${VITE_BACKEND_URL}/api-yaml` and regenerates:
   - `src/api/model/` — TypeScript interfaces
   - `src/api/generated/` — TanStack Query hooks + MSW mocks

## What Not To Do

- ❌ Never manually edit files in `src/api/generated/` or `src/api/model/`. They are overwritten.
- ❌ Never redefine an API shape in component code. Import from `@/api/model/`.
- ❌ Never bypass the generated hooks — use them even for simple queries.

## Custom Hooks Around Generated Hooks

Wrap generated hooks in `src/hooks/api/` to add app-specific side effects (navigation, toasts, auth):

```ts
const useLogin = () => {
  const navigate = useNavigate();
  return useLoginGenerated({
    mutation: {
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.token);
        navigate("/home");
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    },
  });
};
```

## If You Need a Different Shape

If the generated types do not match what the UI needs:
1. Check if the backend DTO can be updated.
2. If not, derive a view-specific type from the generated type — never alter the original.
