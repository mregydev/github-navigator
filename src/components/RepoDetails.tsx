// File: src/components/RepoDetails.tsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchRepoDetails } from '../api/RepoApi';


const RepoDetails = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['repoDetails', owner, name],
    queryFn: () => fetchRepoDetails(owner!, name!),
    enabled: !!owner && !!name,
  });

  if (isLoading) return <p className="p-4">Loading details...</p>;
  if (isError || !data) return <p className="p-4">Error loading repo details.</p>;

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">{data.full_name}</h1>
      <p className="text-gray-700 mb-4">{data.description}</p>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
        <div>⭐ Stars: {data.stargazers_count}</div>
        <div>🍴 Forks: {data.forks_count}</div>
        <div>👁 Watchers: {data.watchers_count}</div>
        <div>📝 Language: {data.language}</div>
      </div>

      <h2 className="text-lg font-semibold mt-4">Top Contributors</h2>
      <ul className="list-disc ml-6 space-y-1 text-sm">
        {data.contributors?.map((c) => (
          <li key={c.login}>
            <a href={c.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {c.login}
            </a>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-6">Open Issues</h2>
      <ul className="list-disc ml-6 space-y-1 text-sm">
        {data.open_issues?.map((i, idx) => (
          <li key={idx}>
            <a href={i.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {i.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoDetails;
