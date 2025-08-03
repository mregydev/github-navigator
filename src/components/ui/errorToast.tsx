import { AlertTriangle } from 'lucide-react';

export interface ErrorToastProps {
  title: string;
  description: string;
}

const ErrorToast = ({ title, description }: ErrorToastProps) => (
  <div className='bg-red-600 text-white px-4 py-3 rounded shadow flex items-center gap-3 w-full max-w-sm'>
    <AlertTriangle className='h-5 w-5 text-white' />
    <div className='flex-1'>
      <div className='font-semibold'>{title}</div>
      <div className='text-sm'>{description}</div>
    </div>
  </div>
);

export { ErrorToast };
