import { Task } from '@/components/projects/ProjectDetails/types';

export const groupTasks = (tasks: Task[]) => {
  return {
    'to-do': tasks.filter((t) => t.status === 'to-do'),
    'in-progress': tasks.filter((t) => t.status === 'in-progress'),
    done: tasks.filter((t) => t.status === 'done')
  };
};
