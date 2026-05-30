import { LoaderIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export function CustomSpinner({ fullPage = false }) {
  return (
    <div className={`flex items-center justify-center ${fullPage ? 'w-full h-screen' : 'w-full'}`}>
      <Spinner />
    </div>
  );
}
