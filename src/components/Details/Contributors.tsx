import type { Contributor } from '@/dto/Contributor';

export interface ContributorsProps {
  contributors: Contributor[];
}

const Contributors = ({ contributors }: ContributorsProps) => {
  return (
    <>
      <h2 className='text-lg font-semibold mb-2'>Top Contributors</h2>
      <ul className='list-disc ml-6 space-y-1 text-sm'>
        {contributors?.map((c) => (
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
    </>
  );
};

export default Contributors;
