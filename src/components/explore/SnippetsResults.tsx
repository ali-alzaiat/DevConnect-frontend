import { useState } from 'react';
import Card from '@/components/general/Card';
import InitialsAvatar from '@/components/general/InitialsAvatar';
import OverflowTooltip from '@/components/general/OverflowTooltip';
import EmptyContent from '@/components/general/EmptyContent';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import { useGetAllSnippets } from '@/api/generated/snippets/snippets';
import { Pagination, ResultsGrid } from './Pagination';
import { PAGE_SIZE } from './constants';
import type { ResultsProps } from './types';

const SnippetsResults = ({ query }: ResultsProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetAllSnippets({
    page,
    limit: PAGE_SIZE,
    q: query || undefined
  });

  if (isLoading) return <CustomSpinner />;
  const snippets = data?.data ?? [];
  if (isError || snippets.length === 0)
    return (
      <EmptyContent
        title={isError ? 'Something went wrong' : 'No snippets found'}
        description={
          isError
            ? 'Failed to load snippets. Please try again later.'
            : query
              ? `No snippets matching "${query}".`
              : 'No snippets yet.'
        }
      />
    );

  return (
    <>
      <ResultsGrid>
        {snippets.map((snippet) => (
          <Card
            key={snippet.id}
            title={snippet.name}
            description={<OverflowTooltip text={String(snippet.description ?? '')} />}
            icon={
              <InitialsAvatar
                name={snippet.name}
                index={snippet.id}
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

export default SnippetsResults;
