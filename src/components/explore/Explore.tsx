import { useState } from 'react';
import Header from '../general/header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Card from '../general/Card';
import InitialsAvatar from '@/components/general/InitialsAvatar';
import OverflowTooltip from '@/components/general/OverflowTooltip';
import EmptyContent from '@/components/general/EmptyContent';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useFindAllUsers } from '@/api/generated/users/users';
import { useGetAllProjects } from '@/api/generated/projects/projects';
import { useGetAllArticles } from '@/api/generated/articles/articles';
import { useGetAllSnippets } from '@/api/generated/snippets/snippets';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

const PAGE_SIZE = 9;

type ExploreTab = 'users' | 'projects' | 'articles' | 'snippets';

const tabs: { value: ExploreTab; label: string }[] = [
  { value: 'users', label: 'Users' },
  { value: 'projects', label: 'Projects' },
  { value: 'articles', label: 'Articles' },
  { value: 'snippets', label: 'Snippets' }
];

const tabButtonClass = (isActive: boolean) =>
  clsx(
    'px-4 py-2 text-sm rounded-md transition-colors',
    isActive ? 'bg-brand-tint text-in-brand font-medium' : 'text-secondary hover:bg-surface-hover'
  );

const Explore = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ExploreTab>('projects');
  const debouncedQuery = useDebouncedValue(query.trim(), 300);

  return (
    <div className="explore-container">
      <Breadcrumbs items={[{ label: 'Explore' }]} />
      <Header
        title="Explore"
        description="Browse and search users, projects, articles, and snippets."
      />
      <div className="px-3 mt-4 relative max-w-xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-muted" />
        <Input
          className="pl-9"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="flex gap-2 px-3 mt-4">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            variant="ghost"
            className={tabButtonClass(activeTab === tab.value)}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      {activeTab === 'users' && <UsersResults key={debouncedQuery} query={debouncedQuery} />}
      {activeTab === 'projects' && <ProjectsResults key={debouncedQuery} query={debouncedQuery} />}
      {activeTab === 'articles' && <ArticlesResults key={debouncedQuery} query={debouncedQuery} />}
      {activeTab === 'snippets' && <SnippetsResults key={debouncedQuery} query={debouncedQuery} />}
    </div>
  );
};

type ResultsProps = {
  query: string;
};

function usePageState() {
  const [page, setPage] = useState(1);
  return { page, onPageChange: setPage };
}

function Pagination({
  page,
  totalPages,
  onPageChange
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="size-4" /> Prev
      </Button>
      <span className="text-sm text-muted">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

const ResultsGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-6 grid gap-4 w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
    {children}
  </div>
);

const UsersResults = ({ query }: ResultsProps) => {
  const { page, onPageChange } = usePageState();
  const { data, isLoading, isError } = useFindAllUsers({
    page,
    limit: PAGE_SIZE,
    q: query || undefined
  });
  if (isLoading) return <CustomSpinner />;
  const users = data?.data ?? [];
  if (isError || users.length === 0)
    return (
      <EmptyContent
        title={isError ? 'Something went wrong' : 'No users found'}
        description={
          isError
            ? 'Failed to load users. Please try again later.'
            : query
              ? `No users matching "${query}".`
              : 'No users yet.'
        }
      />
    );
  return (
    <>
      <ResultsGrid>
        {users.map((user) => (
          <Card
            key={user.id}
            title={user.name}
            description={user.email}
            icon={
              <InitialsAvatar
                name={user.name}
                index={user.id}
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
      <Pagination page={page} totalPages={data?.meta.totalPages ?? 1} onPageChange={onPageChange} />
    </>
  );
};

const ProjectsResults = ({ query }: ResultsProps) => {
  const { page, onPageChange } = usePageState();
  const { data, isLoading, isError } = useGetAllProjects({
    page,
    limit: PAGE_SIZE,
    searchTerm: query || undefined
  });
  if (isLoading) return <CustomSpinner />;
  const projects = data?.data ?? [];
  if (isError || projects.length === 0)
    return (
      <EmptyContent
        title={isError ? 'Something went wrong' : 'No projects found'}
        description={
          isError
            ? 'Failed to load projects. Please try again later.'
            : query
              ? `No projects matching "${query}".`
              : 'No projects yet.'
        }
      />
    );
  return (
    <>
      <ResultsGrid>
        {projects.map((project) => (
          <Card
            key={project.id}
            title={project.title}
            description={<OverflowTooltip text={project.description ?? ''} />}
            icon={
              <InitialsAvatar
                name={project.title}
                index={project.id}
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
      <Pagination page={page} totalPages={data?.meta.totalPages ?? 1} onPageChange={onPageChange} />
    </>
  );
};

const ArticlesResults = ({ query }: ResultsProps) => {
  const { page, onPageChange } = usePageState();
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
      <Pagination page={page} totalPages={data?.meta.totalPages ?? 1} onPageChange={onPageChange} />
    </>
  );
};

const SnippetsResults = ({ query }: ResultsProps) => {
  const { page, onPageChange } = usePageState();
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
      <Pagination page={page} totalPages={data?.meta.totalPages ?? 1} onPageChange={onPageChange} />
    </>
  );
};

export default Explore;
