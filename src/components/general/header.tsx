import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

type HeaderProps = {
  onClickHandler?: () => void;
  title: string;
  description: string;
  buttonText?: string;
};

const Header = ({ title, onClickHandler, description, buttonText }: HeaderProps) => {
  const isMobile = useIsMobile();
  return (
    <div className="header-container mb-3">
      <div className="header flex flex-row justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        {!!buttonText && (
          <Button
            variant="default"
            className="button flex flex-row items-center gap-3 m-0"
            onClick={onClickHandler}
          >
            <Plus />
            {!isMobile && buttonText}
          </Button>
        )}
      </div>
      <p className="text-base text-secondary">{description}</p>
      <Separator className="my-4" />
    </div>
  );
};

export default Header;
