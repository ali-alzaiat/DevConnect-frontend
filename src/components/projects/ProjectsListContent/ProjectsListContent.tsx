import Card from '@/components/general/Card';
import { CheckIcon, UsersIcon, ClockIcon } from 'lucide-react';
import InitialsAvatar from '@/components/general/InitialsAvatar';
import { useGetAllProjects } from '@/api/generated/projects/projects';
import { useNavigate } from 'react-router';
import StatusBadge from '../StatusBadge/StatusBadge';
import { ProjectStatus } from '../StatusBadge/constants';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import EmptyContent from '@/components/general/EmptyContent';

const ProjectsListContent = () => {
  const { data: projects, isLoading } = useGetAllProjects({});
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div>
        <CustomSpinner />
      </div>
    );
  }

  if (!projects?.data || projects.data.length === 0) {
    return (
      <EmptyContent title="No projects" description="Get started by creating your first project" />
    );
  }

  return (
    <div className="mt-6 grid gap-4 flex-row w-full px-3 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {projects.data.map((project) => (
        <Card
          className="h-45 min-w-[300px]"
          key={project.id}
          icon={
            <InitialsAvatar
              name={project.title}
              index={project.id}
              className="rounded-lg size-10"
              textSize="text-base"
            />
          }
          title={project.title}
          description={
            <div className="text-ellipsis overflow-hidden whitespace-nowrap w-full">
              {project.description}
            </div>
          }
          onClick={() => {
            navigate(`/projects/${project.id}`, {
              state: {
                projectName: project.title,
                projectDescription: project.description
              }
            });
          }}
          headerClassName="flex items-center gap-6 flex-1 min-h-0"
          iconClassName="!p-0"
          footer={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 text-disabled text-xs">
                <span className="flex items-center gap-1">
                  <CheckIcon className="size-3" /> 4 tasks
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="size-3" /> 3
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="size-3" /> 2h ago
                </span>
              </div>
              <StatusBadge status={ProjectStatus.Active} />
            </div>
          }
        />
      ))}
    </div>
  );
};

export default ProjectsListContent;
