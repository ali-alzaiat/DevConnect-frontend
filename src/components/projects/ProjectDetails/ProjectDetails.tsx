import { useLocation } from 'react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from '@/components/general/header';
import { TaskType } from '../TaskTypeTag/constants';
import { TaskPriority } from '../TaskPriorityTag/constants';
import ProjectDetailsContent from './ProjectDetailsContent';

export type Task = {
  id: number;
  title: string;
  status: string;
  dueDate: string;
  assignee: { id: number; name: string };
  type: TaskType;
  priority: TaskPriority;
  order: number;
};

// Form data type for react-hook-form
export type TaskFormData = {
  title: string;
  priority: TaskPriority;
  type: TaskType;
  dueDate: Date;
};

export type TaskDragItem = {
  id: number;
  order: number;
  status: string;
};

const ProjectDetails = () => {
  // const params = useParams()
  const location = useLocation();
  const { projectName, projectDescription } = location.state || {
    projectName: 'Default Project',
    projectDescription: ''
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="project-details">
        <Header title={projectName} description={projectDescription} />
        <ProjectDetailsContent />
      </div>
    </DndProvider>
  );
};

export default ProjectDetails;
