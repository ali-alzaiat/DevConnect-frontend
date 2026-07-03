import { ItemTypes } from '@/constants';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Task, TaskFormData } from './types';
import { increseCount } from './initialTasks';
import { TaskItem } from './TaskItem';
import { NewTaskButton } from './NewTaskButton';

export const TaskList = ({
  title,
  statusKey,
  className,
  columnTasks,
  setBoardTasks
}: {
  title: string;
  statusKey: string;
  className: string;
  columnTasks: Task[];
  setBoardTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const handleAddTask = (newTaskData: TaskFormData, status: string) => {
    const d = newTaskData.dueDate;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const lastTask = columnTasks.sort((a, b) => b.order - a.order)[0];
    const newTask: Task = {
      id: increseCount(),
      title: newTaskData.title,
      status: status,
      dueDate: `${year}-${month}-${day}`, // Format as YYYY-MM-DD
      type: newTaskData.type,
      priority: newTaskData.priority,
      assignee: { id: 1, name: 'Unassigned' }, // Defaulting for now
      order: lastTask ? lastTask.order + 1 : 1
    };
    setBoardTasks((prev) => [...prev, newTask]);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  const moveCard = useCallback(
    (
      dragId: number,
      dragOrder: number,
      hoverOrder: number,
      dragStatus: string,
      hoverStatus: string
    ) => {
      setBoardTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.id === dragId) {
            return { ...task, order: hoverOrder, status: hoverStatus };
          }

          const isSameColumn = dragStatus === hoverStatus;

          if (isSameColumn) {
            if (
              task.status === dragStatus &&
              dragOrder < hoverOrder &&
              task.order > dragOrder &&
              task.order <= hoverOrder
            ) {
              return { ...task, order: task.order - 1 };
            }

            if (
              task.status === dragStatus &&
              dragOrder > hoverOrder &&
              task.order < dragOrder &&
              task.order >= hoverOrder
            ) {
              return { ...task, order: task.order + 1 };
            }
          } else {
            if (task.status === dragStatus && task.order > dragOrder) {
              return { ...task, order: task.order - 1 };
            }

            if (task.status === hoverStatus && task.order >= hoverOrder) {
              return { ...task, order: task.order + 1 };
            }
          }
          return task;
        });
      });
    },
    [setBoardTasks]
  );

  const renderTaskItem = useCallback(
    (task: Task) => {
      return <TaskItem key={task.id} task={task} moveCard={moveCard} />;
    },
    [moveCard]
  );

  const setNodeRef = useCallback(
    (node: HTMLDivElement | null) => {
      drop(node);
    },
    [drop]
  );

  const renderColumnTasks = useCallback(() => {
    return columnTasks.sort((a, b) => a.order - b.order).map(renderTaskItem);
  }, [columnTasks, renderTaskItem]);

  return (
    <div
      ref={setNodeRef}
      className={`${className} p-6 rounded-lg shadow-md w-30/100 min-w-60 ${isOver ? 'bg-brand-tint text-brand' : 'bg-surface'}`}
    >
      <h2 className="text-base lg:text-xl font-semibold mb-4">{title}</h2>
      {renderColumnTasks()}
      <NewTaskButton statusKey={statusKey} onAddTask={handleAddTask} />
    </div>
  );
};
