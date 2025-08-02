import { useRepoStore } from '../store/repoStore';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

const FilterBar = () => {
  const { query, language, sort, setQuery, setLanguage, setSort } =
    useRepoStore((s) => s);

  const [search, setSearch] = useState(query);

  const debounced = useDebouncedCallback((value: string) => {
    setQuery(value);
  }, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);         
    debounced(value);         
  };

  return (
    <div className='mb-4 flex flex-col sm:flex-row gap-2 sm:items-center justify-between bg-white p-4 rounded shadow'>
      <Input
        value={search}
        onChange={handleInputChange}
        className='w-full sm:w-1/2'
        placeholder='Search repositories...'
      />
      <div className='flex gap-2'>
        <Select onValueChange={setLanguage} defaultValue={language}>
          <SelectTrigger className='w-[160px]'>
            <SelectValue placeholder='Language' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Languages</SelectItem>
            <SelectItem value='javascript'>JavaScript</SelectItem>
            <SelectItem value='typescript'>TypeScript</SelectItem>
            <SelectItem value='python'>Python</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(v) => setSort(v as 'stars' | 'forks')}
          defaultValue={sort}
        >
          <SelectTrigger className='w-[160px]'>
            <SelectValue placeholder='Sort by' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='stars'>Sort by Stars</SelectItem>
            <SelectItem value='forks'>Sort by Forks</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
