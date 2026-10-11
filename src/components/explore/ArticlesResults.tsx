import { useState } from 'react';
import { useNavigate } from 'react-router';
import Card from '@/components/general/Card';
import InitialsAvatar from '@/components/general/InitialsAvatar';
import OverflowTooltip from '@/components/general/OverflowTooltip';
import EmptyContent from '@/components/general/EmptyContent';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import { useGetAllArticles } from '@/api/generated/articles/articles';
import { Pagination, ResultsGrid } from './Pagination';
import { PAGE_SIZE } from './constants';
import type { ResultsProps } from './types';

const ArticlesResults = ({ query }: ResultsProps) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllArticles({
    page,
    limit: PAGE_SIZE,
    q: query || undefined
  });

  if (isLoading) return <CustomSpinner />;
  const articles = data?.data ?? [];
  if (isError || articles.length === 0)
    return (
      <EmptyContent
        title={isError ? 'Something went wrong' : 'No articles found'}
        description={
          isError
            ? 'Failed to load articles. Please try again later.'
            : query
              ? `No articles matching "${query}".`
              : 'No articles yet.'
        }
      />
    );

  return (
    <>
      <ResultsGrid>
        {articles.map((article) => (
          <Card
            key={article.id}
            onClick={() => navigate(`/articles/${article.id}`)}
            title={article.title}
            description={<OverflowTooltip text={article.description ?? ''} />}
            icon={
              <InitialsAvatar
                name={article.title}
                index={article.id}
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

export default ArticlesResults;
