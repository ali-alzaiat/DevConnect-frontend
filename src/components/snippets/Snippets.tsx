import { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../general/header';
import Card from '../general/Card';
import InitialsAvatar from '@/components/general/InitialsAvatar';
import { useGetAllSnippets } from '@/api/generated/snippets/snippets';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import EmptyContent from '@/components/general/EmptyContent';
import SnippetCreateDialog from './SnippetCreate/SnippetCreateDialog';
import OverflowTooltip from '@/components/general/OverflowTooltip';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { timeAgo } from '@/lib/time-ago';
import clsx from 'clsx';

const tagColors = [
  'bg-tag-feature-tint text-tag-feature',
  'bg-tag-bug-tint text-tag-bug',
  'bg-tag-docs-tint text-tag-docs',
  'bg-snippet-tint text-in-snippet',
  'bg-article-tint text-in-article',
  'bg-brand-tint text-in-brand'
];

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
      <div className="mt-6 grid gap-4 w-full px-3 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {snippets.map((snippet) => (
          <Card
            key={snippet.id}
            icon={
              <InitialsAvatar
                name={snippet.name}
                index={snippet.id}
                className="rounded-lg size-10"
                textSize="text-base"
                hideTooltip
              />
            }
            title={snippet.name}
            description={<OverflowTooltip text={String(snippet.description ?? '')} />}
            onClick={() => {
              navigate(`/snippets/${snippet.id}`);
            }}
            headerClassName="flex items-center gap-6 flex-1 min-h-0"
            iconClassName="!p-0"
            footer={
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 text-muted text-xs">
                  <div className="flex items-center gap-2">
                    {snippet.tags?.slice(0, 2).map((tag, index) => (
                      <Badge
                        key={tag}
                        className={clsx(
                          'text-xs border-transparent',
                          tagColors[index % tagColors.length]
                        )}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="flex items-center gap-1">{timeAgo(snippet.updatedAt)}</span>
                </div>
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
