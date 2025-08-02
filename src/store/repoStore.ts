import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Repository } from '../dto/Repository';


interface RepoState {
  // Filters
  query: string;
  language: string;
  sort: 'stars' | 'forks';

  // Bookmarks
  bookmarks: { [id: string]: string };

  // Setters
  setQuery: (q: string) => void;
  setLanguage: (lang: string) => void;
  setSort: (sort: 'stars' | 'forks') => void;

  // Bookmark handlers
  toggleBookmark: (repo: Repository) => void;
  isBookmarked: (id: number) => boolean;
}

export const useRepoStore = create<RepoState>()(
  persist(
    (set, get) => ({
      // Initial state
      query: '',
      language: '',
      sort: 'stars',
      bookmarks: {},

      // Filter setters
      setQuery: (q) => set({ query: q }),
      setLanguage: (lang) => set({ language: lang }),
      setSort: (sort) => set({ sort }),

      // Bookmark logic
      toggleBookmark: (repo) => {
        const { bookmarks } = get();
        const isBookmarked=bookmarks[repo.id];

        set({ bookmarks: { ...bookmarks, [repo.id]: !isBookmarked } });
      },

      isBookmarked: (id) => {
        return !!get().bookmarks[id];
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
