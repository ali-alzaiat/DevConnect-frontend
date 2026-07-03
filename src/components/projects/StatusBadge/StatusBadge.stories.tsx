import type { Meta, StoryObj } from '@storybook/react';
import StatusBadge from './StatusBadge';
import { ProjectStatus } from './constants';

const meta = {
  title: 'Projects/StatusBadge',
  component: StatusBadge
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: { status: ProjectStatus.Active }
};

export const Idle: Story = {
  args: { status: ProjectStatus.Idle }
};

export const Review: Story = {
  args: { status: ProjectStatus.Review }
};

export const Archived: Story = {
  args: { status: ProjectStatus.Archived }
};
