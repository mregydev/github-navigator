import type { Contributor } from "./Contributor";
import type { Issue } from "./Issue";

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  open_issues_count: number;
  contributors?: Contributor[];
  open_issues?: Issue[];
  isBookmarked?: boolean;
}