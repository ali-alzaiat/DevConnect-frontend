import { MessageSquareCode } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 logo">
      <MessageSquareCode className="h-6 w-6 bg-brand p-1 text-on-brand" /> DevConnect
    </div>
  );
};

export default Logo;
