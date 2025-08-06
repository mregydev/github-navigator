import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchRepoDetails } from '../../api/RepoApi';
import LoadingSpinner from '../LoadingSpinner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Code2, Eye, GitFork, Star } from 'lucide-react';

import Contributors from './Contributors';
import Issues from './Issues';
import { Result } from '../ui/result';

const RepoDetails = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['repoDetails', owner, name],
    queryFn: () => fetchRepoDetails(owner!, name!),
    enabled: !!owner && !!name,
  });

  if (isLoading) return <LoadingSpinner />;
  if (!data) {
    return (
      <Result
        type='warning'
        message='Respository details doesnot exist'
      ></Result>
    );
  }

  return (
    data && (
      <Card className='max-w-4xl mx-auto p-6'>
        <CardHeader>
          <CardTitle className='text-blue-700 text-2xl'>
            <img src={data.owner.avatar_url} width={60} />
            {data.full_name}
          </CardTitle>
          <CardDescription className='text-gray-700 mt-2 break-normal'>
            {data.description}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600'>
            <div className='flex items-center gap-2'>
              <Star className='w-4 h-4 text-yellow-500' />
              <span>{data.stargazers_count} Stars</span>
            </div>
            <div className='flex items-center gap-2'>
              <GitFork className='w-4 h-4 text-gray-600' />
              <span>{data.forks_count} Forks</span>
            </div>
            <div className='flex items-center gap-2'>
              <Eye className='w-4 h-4 text-gray-600' />
              <span>{data.watchers_count} Watchers</span>
            </div>
            <div className='flex items-center gap-2'>
              <Code2 className='w-4 h-4 text-gray-600' />
              <span>{data.language}</span>
            </div>
          </div>

          <Separator />

          {!!data.contributors && (
            <Contributors contributors={data.contributors} />
          )}
          <Separator />
          {!!data.open_issues && <Issues issues={data.open_issues} />}
        </CardContent>
      </Card>
    )
  );
};

export default RepoDetails;
