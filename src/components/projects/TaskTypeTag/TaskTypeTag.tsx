import { Badge } from '@/components/ui/badge';
import { TaskType } from './constants';
import clsx from 'clsx';

type TaskTypeTagProps = {
  type: TaskType;
};

const TypeConfig = {
  [TaskType.FEATURE]: {
    label: 'Feature',
    className: 'bg-tag-feature-tint text-tag-feature border-transparent'
  },
  [TaskType.BUG]: { label: 'Bug', className: 'bg-tag-bug-tint text-tag-bug border-transparent' },
  [TaskType.DOCS]: { label: 'Docs', className: 'bg-tag-docs-tint text-tag-docs border-transparent' }
};

const TaskTypeTag = ({ type }: TaskTypeTagProps) => {
  const { label, className } = TypeConfig[type];
  return (
    <Badge className={clsx(className, 'text-xs font-medium px-2 py-0.5 rounded')}>{label}</Badge>
  );
};

export default TaskTypeTag;
