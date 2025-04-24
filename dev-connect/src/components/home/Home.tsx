import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <h1 className="text-4xl font-bold mb-4">Welcome to DevConnect</h1>
      <p className="text-lg text-gray-700">
        Connect, collaborate, and build with developers worldwide.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-4 flex-row w-full px-3 items-center">
        {cards.map((card) => (
          <Card className="w-1/4 h-full justify-between" key={card.title}>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                {card.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {card.description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="default"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {card.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
