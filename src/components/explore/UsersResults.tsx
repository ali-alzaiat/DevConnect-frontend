import { useState } from 'react';
import { useNavigate } from 'react-router';
import Card from '@/components/general/Card';
import InitialsAvatar from '@/components/general/InitialsAvatar';
import EmptyContent from '@/components/general/EmptyContent';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import { useFindAllUsers } from '@/api/generated/users/users';
import { Pagination, ResultsGrid } from './Pagination';
import { PAGE_SIZE } from './constants';
import type { ResultsProps } from './types';

const UsersResults = ({ query }: ResultsProps) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useFindAllUsers({
    page,
    limit: PAGE_SIZE,
    q: query || undefined
  });

  if (isLoading) return <CustomSpinner />;
  const users = data?.data ?? [];
  if (isError || users.length === 0)
    return (
      <EmptyContent
        title={isError ? 'Something went wrong' : 'No users found'}
        description={
          isError
            ? 'Failed to load users. Please try again later.'
            : query
              ? `No users matching "${query}".`
              : 'No users yet.'
        }
      />
    );

  return (
    <>
      <ResultsGrid>
        {users.map((user) => (
          <Card
            key={user.id}
            title={user.name}
            description={user.email}
            onClick={() => navigate(`/users/${user.id}`)}
            icon={
              <InitialsAvatar
                name={user.name}
                index={user.id}
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

export default UsersResults;
