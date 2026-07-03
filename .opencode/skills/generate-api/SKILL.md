---
name: generate-api
description: Regenerate the Orval API client from the backend OpenAPI spec
license: MIT
compatibility: opencode
metadata:
  repo: DevConnect-frontend
  type: command
---

## What I do

Regenerate the TypeScript API types, TanStack Query hooks, and MSW mocks from the backend's Swagger spec.

## When to use me

Use this skill after any backend endpoint change:
- New route added
- DTO modified (fields added/removed/renamed)
- Swagger decorators updated
- At the start of a fresh checkout to ensure alignment

## How to Run

```bash
cd DevConnect-frontend
npm run generate-api
```

## What It Does

1. Fetches the OpenAPI spec from `VITE_BACKEND_URL/api-yaml`.
2. Orval generates:
   - TypeScript interfaces in `src/api/model/`
   - TanStack Query hooks + MSW mocks in `src/api/generated/`
3. The output is formatted with Prettier.

## Verification

1. Confirm no TypeScript errors: `npm run build` (or `tsc -b`).
2. Check that any new hook imports resolve correctly.
3. Run the test suite: `npm test`.

## Common Issues

- **Backend not running**: ensure `VITE_BACKEND_URL` points to a running backend instance.
- **Missing endpoints**: check the backend has Swagger decorators on the new route.
- **Type mismatches**: if Orval generates unexpected types, review the backend DTO and Swagger decorators.