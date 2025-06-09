import { createContext, useContext, useState, ReactNode } from 'react';

type RecentSearch = {
  id: string;
  query: string;
  timestamp: number;
};

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  toggleSearch: () => void;
  recentSearches: RecentSearch[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        const parsed: RecentSearch[] = JSON.parse(saved);
        // Filter out empty or whitespace-only queries
        const filtered = parsed.filter(item => item.query.trim() !== '');
        if (filtered.length !== parsed.length) {
          localStorage.setItem('recentSearches', JSON.stringify(filtered));
        }
        return filtered;
      } catch {
        localStorage.removeItem('recentSearches');
        return [];
      }
    }
    return [];
  });

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
    if (!isSearchOpen) {
      setTimeout(() => document.getElementById('search-input')?.focus(), 100);
    }
  };

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    
    setRecentSearches(prev => {
      // Remove if exists already
      const filtered = prev.filter(item => item.query !== query);
      
      // Add new search to the beginning
      const newSearches = [
        { id: Date.now().toString(), query, timestamp: Date.now() },
        ...filtered,
      ].slice(0, 5); // Keep only 5 most recent
      
      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
      return newSearches;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      isSearchOpen, 
      toggleSearch,
      recentSearches,
      addRecentSearch,
      clearRecentSearches
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
