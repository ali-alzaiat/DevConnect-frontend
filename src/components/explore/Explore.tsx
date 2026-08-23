import { useState } from 'react';
import Header from '../general/header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { Search } from 'lucide-react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useCheckLoginStatus } from '@/api/generated/auth/auth';
import UsersResults from './UsersResults';
import ProjectsResults from './ProjectsResults';
import ArticlesResults from './ArticlesResults';
import SnippetsResults from './SnippetsResults';
import { tabs } from './constants';

const tabButtonClass = (isActive: boolean) =>
  clsx(
    'px-4 py-2 text-sm rounded-md transition-colors',
    isActive ? 'bg-brand-tint text-in-brand font-medium' : 'text-secondary hover:bg-surface-hover'
  );

const Explore = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const debouncedQuery = useDebouncedValue(query.trim(), 300);
  const { data: user } = useCheckLoginStatus();
  const visibleTabs = tabs.filter((tab) => tab.value !== 'users' || user?.role === 'ADMIN');
  const effectiveTab = visibleTabs.some((t) => t.value === activeTab)
    ? activeTab
    : (visibleTabs[0]?.value ?? 'projects');

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
        {visibleTabs.map((tab) => (
          <Button
            key={tab.value}
            variant="ghost"
            className={tabButtonClass(effectiveTab === tab.value)}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      {effectiveTab === 'users' && <UsersResults key={debouncedQuery} query={debouncedQuery} />}
      {effectiveTab === 'projects' && (
        <ProjectsResults key={debouncedQuery} query={debouncedQuery} />
      )}
      {effectiveTab === 'articles' && (
        <ArticlesResults key={debouncedQuery} query={debouncedQuery} />
      )}
      {effectiveTab === 'snippets' && (
        <SnippetsResults key={debouncedQuery} query={debouncedQuery} />
      )}
    </div>
  );
};

export default Explore;
