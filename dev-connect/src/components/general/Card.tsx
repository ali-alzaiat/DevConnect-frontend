import { JSX } from "react";
import { Button } from "../ui/button";
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card as ShadcnCard,
} from "../ui/card";

type CardProps = {
  title: string;
  description: string | JSX.Element;
  buttonText: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const Card = ({ title, description, buttonText, icon, onClick }: CardProps) => {
  return (
    <ShadcnCard
      className="lg:w-31/100 md:w-4/10 w-9/10 justify-between h-60 "
      key={title}
    >
      <CardHeader>
        {icon && <div className="icon h-fit mx-auto my-3">{icon}</div>}
        <CardTitle className="text-2xl font-semibold mx-auto">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 text-center w-full overflow-hidden">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="default" className="button mx-auto" onClick={onClick}>
          {buttonText}
        </Button>
      </CardFooter>
    </ShadcnCard>
  );
};

export default Card;
