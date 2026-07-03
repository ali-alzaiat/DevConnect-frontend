# Component Structure

## Feature Folder Layout

```
components/{Feature}/
  {Feature}.tsx                    -- Page-level component (lazy-loaded)
  {SubComponent}/
    {SubComponent}.tsx             -- Sub-component
    types.ts                       -- Types (optional, only if shared)
    constants.ts                   -- Constants (optional, only if specific to this component)
```

- Component file name matches its folder name (PascalCase).
- Feature pages are flat files in the feature folder (e.g., `projects/Projects.tsx`).

## Component Skeleton

```tsx
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/api/useGetData";

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

const MyComponent = ({ title, onAction }: MyComponentProps) => {
  const { data, isLoading } = useGetData();

  if (isLoading) return <CustomSpinner />;
  if (!data) return <EmptyContent title="No data" />;

  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={onAction}>Action</Button>
    </div>
  );
};

export { MyComponent };
```

## Import Boundaries

```
types.ts  →  types.ts only
utils/    →  types, other utils
hooks/    →  types, utils, other hooks
components/ → types, utils, hooks, other components
```

Never create circular imports. If you detect a cycle, extract the shared code into a separate file.
