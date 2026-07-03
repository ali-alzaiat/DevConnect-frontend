import type { Meta, StoryObj } from '@storybook/react';
import TaskTypeTag from './TaskTypeTag';
import { TaskType } from './constants';

const meta = {
  title: 'Projects/TaskTypeTag',
  component: TaskTypeTag
} satisfies Meta<typeof TaskTypeTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Feature: Story = {
  args: { type: TaskType.FEATURE }
};

export const Bug: Story = {
  args: { type: TaskType.BUG }
};

export const Docs: Story = {
  args: { type: TaskType.DOCS }
};
