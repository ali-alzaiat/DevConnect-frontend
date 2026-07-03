/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';
import { TaskItem } from './TaskItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fn } from '@storybook/test';
import { TaskType } from '../TaskTypeTag/constants';
import { TaskPriority } from '../TaskPriorityTag/constants';

const meta = {
  title: 'Projects/TaskItem',
  component: TaskItem,
  decorators: [
    (Story: any) => (
      <DndProvider backend={HTML5Backend}>
        <Story />
      </DndProvider>
    )
  ]
} satisfies Meta<typeof TaskItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: {
      id: 1,
      title: 'Sample Task',
      status: 'to-do',
      dueDate: '2026-12-31',
      assignee: { id: 1, name: 'John Doe' },
      type: TaskType.FEATURE,
      priority: TaskPriority.HIGH,
      order: 0
    },
    moveCard: fn()
  }
};

export const Overdue: Story = {
  args: {
    task: {
      id: 2,
      title: 'Overdue Task',
      status: 'to-do',
      dueDate: '2020-01-01',
      assignee: { id: 2, name: 'Jane Doe' },
      type: TaskType.BUG,
      priority: TaskPriority.MEDIUM,
      order: 1
    },
    moveCard: fn()
  }
};
