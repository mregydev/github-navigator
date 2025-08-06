import { useQuery } from '@tanstack/react-query';

import { useRepoStore } from '../../store/repoStore';

import { useEffect, useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { fetchRepos } from '@/api/RepoApi';
import LoadingSpinner from '../ui/spinner';
import RepoListItem from './RepoListItem';
import { Result } from '../ui/result';

const RepoList = () => {
  const { query, language, sort, bookmarks } = useRepoStore((s) => s);

  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('changed');
  }, [bookmarks]);

  const { data, isLoading } = useQuery({
    queryKey: ['repos', query, language, sort, page],
    queryFn: () => fetchRepos(query, language, sort, page),
  });

  if (isLoading) return <LoadingSpinner />;
  if ((!data || !data.length)) {
    return <Result message='No repositores found'></Result>;
  }

  return (
    <div className='space-y-4'>
      {!!data && data.map((repo) => (
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
