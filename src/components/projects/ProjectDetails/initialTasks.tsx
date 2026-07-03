import { TaskPriority } from '../TaskPriorityTag/constants';
import { TaskType } from '../TaskTypeTag/constants';
import { Task } from './types';

export const initialTasks: Task[] = [
  // ... your initial tasks here
  {
    id: 1,
    title: 'Task 1',
    status: 'to-do',
    dueDate: '2022-01-01',
    assignee: { id: 1, name: 'John Doe' },
    type: TaskType.FEATURE,
    priority: TaskPriority.HIGH,
    order: 0
  },
  {
    id: 8,
    title: 'Task 8',
    status: 'to-do',
    dueDate: '2022-01-01',
    assignee: { id: 1, name: 'John Doe' },
    type: TaskType.FEATURE,
    priority: TaskPriority.HIGH,
    order: 1
  },
  {
    id: 9,
    title: 'Task 9',
    status: 'to-do',
    dueDate: '2022-01-01',
    assignee: { id: 1, name: 'John Doe' },
    type: TaskType.FEATURE,
    priority: TaskPriority.HIGH,
    order: 2
  },
  {
    id: 10,
    title: 'Task 10',
    status: 'to-do',
    dueDate: '2022-01-01',
    assignee: { id: 1, name: 'John Doe' },
    type: TaskType.FEATURE,
    priority: TaskPriority.HIGH,
    order: 3
  },
  {
    id: 11,
    title: 'Task 11',
    status: 'to-do',
    dueDate: '2022-01-01',
    assignee: { id: 1, name: 'John Doe' },
    type: TaskType.FEATURE,
    priority: TaskPriority.HIGH,
    order: 4
  },
  {
    id: 2,
    title: 'Task 2',
    status: 'in-progress',
    dueDate: '2022-01-02',
    assignee: { id: 2, name: 'Jane Doe' },
    type: TaskType.FEATURE,
    priority: TaskPriority.MEDIUM,
    order: 0
  },
  {
    id: 6,
    title: 'Task 6',
    status: 'in-progress',
    dueDate: '2022-01-02',
    assignee: { id: 2, name: 'Jane Doe' },
    type: TaskType.FEATURE,
    priority: TaskPriority.MEDIUM,
    order: 1
  },
  {
    id: 7,
    title: 'Task 7',
    status: 'in-progress',
    dueDate: '2022-01-02',
    assignee: { id: 2, name: 'Jane Doe' },
    type: TaskType.FEATURE,
    priority: TaskPriority.MEDIUM,
    order: 2
  },
  {
    id: 3,
    title: 'Task 3',
    status: 'done',
    dueDate: '2022-01-03',
    assignee: { id: 1, name: 'John Doe' },
    type: TaskType.FEATURE,
    priority: TaskPriority.LOW,
    order: 0
  },
  {
    id: 4,
    title: 'Task 4',
    status: 'done',
    dueDate: '2022-01-04',
    assignee: { id: 2, name: 'Jane Doe' },
    type: TaskType.FEATURE,
    priority: TaskPriority.HIGH,
    order: 1
  },
  {
    id: 5,
    title: 'Task 5',
    status: 'done',
    dueDate: '2022-01-04',
    assignee: { id: 2, name: 'Jane Doe' },
    type: TaskType.FEATURE,
    priority: TaskPriority.HIGH,
    order: 2
  }
];

export let count = initialTasks.length;
export const increseCount = () => ++count;
