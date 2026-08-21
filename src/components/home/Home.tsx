import { useNavigate } from 'react-router';
import Card from '../general/Card';
import { Code, LayoutDashboard, NotebookText, Plus } from 'lucide-react';
import { useCheckLoginStatus } from '@/api/generated/auth/auth';

const Home = () => {
  const navigate = useNavigate();
  const { data: user } = useCheckLoginStatus();
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  const cards = [
    {
      title: 'New Project',
      description: 'Start a team project with Kanban boards.',
      buttonText: (
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Create</span>
        </div>
      ),
      icon: <LayoutDashboard className="w-8 h-8" />,
      iconClassName: 'bg-brand-tint text-in-brand',
      onClick: () => {
        navigate('/projects/create');
      }
    },
    {
      title: 'Write Article',
      description: 'Share your knowledge with the community.',
      buttonText: (
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Write</span>
        </div>
      ),
      icon: <NotebookText className="w-8 h-8" />,
      iconClassName: 'bg-article-tint text-in-article',
      onClick: () => navigate('/articles')
    },
    {
      title: 'Share Snippet',
      description: 'Post a code snippet for feedback.',
      icon: <Code className="w-8 h-8" />,
      iconClassName: 'bg-snippet-tint text-in-snippet',
      buttonText: (
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Share</span>
        </div>
      ),
      onClick: () => navigate('/snippets')
    }
  ];

  return (
    <div className="home-container flex flex-col bg-background h-full">
      <div className="home-container__header w-full p-2">
        <p className="text-brand font-bold text-xl">Good morning, {firstName}</p>
        <h1 className="text-4xl font-bold mb-4">What are you building today?</h1>
      </div>
      <div className="home-container__quick-actions p-4">
        <p className="text-2xl font-semibold">Quick actions</p>
        <div className="cards-container mt-6 gap-4 w-full px-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] place-items-center">
          {cards.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
              onClick={card.onClick}
              icon={card.icon}
              iconClassName={card.iconClassName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
