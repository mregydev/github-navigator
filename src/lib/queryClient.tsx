import { ErrorToast } from '@/components/ui/errorToast';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

/**
 * React Query Client
 */
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      let title = 'Error';
      let description = error.message;

      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (
          status === 403 &&
          typeof data?.message === 'string' &&
          data.message.includes('API rate limit')
        ) {
          title = 'GitHub Rate Limit Exceeded';
          description =
            'You have exceeded the GitHub API rate limit. Please wait a few minutes and try again, or use an authenticated token.';
        }
      }

      toast.custom(() => (
        <ErrorToast title={title} description={description} />
      ));
    },
  }),
});
