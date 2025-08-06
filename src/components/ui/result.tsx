import { FileWarning } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface ResultProps {
  title?: string;
  message?: string;
  className?: string;
}

export const Result = ({ title, message, className }: ResultProps) => {
  return (
    <Alert
      variant={'default'}
      className={cn('my-6 flex items-start gap-3', className)}
    >
      <FileWarning className='h-5 w-5 text-muted-foreground' />
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
};
