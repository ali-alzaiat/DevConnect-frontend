import { SquareKanban } from "lucide-react";
import Card from "../general/Card";
import { useNavigate } from "react-router";
import Header from "../general/header";

const Projects = () => {
  const navigate = useNavigate();
  const projects = [
    { id: 1, name: "Project 1", description: "Description of Project 1" },
    { id: 2, name: "Project 2", description: "Description of Project 2" },
    {
      id: 3,
      name: "Project 3",
      description:
        "Description of Project 3Description of Project 3Description of Project 3Description of Project 3Description of Project 3Description of Project 3Description of Project 3",
    },
    { id: 4, name: "Project 4", description: "Description of Project 4" },
    { id: 5, name: "Project 5", description: "Description of Project 5" },
    { id: 6, name: "Project 6", description: "Description of Project 6" },
    { id: 7, name: "Project 7", description: "Description of Project 7" },
    { id: 8, name: "Project 8", description: "Description of Project 8" },
    { id: 9, name: "Project 9", description: "Description of Project 9" },
    { id: 10, name: "Project 10", description: "Description of Project 10" },
    { id: 11, name: "Project 11", description: "Description of Project 11" },
    { id: 12, name: "Project 12", description: "Description of Project 12" },
    { id: 13, name: "Project 13", description: "Description of Project 13" },
    { id: 14, name: "Project 14", description: "Description of Project 14" },
    { id: 15, name: "Project 15", description: "Description of Project 15" },
    { id: 16, name: "Project 16", description: "Description of Project 16" },
    { id: 17, name: "Project 17", description: "Description of Project 17" },
    { id: 18, name: "Project 18", description: "Description of Project 18" },
    { id: 19, name: "Project 19", description: "Description of Project 19" },
    { id: 20, name: "Project 20", description: "Description of Project 20" },
  ];

  const onClickHandler = () => {
    navigate("/projects/create");
  };

  return (
    <div className="projects-container">
      <Header
        title="Projects"
        onClickHandler={onClickHandler}
        buttonText="Create New Project"
        description="Manage and collaborate on your development projects."
      />
      <div className="mt-6 grid gap-4 flex-row w-full px-3 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {projects.map((project) => (
          <Card
            key={project.id}
            icon={<SquareKanban className="w-8 h-8 text-blue-500" />}
            title={project.name}
            description={
              <div className="text-ellipsis overflow-hidden whitespace-nowrap w-full">
                {project.description}
              </div>
            }
            buttonText="Open"
            onClick={() => {
              navigate(`/projects/${project.id}`, {
                state: {
                  projectName: project.name,
                  projectDescription: project.description,
                },
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
