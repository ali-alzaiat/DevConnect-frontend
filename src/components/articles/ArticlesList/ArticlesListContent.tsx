import Card from '@/components/general/Card';
import InitialsAvatar from '@/components/general/InitialsAvatar';
import { useGetAllArticles } from '@/api/generated/articles/articles';
import { useNavigate } from 'react-router';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import EmptyContent from '@/components/general/EmptyContent';
import OverflowTooltip from '@/components/general/OverflowTooltip';
import { timeAgo } from '@/lib/time-ago';
import { BookOpen } from 'lucide-react';

const ArticlesListContent = () => {
  const { data: articles, isLoading, isError } = useGetAllArticles();
  const navigate = useNavigate();
  const articleList = articles?.data ?? [];

  if (isLoading) {
    return (
      <div>
        <CustomSpinner />
      </div>
    );
  }

  if (isError || !articleList || articleList.length === 0) {
    return (
      <EmptyContent
        title={isError ? 'Something went wrong' : 'No articles yet'}
        description={
          isError
            ? 'Failed to load articles. Please try again later.'
            : 'Write your first article to get started.'
        }
      />
    );
  }

  return (
    <div className="mt-6 grid gap-4 w-full px-3 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {articleList.map((article) => (
        <Card
          key={article.id}
          icon={
            <InitialsAvatar
              name={article.title}
              index={article.id}
              className="rounded-lg size-10"
              textSize="text-base"
              hideTooltip
            />
          }
          title={article.title}
          description={<OverflowTooltip text={article.description ?? ''} />}
          onClick={() => {
            navigate(`/articles/${article.id}`);
          }}
          headerClassName="flex items-center gap-6 flex-1 min-h-0"
          iconClassName="!p-0"
          footer={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 text-muted text-xs">
                <span className="flex items-center gap-1">
                  <BookOpen className="size-3" /> {timeAgo(article.updatedAt)}
                </span>
              </div>
            </div>
          }
        />
      ))}
    </div>
  );
};

export default ArticlesListContent;
