import { useRepoStore } from '../store/repoStore';

const FilterBar = () => {
  const query = useRepoStore((s) => s.query);
  const setQuery = useRepoStore((s) => s.setQuery);
  const setLanguage = useRepoStore((s) => s.setLanguage);
  const setSort = useRepoStore((s) => s.setSort);

  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:items-center justify-between bg-white p-4 rounded shadow">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2"
        placeholder="Search repositories..."
      />
      <div className="flex gap-2">
        <select
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
        </select>
        <select
          onChange={(e) => setSort(e.target.value as 'stars' | 'forks')}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="stars">Sort by Stars</option>
          <option value="forks">Sort by Forks</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;