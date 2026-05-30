import { useNavigate } from 'react-router';
import Header from '../general/header';
import ProjectsListContent from './ProjectsListContent/ProjectsListContent';

const Projects = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('/projects/create');
  };

  return (
    <div className="projects-container">
      <Header
        title="Projects"
        onClickHandler={onClickHandler}
        buttonText="Create New Project"
        description="Manage and collaborate on your development projects."
      />
      <ProjectsListContent />
    </div>
  );
};

export default Projects;
