import Header from '@/components/general/header';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SnippetDetails = () => {
  const location = useLocation();
  const { snippetName, snippetDescription, snippetCode, snippetTags } = location.state || {
    snippetName: '',
    snippetDescription: '',
    snippetCode: '',
    snippetTags: []
  };
  return (
    <div className="snippet-details">
      <Header title={snippetName} description={snippetDescription} />
      <div className="flex gap-2 mt-4">
        {snippetTags.map((tag: string) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="mt-6 flex flex-col justify-start gap-4 w-full px-3 items-center">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="bg-gray-200 dark:bg-gray-500 p-4 rounded-md overflow-x-auto w-8/10"
        >
          {snippetCode}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default SnippetDetails;
