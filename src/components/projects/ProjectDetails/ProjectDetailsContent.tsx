import { useMemo, useState } from 'react';
import { initialTasks } from './initialTasks';
import { Task } from './types';
import { TaskList } from './TaskList';
import { groupTasks } from '@/lib/projectUtils';

const ProjectDetailsContent = () => {
  const [boardTasks, setBoardTasks] = useState<Task[]>(initialTasks);

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
