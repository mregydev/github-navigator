import type { Issue } from '@/dto/Issue';

export interface IssuesProps {
  issues: Issue[];
}

const Issues = ({ issues }: IssuesProps) => (
  <div>
    <h2 className='text-lg font-semibold mb-2'>Open Issues</h2>
    <ul className='list-disc ml-6 space-y-1 text-sm'>
      {issues.map((i, idx) => (
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
);

export default Issues;
