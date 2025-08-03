import { Terminal, FileWarning } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type ResultType = 'error' | 'warning';

interface ResultProps {
  type: ResultType;
  title?: string;
  message?: string;
  className?: string;
}

export const Result = ({ type, title, message, className }: ResultProps) => {
  const isError = type === 'error';

  return (
    <Alert
      variant={isError ? 'destructive' : 'default'}
      className={cn('my-6 flex items-start gap-3', className)}
    >
      {isError ? (
        <Terminal className='h-5 w-5 text-destructive' />
      ) : (
        <FileWarning className='h-5 w-5 text-muted-foreground' />
      )}
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
};
