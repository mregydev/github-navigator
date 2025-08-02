import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchRepoDetails } from '../api/RepoApi';
import LoadingSpinner from './LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Terminal } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

const RepoDetails = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['repoDetails', owner, name],
    queryFn: () => fetchRepoDetails(owner!, name!),
    enabled: !!owner && !!name,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    return (
      <Alert variant="destructive" className="my-6">
        <Terminal className="h-5 w-5" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong while fetching repositories. Please try again.</AlertDescription>
      </Alert>
    );
  }


  return (
    data && (
      <Card className='max-w-4xl mx-auto p-6'>
        <CardHeader>
          <CardTitle className='text-blue-700 text-2xl'>
            {data.full_name}
          </CardTitle>
          <CardDescription className='text-gray-700 mt-2'>
            {data.description}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600'>
            <div>
              <strong>⭐ Stars:</strong> {data.stargazers_count}
            </div>
            <div>
              <strong>🍴 Forks:</strong> {data.forks_count}
            </div>
            <div>
              <strong>👁 Watchers:</strong> {data.watchers_count}
            </div>
            <div>
              <strong>📝 Language:</strong> {data.language}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className='text-lg font-semibold mb-2'>Top Contributors</h2>
            <ul className='list-disc ml-6 space-y-1 text-sm'>
              {data.contributors?.map((c) => (
                <li key={c.login}>
                  <a
                    href={c.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'
                  >
                    {c.login}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className='text-lg font-semibold mb-2'>Open Issues</h2>
            <ul className='list-disc ml-6 space-y-1 text-sm'>
              {data.open_issues?.map((i, idx) => (
                <li key={idx}>
                  <a
                    href={i.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'
                  >
                    {i.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default RepoDetails;