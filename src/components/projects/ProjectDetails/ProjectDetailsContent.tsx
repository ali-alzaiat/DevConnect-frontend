import { useMemo, useState } from 'react';
import { Task as ApiTask } from '@/api/model';
import { Task as LocalTask } from './types';
import { TaskList } from './TaskList';
import { groupTasks } from '@/lib/projectUtils';
import { TaskPriority } from '../TaskPriorityTag/constants';
import { TaskType } from '../TaskTypeTag/constants';

const mapApiStatusToLocal = (status: string): string => {
  const statusMap: Record<string, string> = {
    TO_DO: 'to-do',
    IN_PROGRESS: 'in-progress',
    DONE: 'done'
  };
  return statusMap[status] ?? status?.toLowerCase()?.replace(/_/g, '-') ?? 'to-do';
};

const mapApiTaskToLocal = (task: ApiTask, index: number): LocalTask => ({
  id: task.id,
  title: task.title,
  status: mapApiStatusToLocal(task.status),
  dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
  assignee: { id: 0, name: 'Unassigned' },
  type: TaskType.FEATURE,
  priority: TaskPriority.MEDIUM,
  order: index
});

interface ProjectDetailsContentProps {
  tasks: ApiTask[];
}

const ProjectDetailsContent = ({ tasks: apiTasks }: ProjectDetailsContentProps) => {
  const [boardTasks, setBoardTasks] = useState<LocalTask[]>(() => apiTasks.map(mapApiTaskToLocal));

  const columnTasks = useMemo(() => groupTasks(boardTasks), [boardTasks]);

  return (
    <div className="task-list flex flex-row gap-6 flex-wrap justify-between">
      <TaskList
        title="To Do"
        statusKey="to-do"
        className="to-do-list"
        columnTasks={columnTasks['to-do']}
        setBoardTasks={setBoardTasks}
      />
      <TaskList
        title="In Progress"
        statusKey="in-progress"
        className="in-progress-list"
        columnTasks={columnTasks['in-progress']}
        setBoardTasks={setBoardTasks}
      />
      <TaskList
        title="Done"
        statusKey="done"
        className="done-list"
        columnTasks={columnTasks['done']}
        setBoardTasks={setBoardTasks}
      />
    </div>
  );
};

export default ProjectDetailsContent;
