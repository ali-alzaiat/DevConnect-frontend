import { useParams } from 'react-router';
import { useGetSnippetById } from '@/api/generated/snippets/snippets';
import Header from '@/components/general/header';
import { Badge } from '@/components/ui/badge';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import EmptyContent from '@/components/general/EmptyContent';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SnippetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: snippet, isLoading, isError } = useGetSnippetById(Number(id));

  if (isLoading) {
    return <CustomSpinner />;
  }

  if (isError || !snippet) {
    return (
      <EmptyContent
        title="Snippet not found"
        description="The snippet you're looking for doesn't exist or has been removed."
      />
    );
  }

  return (
    <div className="snippet-details">
      <Header title={snippet.name} description={String(snippet.description ?? '')} />
      <div className="flex gap-2 mt-4">
        {snippet.tags.map((tag: string) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="mt-6 flex flex-col justify-start gap-4 w-full px-3 items-center">
        <div className="bg-gray-200 dark:bg-gray-500 p-4 rounded-md overflow-x-auto w-8/10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{snippet.code}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetails;
