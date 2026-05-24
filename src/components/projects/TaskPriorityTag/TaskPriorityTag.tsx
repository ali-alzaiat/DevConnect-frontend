import { Badge } from '@/components/ui/badge';
import { TaskPriority } from './constants';
import clsx from 'clsx';

type TaskPriorityTagProps = {
  priority: TaskPriority;
};

const PriorityConfig = {
  [TaskPriority.HIGH]: {
    label: 'High',
    className: 'bg-priority-high-tint text-priority-high border-transparent'
  },
  [TaskPriority.MEDIUM]: {
    label: 'Medium',
    className: 'bg-priority-mid-tint text-priority-mid border-transparent'
  },
  [TaskPriority.LOW]: {
    label: 'Low',
    className: 'bg-priority-low-tint text-priority-low border-transparent'
  }
};

const TaskPriorityTag = ({ priority }: TaskPriorityTagProps) => {
  const { label, className } = PriorityConfig[priority];
  return (
    <Badge className={clsx(className, 'text-xs font-medium px-1 py-0.5 rounded')}>{label}</Badge>
  );
};

export default TaskPriorityTag;
