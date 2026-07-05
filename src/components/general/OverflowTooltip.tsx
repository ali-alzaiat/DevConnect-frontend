import React, { useRef, useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface OverflowTooltipProps {
  text: string;
  className?: string;
}

const OverflowTooltip: React.FC<OverflowTooltipProps> = ({ text, className }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const checkOverflow = () => {
    const element = textRef.current;
    if (element) {
      const hasOverflow = element.scrollWidth > element.clientWidth;
      setIsOverflowing(hasOverflow);
    }
  };

  useEffect(() => {
    checkOverflow();

    const element = textRef.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      checkOverflow();
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [text]);

  const displayElement = (
    <div ref={textRef} className={cn('truncate w-full', className)}>
      {text}
    </div>
  );

  if (!isOverflowing || !text) {
    return displayElement;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{displayElement}</TooltipTrigger>
      <TooltipContent className="max-w-[300px] break-words">{text}</TooltipContent>
    </Tooltip>
  );
};

export default OverflowTooltip;
