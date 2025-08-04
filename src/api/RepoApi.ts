import axios from 'axios';
import type { Repository } from '../dto/Repository';



const api = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_API_BASE_URL,
  headers: {
    Accept: 'application/vnd.github+json',
  },
})


/**
 * Fetches GitHub repositories with filters.
 * @param query - The search term
 * @param language - Optional language filter
 * @param sort - Sorting by 'stars' or 'forks'
 * @param page - Pagination page number
 */
export const fetchRepos = async (
    query: string,
    language: string = '',
    sort: 'stars' | 'forks' = 'stars',
    page: number = 1
  ): Promise<Repository[]> => {
    const trimmedQuery = query.trim();
    const langFilter = language && language !== 'all' ? `language:${language}` : '';
  
    
    const qParts = [];
    if (trimmedQuery) qParts.push(trimmedQuery);
    if (langFilter) qParts.push(langFilter);
    
    const q = qParts.join(' ') || 'stars:>0'; 
  
    const response = await api.get('/search/repositories', {
      params: {
        q,
        sort,
        order: 'desc',
        per_page: 10,
        page,
      },
    });
  
    return response.data.items;
  };
  
export const fetchRepoDetails = async (owner: string, repo: string): Promise<Repository> => {
  const [repoRes, contributorsRes, issuesRes] = await Promise.all([
    api.get(`/repos/${owner}/${repo}`),
    api.get(`/repos/${owner}/${repo}/contributors`, { params: { per_page: 5 } }),
    api.get(`/repos/${owner}/${repo}/issues`, { params: { per_page: 5, state: 'open' } }),
  ]);

  const repoData: Repository = {
    ...repoRes.data,
    contributors: contributorsRes.data,
    open_issues: issuesRes.data
  };

  return repoData;
};
