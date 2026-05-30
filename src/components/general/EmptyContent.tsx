import { FolderCode } from 'lucide-react';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '../ui/empty';

interface EmptyContentProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const EmptyContent = ({
  icon = <FolderCode />,
  title = 'No data',
  description = ''
}: EmptyContentProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default EmptyContent;
