import { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../general/header';
import { Code, Copy } from 'lucide-react';
import Card from '../general/Card';
import { useGetAllSnippets } from '@/api/generated/snippets/snippets';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import EmptyContent from '@/components/general/EmptyContent';
import SnippetCreateDialog from './SnippetCreate/SnippetCreateDialog';
import OverflowTooltip from '@/components/general/OverflowTooltip';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Badge } from '@/components/ui/badge';

const Snippets = () => {
  const navigate = useNavigate();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { data, isLoading, isError } = useGetAllSnippets();
  const snippets = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="snippets-container">
        <Breadcrumbs items={[{ label: 'Snippets', href: '/snippets' }]} />
        <Header
          title="Code Snippets"
          onClickHandler={() => setCreateDialogOpen(true)}
          buttonText="Create New Snippet"
          description="Save, share, and discover reusable code snippets."
        />
        <CustomSpinner />
      </div>
    );
  }

  if (isError || snippets.length === 0) {
    return (
      <div className="snippets-container">
        <Breadcrumbs items={[{ label: 'Snippets', href: '/snippets' }]} />
        <Header
          title="Code Snippets"
          onClickHandler={() => setCreateDialogOpen(true)}
          buttonText="Create New Snippet"
          description="Save, share, and discover reusable code snippets."
        />
        <EmptyContent
          title={isError ? 'Something went wrong' : 'No snippets yet'}
          description={
            isError
              ? 'Failed to load snippets. Please try again later.'
              : 'Create your first code snippet to get started.'
          }
        />
        <SnippetCreateDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
      </div>
    );
  }

  return (
    <div className="snippets-container">
      <Breadcrumbs items={[{ label: 'Snippets', href: '/snippets' }]} />
      <Header
        title="Code Snippets"
        onClickHandler={() => setCreateDialogOpen(true)}
        buttonText="Create New Snippet"
        description="Save, share, and discover reusable code snippets."
      />
      <div className="mt-6 grid gap-4 flex-row w-full px-3 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {snippets.map((snippet) => (
          <Card
            key={snippet.id}
            icon={<Code className="w-8 h-8" />}
            title={snippet.name}
            description={<OverflowTooltip text={String(snippet.description ?? '')} />}
            onClick={() => {
              navigate(`/snippets/${snippet.id}`);
            }}
            iconClassName="bg-snippet-tint text-in-snippet"
            footer={
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  {snippet.tags?.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <span className="flex items-center gap-1.5 text-muted text-sm">
                  <Copy className="size-4" />
                </span>
              </div>
            }
          />
        ))}
      </div>
      <SnippetCreateDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
};

export default Snippets;
