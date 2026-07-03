import { useLocation } from 'react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from '@/components/general/header';
import ProjectDetailsContent from './ProjectDetailsContent';

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
