import Card from "../general/Card";

const Home = () => {
  const cards = [
    {
      title: "New Project",
      description: "Start a team project with Kanban boards.",
      buttonText: "Create",
    },
    {
      title: "Write Article",
      description: "Share your knowledge with the community.",
      buttonText: "Write",
    },
    {
      title: "Share Snippet",
      description: "Post a code snippet for feedback.",
      buttonText: "Share",
    },
  ];

  return (
    <div className="home-container flex flex-col items-center justify-center bg-background h-full">
      <h1 className="text-4xl font-bold mb-4">Welcome to DevConnect</h1>
      <p className="text-lg text-gray-700">
        Connect, collaborate, and build with developers worldwide.
      </p>
      <div className="cards-container mt-6 flex flex-wrap justify-center gap-4 flex-row w-full px-3 items-center">
        {cards.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
