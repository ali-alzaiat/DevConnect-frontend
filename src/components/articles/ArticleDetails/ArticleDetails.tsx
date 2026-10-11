import { useParams, useNavigate } from 'react-router';
import Header from '@/components/general/header';
import { useGetArticleById } from '@/api/generated/articles/articles';
import { canEditItem } from '@/lib/permissions';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import EmptyContent from '@/components/general/EmptyContent';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import EditArticleDialog from './EditArticleDialog';
import DeleteArticleDialog from './DeleteArticleDialog';

const ArticleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: article, isLoading, isError } = useGetArticleById(Number(id));
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="article-details">
        <Breadcrumbs
          items={[{ label: 'Articles', href: '/articles' }, { label: 'Article Details' }]}
        />
        <Header title="Article Details" description="" />
        <CustomSpinner />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="article-details">
        <Breadcrumbs
          items={[{ label: 'Articles', href: '/articles' }, { label: 'Article Details' }]}
        />
        <Header title="Article Details" description="" />
        <EmptyContent
          title="Something went wrong"
          description="Failed to load article. Please try again later."
        />
      </div>
    );
  }

  const authorName = (article.author as { name?: string })?.name ?? 'Unknown';

  return (
    <div className="article-details">
      <Breadcrumbs items={[{ label: 'Articles', href: '/articles' }, { label: article.title }]} />
      <Header title={article.title} description={`by ${authorName}`} />
      {canEditItem(String(article.permission)) && (
        <div className="flex gap-2 mt-2 px-3">
          <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="size-4" /> Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="size-4" /> Delete
          </Button>
        </div>
      )}
      <div className="mt-6 flex flex-col justify-start gap-4 w-full px-3 items-center">
        <div className="bg-gray-200 dark:bg-gray-500 p-4 rounded-md overflow-x-auto w-8/10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
        </div>
      </div>
      <EditArticleDialog open={editOpen} onOpenChange={setEditOpen} article={article} />
      <DeleteArticleDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        articleId={article.id}
        onSuccess={() => navigate('/articles')}
      />
    </div>
  );
};

export default ArticleDetails;
