import { useNavigate } from 'react-router';
import Header from '../general/header';
import { Code } from 'lucide-react';
import Card from '../general/Card';
import { useGetAllSnippets } from '@/api/generated/snippets/snippets';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import EmptyContent from '@/components/general/EmptyContent';

const Snippets = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllSnippets();
  const snippets = data?.data ?? [];

  const onClickHandler = () => {
    navigate('/snippets/create');
  };

  if (isLoading) {
    return (
      <div className="snippets-container">
        <Header
          title="Code Snippets"
          onClickHandler={onClickHandler}
          buttonText="Create New Snippet"
          description="Save, share, and discover reusable code snippets."
        />
        <CustomSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="snippets-container">
        <Header
          title="Code Snippets"
          onClickHandler={onClickHandler}
          buttonText="Create New Snippet"
          description="Save, share, and discover reusable code snippets."
        />
        <EmptyContent
          title="Something went wrong"
          description="Failed to load snippets. Please try again later."
        />
      </div>
    );
  }

  if (snippets.length === 0) {
    return (
      <div className="snippets-container">
        <Header
          title="Code Snippets"
          onClickHandler={onClickHandler}
          buttonText="Create New Snippet"
          description="Save, share, and discover reusable code snippets."
        />
        <EmptyContent
          title="No snippets yet"
          description="Create your first code snippet to get started."
        />
      </div>
    );
  }

  return (
    <div className="snippets-container">
      <Header
        title="Code Snippets"
        onClickHandler={onClickHandler}
        buttonText="Create New Snippet"
        description="Save, share, and discover reusable code snippets."
      />
      <div className="mt-6 grid gap-4 flex-row w-full px-3 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {snippets.map((snippet) => (
          <Card
            key={snippet.id}
            icon={<Code className="w-8 h-8" />}
            title={snippet.name}
            description={
              <div className="text-ellipsis overflow-hidden whitespace-nowrap w-full">
                {String(snippet.description ?? '')}
              </div>
            }
            buttonText="Open"
            onClick={() => {
              navigate(`/snippets/${snippet.id}`);
            }}
            iconClassName="bg-snippet-tint text-in-snippet"
          />
        ))}
      </div>
    </div>
  );
};

export default Snippets;
