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
import { Search } from 'lucide-react';
import { useFindAllUsers } from '@/api/generated/users/users';
import { useGetAllProjects } from '@/api/generated/projects/projects';
import { useGetAllArticles } from '@/api/generated/articles/articles';
import { useGetAllSnippets } from '@/api/generated/snippets/snippets';

type ExploreTab = 'users' | 'projects' | 'articles' | 'snippets';

const tabs: { value: ExploreTab; label: string }[] = [
  { value: 'users', label: 'Users' },
  { value: 'projects', label: 'Projects' },
  { value: 'articles', label: 'Articles' },
  { value: 'snippets', label: 'Snippets' }
];

const matches = (text: string | undefined | null, query: string) =>
  (text ?? '').toLowerCase().includes(query.toLowerCase());

const ResultsGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-6 grid gap-4 w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
    {children}
  </div>
);

const tabButtonClass = (isActive: boolean) =>
  clsx(
    'px-4 py-2 text-sm rounded-md transition-colors',
    isActive ? 'bg-brand-tint text-in-brand font-medium' : 'text-secondary hover:bg-surface-hover'
  );

const Explore = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ExploreTab>('projects');
  const trimmedQuery = query.trim();

  return (
    <div className="explore-container">
      <Breadcrumbs items={[{ label: 'Explore' }]} />
      <Header
        title="Explore"
        description="Search across users, projects, articles, and snippets."
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
      {!trimmedQuery ? (
        <EmptyContent
          title="Start searching"
          description="Type a keyword to find users, projects, articles, or snippets."
        />
      ) : activeTab === 'users' ? (
        <UsersResults query={trimmedQuery} />
      ) : activeTab === 'projects' ? (
        <ProjectsResults query={trimmedQuery} />
      ) : activeTab === 'articles' ? (
        <ArticlesResults query={trimmedQuery} />
      ) : (
        <SnippetsResults query={trimmedQuery} />
      )}
    </div>
  );
};

const UsersResults = ({ query }: { query: string }) => {
  const { data, isLoading } = useFindAllUsers();
  if (isLoading) return <CustomSpinner />;
  const filtered = (data?.data ?? []).filter(
    (u) => matches(u.name, query) || matches(u.email, query)
  );
  if (filtered.length === 0)
    return <EmptyContent title="No users found" description={`No users matching "${query}".`} />;
  return (
    <ResultsGrid>
      {filtered.map((user) => (
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
  );
};

const ProjectsResults = ({ query }: { query: string }) => {
  const { data, isLoading } = useGetAllProjects({});
  if (isLoading) return <CustomSpinner />;
  const filtered = (data?.data ?? []).filter(
    (p) => matches(p.title, query) || matches(p.description, query)
  );
  if (filtered.length === 0)
    return (
      <EmptyContent title="No projects found" description={`No projects matching "${query}".`} />
    );
  return (
    <ResultsGrid>
      {filtered.map((project) => (
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
  );
};

const ArticlesResults = ({ query }: { query: string }) => {
  const { data, isLoading } = useGetAllArticles();
  if (isLoading) return <CustomSpinner />;
  const filtered = (data?.data ?? []).filter(
    (a) => matches(a.title, query) || matches(a.description, query)
  );
  if (filtered.length === 0)
    return (
      <EmptyContent title="No articles found" description={`No articles matching "${query}".`} />
    );
  return (
    <ResultsGrid>
      {filtered.map((article) => (
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
  );
};

const SnippetsResults = ({ query }: { query: string }) => {
  const { data, isLoading } = useGetAllSnippets();
  if (isLoading) return <CustomSpinner />;
  const filtered = (data?.data ?? []).filter(
    (s) =>
      matches(s.name, query) ||
      matches(s.description, query) ||
      s.tags?.some((tag) => matches(tag, query))
  );
  if (filtered.length === 0)
    return (
      <EmptyContent title="No snippets found" description={`No snippets matching "${query}".`} />
    );
  return (
    <ResultsGrid>
      {filtered.map((snippet) => (
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
  );
};

export default Explore;
