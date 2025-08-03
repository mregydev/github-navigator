import axios from 'axios';
import type { Contributor } from '../dto/Contributor';
import type { Issue } from '../dto/Issue';
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
    const baseQuery = !query.trim() ? 'true' : query;
    const langPart = language ? `+language:${language}` : '';
    const q = `${baseQuery}${langPart}`;

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
    contributors: contributorsRes.data.map((c:Contributor): Contributor => ({
      login: c.login,
      avatar_url: c.avatar_url,
      html_url: c.html_url,
    })),
    open_issues: issuesRes.data.map((i: Issue): Issue => ({
      title: i.title,
      html_url: i.html_url,
    })),
  };

  return repoData;
};
