import { useQuery } from '@tanstack/react-query';

import { useRepoStore } from '../../store/repoStore';

import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { fetchRepos } from '@/api/RepoApi';
import LoadingSpinner from '../LoadingSpinner';
import RepoListItem from './RepoListItem';

const RepoList = () => {
  const { query, language, sort, bookmarks } =
    useRepoStore((s) => s);

  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('changed');
  }, [bookmarks]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['repos', query, language, sort, page],
    queryFn: () => fetchRepos(query, language, sort, page),
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <Alert variant='destructive' className='my-6'>
        <Terminal className='h-5 w-5' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong while fetching repositories. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className='text-center py-10 text-gray-500'>
        <p className='text-lg'>No repositories found for your search.</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {data.map((repo) => (
        <RepoListItem repo={repo}></RepoListItem>
      ))}

      <Pagination className='justify-center pt-4'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => setPage((p) => p + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default RepoList;
