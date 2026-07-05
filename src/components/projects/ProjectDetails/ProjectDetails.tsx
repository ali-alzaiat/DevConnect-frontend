import { useParams } from 'react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from '@/components/general/header';
import ProjectDetailsContent from './ProjectDetailsContent';
import { useGetProjectById } from '@/api/generated/projects/projects';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import EmptyContent from '@/components/general/EmptyContent';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, isError } = useGetProjectById(Number(id));

  if (isLoading) {
    return (
      <div className="project-details">
        <Header title="Project Details" description="" />
        <CustomSpinner />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="project-details">
        <Header title="Project Details" description="" />
        <EmptyContent
          title="Something went wrong"
          description="Failed to load project. Please try again later."
        />
      </div>
    );
  }

  const ownerName = (project.owner as { name?: string })?.name ?? 'Unknown';

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="project-details">
        <Header title={project.title} description={`by ${ownerName}`} />
        <ProjectDetailsContent tasks={project.tasks ?? []} />
      </div>
    </DndProvider>
  );
};

export default ProjectDetails;
