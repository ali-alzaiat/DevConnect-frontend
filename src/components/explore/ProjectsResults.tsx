import { useState } from 'react';
import { useNavigate } from 'react-router';
import Card from '@/components/general/Card';
import InitialsAvatar from '@/components/general/InitialsAvatar';
import OverflowTooltip from '@/components/general/OverflowTooltip';
import EmptyContent from '@/components/general/EmptyContent';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import { useGetAllProjects } from '@/api/generated/projects/projects';
import { Pagination, ResultsGrid } from './Pagination';
import { PAGE_SIZE } from './constants';
import type { ResultsProps } from './types';

const ProjectsResults = ({ query }: ResultsProps) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllProjects({
    page,
    limit: PAGE_SIZE,
    searchTerm: query || undefined
  });

  if (isLoading) return <CustomSpinner />;
  const projects = data?.data ?? [];
  if (isError || projects.length === 0)
    return (
      <EmptyContent
        title={isError ? 'Something went wrong' : 'No projects found'}
        description={
          isError
            ? 'Failed to load projects. Please try again later.'
            : query
              ? `No projects matching "${query}".`
              : 'No projects yet.'
        }
      />
    );

  return (
    <>
      <ResultsGrid>
        {projects.map((project) => (
          <Card
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
            title={project.title}
            description={<OverflowTooltip text={project.description ?? ''} />}
            icon={
              <InitialsAvatar
                name={project.title}
                index={project.id}
                className="rounded-lg size-10"
                textSize="text-base"
                hideTooltip
              />
            }
            headerClassName="flex items-center gap-6 flex-1 min-h-0"
            iconClassName="!p-0"
          />
        ))}
      </ResultsGrid>
      <Pagination page={page} totalPages={data?.meta.totalPages ?? 1} onPageChange={setPage} />
    </>
  );
};

export default ProjectsResults;
