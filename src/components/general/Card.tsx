import { JSX } from 'react';
import { Button } from '../ui/button';
import { CardDescription, CardFooter, CardHeader, CardTitle, Card as ShadcnCard } from '../ui/card';
import clsx from 'clsx';

type CardProps = {
  title: string;
  subtitle?: string;
  description: string | JSX.Element;
  buttonText?: string | JSX.Element;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  headerClassName?: string;
  footer?: React.ReactNode;
};

const Card = ({
  title,
  subtitle,
  description,
  buttonText,
  icon,
  onClick,
  className,
  iconClassName,
  headerClassName,
  footer
}: CardProps) => {
  return (
    <ShadcnCard
      className={clsx(
        'flex flex-col justify-between h-full py-3 min-w-[200px] w-full hover:cursor-pointer hover:border-1 hover:border-brand transition-all duration-300',
        className
      )}
      key={title}
      onClick={onClick}
    >
      <CardHeader className={clsx(headerClassName)}>
        {icon && (
          <div className={clsx(iconClassName, 'icon h-fit my-3 p-2 rounded-lg w-12')}>{icon}</div>
        )}
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      </CardHeader>
      <CardDescription className="text-muted-foreground w-full overflow-hidden px-6">
        {description}
      </CardDescription>
      {!!buttonText && (
        <CardFooter>
          <Button variant="default" className="button mx-auto">
            {buttonText}
          </Button>
        </CardFooter>
      )}
      {!!footer && <CardFooter>{footer}</CardFooter>}
    </ShadcnCard>
  );
};

export default Card;
