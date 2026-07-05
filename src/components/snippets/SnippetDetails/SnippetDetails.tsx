import Header from '@/components/general/header';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useGetSnippetById } from '@/api/generated/snippets/snippets';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import EmptyContent from '@/components/general/EmptyContent';

const SnippetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: snippetResponse, isLoading, isError } = useGetSnippetById(id ?? '');

  if (isLoading) {
    return (
      <div className="snippet-details">
        <Header title="Snippet Details" description="" />
        <CustomSpinner />
      </div>
    );
  }

  if (isError || !snippetResponse) {
    return (
      <div className="snippet-details">
        <Header title="Snippet Details" description="" />
        <EmptyContent
          title="Something went wrong"
          description="Failed to load snippet. Please try again later."
        />
      </div>
    );
  }

  const snippet = snippetResponse.data;
  const snippetName = snippet.name ?? '';
  const snippetDescription = snippet.description ?? '';
  const snippetCode = snippet.code ?? snippet.content ?? '';
  const snippetTags: string[] = snippet.tags ?? [];

  return (
    <div className="snippet-details">
      <Header title={snippetName} description={snippetDescription} />
      <div className="flex gap-2 mt-4">
        {snippetTags.map((tag: string) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="mt-6 flex flex-col justify-start gap-4 w-full px-3 items-center">
        <div className="bg-gray-200 dark:bg-gray-500 p-4 rounded-md overflow-x-auto w-8/10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{snippetCode}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetails;
