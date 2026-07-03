import { TaskType } from '../TaskTypeTag/constants';
import { TaskPriority } from '../TaskPriorityTag/constants';

export type Task = {
  id: number;
  title: string;
  status: string;
  dueDate: string;
  assignee: { id: number; name: string };
  type: TaskType;
  priority: TaskPriority;
  order: number;
};

export type TaskFormData = {
  title: string;
  priority: TaskPriority;
  type: TaskType;
  dueDate: Date;
};

export type TaskDragItem = {
  id: number;
  order: number;
  status: string;
};
