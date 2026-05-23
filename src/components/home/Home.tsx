import { useNavigate } from "react-router";
import Card from "../general/Card";
import { Code, LayoutDashboard, NotebookText } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const cards = [
    {
      title: "New Project",
      description: "Start a team project with Kanban boards.",
      buttonText: "Create",
      icon: <LayoutDashboard className="w-8 h-8 text-blue-500" />,
      onClick: () => {
        navigate("/projects/create");
      },
    },
    {
      title: "Write Article",
      description: "Share your knowledge with the community.",
      buttonText: "Write",
      icon: <NotebookText className="w-8 h-8 text-blue-500" />,
      onClick: () => {},
    },
    {
      title: "Share Snippet",
      description: "Post a code snippet for feedback.",
      icon: <Code className="w-8 h-8 text-blue-500" />,
      buttonText: "Share",
      onClick: () => {},
    },
  ];

  return (
    <div className="home-container flex flex-col items-center justify-center bg-background h-full">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to DevConnect
      </h1>
      <p className="text-lg text-gray-700 text-center">
        Connect, collaborate, and build with developers worldwide.
      </p>
      <div className="cards-container mt-6 gap-4 w-full px-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] place-items-center">
        {cards.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
            onClick={card.onClick}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
