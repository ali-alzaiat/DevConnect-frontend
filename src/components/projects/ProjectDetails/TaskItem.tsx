import InitialsAvatar from '@/components/general/InitialsAvatar';
import { ItemTypes } from '@/constants';
import clsx from 'clsx';
import { CalendarIcon } from 'lucide-react';
import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import TaskPriorityTag from '../TaskPriorityTag/TaskPriorityTag';
import TaskTypeTag from '../TaskTypeTag/TaskTypeTag';
import { Task, TaskDragItem } from './ProjectDetails';
import { Identifier, XYCoord } from 'dnd-core';

export const TaskItem = ({
  task,
  moveCard
}: {
  task: Task;
  moveCard: (
    dragId: number,
    dragIndex: number,
    hoverIndex: number,
    statusContext: string,
    newStatus: string
  ) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<TaskDragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.TASK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: TaskDragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.order;
      const dragStatus = item.status;
      const hoverIndex = task.order;
      const hoverStatus = task.status;

      if (dragIndex === hoverIndex && dragStatus === hoverStatus) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      if (dragStatus == hoverStatus) {
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      }

      moveCard(item.id, dragIndex, hoverIndex, dragStatus, hoverStatus);
      item.order = hoverIndex;
      item.status = hoverStatus;
    }
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: task.id, order: task.order, status: task.status },
    isDragging: (monitor) => monitor.getItem().id === task.id,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));
  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`mb-2 bg-topbar rounded-md border border-transparent hover:border-brand transition-colors p-3 cursor-pointer ${isDragging ? 'opacity-50' : ''}`}
    >
      <span className="text-lg font-medium text-primary">{task.title}</span>
      <div className="flex items-center gap-2 flex-wrap mt-2">
        <TaskPriorityTag priority={task.priority} />
        <TaskTypeTag type={task.type} />
        <span
          className={clsx(
            'flex items-center gap-1 text-xs ml-auto',
            new Date(task.dueDate) < new Date() ? 'text-error' : 'text-secondary'
          )}
        >
          <CalendarIcon className="size-3" />
          {task.dueDate}
        </span>
        <InitialsAvatar name={task.assignee.name} index={task.assignee.id || 0} />
      </div>
    </div>
  );
};
