import { useQuery } from '@tanstack/react-query';

import { useRepoStore } from '../store/repoStore';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { GitFork, Star, Terminal } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { fetchRepos } from '@/api/RepoApi';
import LoadingSpinner from './LoadingSpinner';

const RepoList = () => {
  const { query, language, sort, toggleBookmark, bookmarks, isBookmarked } =
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
        <Card key={repo.id} className='p-4'>
          <CardContent className='flex justify-between items-start px-0'>
            <div>
              <Link
                to={`/repo/${repo.owner.login}/${repo.name}`}
                className='font-semibold text-lg text-blue-600 hover:underline'
              >
                {repo.full_name}
              </Link>
              <p className='text-sm text-gray-600 mt-1'>
                {repo.description.substring(0, 200) + '...'}
              </p>
              <div className='flex gap-4 mt-1 text-xs text-gray-500'>
                <span className='flex items-center gap-1'>
                  <Star className='w-3 h-3' />
                  {repo.stargazers_count}
                </span>
                <span className='flex items-center gap-1'>
                  <GitFork className='w-3 h-3' />
                  {repo.forks_count}
                </span>
              </div>
            </div>
            <button
              onClick={() => toggleBookmark(repo)}
              className={
                isBookmarked(repo.id)
                  ? 'text-green-500 text-xl'
                  : 'text-gray-300 text-xl hover:text-gray-500'
              }
              title={isBookmarked(repo.id) ? 'Unbookmark' : 'Bookmark'}
            >
              {isBookmarked(repo.id) ? '★' : '☆'}
            </button>
          </CardContent>
        </Card>
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
