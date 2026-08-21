import { useState } from 'react';
import Header from '../general/header';
import ProjectsListContent from './ProjectsListContent/ProjectsListContent';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import CreateProjectDialog from './CreateProjectDialog';

const Projects = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <div className="projects-container">
      <Breadcrumbs items={[{ label: 'Projects', href: '/projects' }]} />
      <Header
        title="Projects"
        onClickHandler={() => setCreateDialogOpen(true)}
        buttonText="Create New Project"
        description="Manage and collaborate on your development projects."
      />
      <ProjectsListContent />
      <CreateProjectDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
};

export default Projects;
