import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import clsx from 'clsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const colors = [
  'bg-brand-tint text-in-brand',
  'bg-article-tint text-in-article',
  'bg-snippet-tint text-in-snippet'
];

type InitialsAvatarProps = {
  className?: string;
  textSize?: string;
  name: string;
  index: number;
};

function InitialsAvatar({ className, name, index, textSize }: InitialsAvatarProps) {
  const color = colors[index % colors.length];
  return (
    <Tooltip>
      <TooltipTrigger>
        <Avatar className={clsx('size-7', className)}>
          <AvatarFallback
            className={clsx(`rounded-lg font-semibold`, textSize || 'text-xs', color)}
          >
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default InitialsAvatar;
