import { useQuery } from '@tanstack/react-query';

import { useRepoStore } from '../store/repoStore';
import { Link } from 'react-router-dom';
import { fetchRepos } from '../api/RepoApi';

const RepoList = () => {
  const query = useRepoStore((s) => s.query);
  const language = useRepoStore((s) => s.language);
  const sort = useRepoStore((s) => s.sort);
  const markBookmarkedRepos = useRepoStore((s) => s.markBookmarkedRepos);
  const toggleBookmark = useRepoStore((s) => s.toggleBookmark);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['repos', query, language, sort],
    queryFn: () => fetchRepos(query, language, sort),
    enabled: !!query,
    select: markBookmarkedRepos,
  });

  if (isLoading) return <p className='p-4'>Loading repos...</p>;
  if (isError || !data) return <p className='p-4'>Error loading repos.</p>;

  return (
    <div className='space-y-4'>
      {data.map((repo) => (
        <div
          key={repo.id}
          className='border rounded p-4 bg-white hover:shadow-lg transition flex justify-between items-start'
        >
          <div>
            <Link
              to={`/repo/${repo.owner.login}/${repo.name}`}
              className='font-semibold text-lg text-blue-600 hover:underline'
            >
              {repo.full_name}
            </Link>
            <p className='text-sm text-gray-600 mt-1'>{repo.description}</p>
          </div>
          <button
            onClick={() => toggleBookmark(repo)}
            className={
              repo.isBookmarked
                ? 'text-green-500 text-xl'
                : 'text-gray-300 text-xl hover:text-gray-500'
            }
            title={repo.isBookmarked ? 'Unbookmark' : 'Bookmark'}
          >
            {repo.isBookmarked ? '★' : '☆'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RepoList;
