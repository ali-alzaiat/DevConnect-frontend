/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';
import ProjectsListContent from './ProjectsListContent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
});

const meta = {
  title: 'Projects/ProjectsListContent',
  component: ProjectsListContent,
  decorators: [
    (Story: any) => (
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof ProjectsListContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
