import { useState } from 'react';
import Header from '../general/header';
import ArticlesListContent from './ArticlesList/ArticlesListContent';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import CreateArticleDialog from './ArticleDetails/CreateArticleDialog';

const Articles = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <div className="articles-container">
      <Breadcrumbs items={[{ label: 'Articles', href: '/articles' }]} />
      <Header
        title="Articles"
        onClickHandler={() => setCreateDialogOpen(true)}
        buttonText="Write Article"
        description="Share your knowledge with the community."
      />
      <ArticlesListContent />
      <CreateArticleDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
};

export default Articles;
