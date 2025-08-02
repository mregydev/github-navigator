import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Repository } from '../dto/Repository';


interface RepoState {
  // Filters
  query: string;
  language: string;
  sort: 'stars' | 'forks';

  // Bookmarks
  bookmarks: Repository[];

  // Setters
  setQuery: (q: string) => void;
  setLanguage: (lang: string) => void;
  setSort: (sort: 'stars' | 'forks') => void;

  // Bookmark handlers
  toggleBookmark: (repo: Repository) => void;
  isBookmarked: (id: number) => boolean;
  markBookmarkedRepos: (repos: Repository[]) => Repository[];
}

export const useRepoStore = create<RepoState>()(
  persist(
    (set, get) => ({
      // Initial state
      query: 'react',
      language: '',
      sort: 'stars',
      bookmarks: [],

      // Filter setters
      setQuery: (q) => set({ query: q }),
      setLanguage: (lang) => set({ language: lang }),
      setSort: (sort) => set({ sort }),

      // Bookmark logic
      toggleBookmark: (repo) => {
        const { bookmarks } = get();
        const exists = bookmarks.some((r) => r.id === repo.id);
        const updated = exists
          ? bookmarks.filter((r) => r.id !== repo.id)
          : [...bookmarks, repo];
        set({ bookmarks: updated });
      },

      isBookmarked: (id) => {
        return get().bookmarks.some((r) => r.id === id);
      },

      markBookmarkedRepos: (repos) => {
        const { bookmarks } = get();
        return repos.map((r) => ({
          ...r,
          isBookmarked: bookmarks.some((b) => b.id === r.id),
        }));
      },
    }),
    {
      name: 'repo-store',
      partialize: (state) => ({
        bookmarks: state.bookmarks, 
      }),
    }
  )
);
