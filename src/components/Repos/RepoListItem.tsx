import type { Repository } from '@/dto/Repository';
import { Star, GitFork } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { useRepoStore } from '@/store/repoStore';

export interface RepoListItemProps {
  repo: Repository;
}

const RepoListItem = ({ repo }: RepoListItemProps) => {
  const { toggleBookmark, isBookmarked } = useRepoStore((s) => s);
  return (
    <Card key={repo.id} className='p-4'>
      <CardContent className='flex justify-between items-start px-0'>
        <div>
          <Link
            to={`/repo/${repo.owner.login}/${repo.name}`}
            className='font-semibold text-lg text-blue-600 hover:underline'
          >
            <span className='flex mb-3'>
              <img
                className='mr-2'
                src={repo.owner.avatar_url}
                width={40}
              ></img>
              {repo.full_name}
            </span>
          </Link>
          <p className='text-sm text-gray-600 mt-1'>
            {repo.description?.substring(0, 200) + '...'}
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
  );
};

export default RepoListItem;
