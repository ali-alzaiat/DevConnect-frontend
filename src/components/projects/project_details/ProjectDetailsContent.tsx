import { useState } from 'react';
import { initialTasks } from './initialTasks';
import { Task } from './ProjectDetails';
import { TaskList } from './TaskList';

const ProjectDetailsContent = () => {
  const [boardTasks, setBoardTasks] = useState<Task[]>(initialTasks);

  return (
    <div className="task-list flex flex-row gap-6 flex-wrap justify-between">
      <TaskList
        title="To Do"
        statusKey="to-do"
        className="to-do-list"
        boardTasks={boardTasks}
        setBoardTasks={setBoardTasks}
      />
      <TaskList
        title="In Progress"
        statusKey="in-progress"
        className="in-progress-list"
        boardTasks={boardTasks}
        setBoardTasks={setBoardTasks}
      />
      <TaskList
        title="Done"
        statusKey="done"
        className="done-list"
        boardTasks={boardTasks}
        setBoardTasks={setBoardTasks}
      />
    </div>
  );
};

export default ProjectDetailsContent;
