---
name: storybook
description: Write Storybook stories for frontend components
license: MIT
compatibility: opencode
metadata:
  repo: DevConnect-frontend
  type: documentation
---

## What I do

Provide the standard structure and required stories for documenting UI components in Storybook.

## When to use me

Use this skill when creating or updating Storybook stories for any component in the DevConnect frontend.

## File Location

Place stories next to the component:
```
components/{Feature}/{Component}/{Component}.stories.tsx
```

## Story Structure

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./MyComponent";

const meta = {
  title: "Features/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: { title: "Loading state" },
  // decorate with mocked loading state
};

export const Empty: Story = {
  args: { title: "No data" },
};

export const Populated: Story = {
  args: {
    title: "My Title",
    data: [/* mock data */],
  },
};

export const Error: Story = {
  args: { title: "Error state" },
  // decorate with error state
};
```

## What to Cover

Every component should have stories for:
- **Loading** – spinner or skeleton visible
- **Empty** – no data message shown
- **Populated** – data renders correctly
- **Error** – error message visible

Use MSW decorators to simulate API states for data-driven components.