import type { Meta, StoryObj } from '@storybook/react';
import TaskPriorityTag from './TaskPriorityTag';
import { TaskPriority } from './constants';

const meta = {
  title: 'Projects/TaskPriorityTag',
  component: TaskPriorityTag
} satisfies Meta<typeof TaskPriorityTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const High: Story = {
  args: { priority: TaskPriority.HIGH }
};

export const Medium: Story = {
  args: { priority: TaskPriority.MEDIUM }
};

export const Low: Story = {
  args: { priority: TaskPriority.LOW }
};
