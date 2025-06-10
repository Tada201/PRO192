import { useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';
import { useNavigate } from 'react-router-dom';

const SearchModal = () => {
  const { 
    isSearchOpen, 
    toggleSearch, 
    searchQuery, 
    setSearchQuery,
    recentSearches,
    addRecentSearch
  } = useSearch();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSearch();
      } else if (e.key === 'Escape' && isSearchOpen) {
        toggleSearch();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSearch, isSearchOpen]);
  
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery);
      // Here we would normally perform a search
      toggleSearch();
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  if (!isSearchOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 sm:px-6">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={toggleSearch}
      ></div>
      
      <div className="relative bg-white dark:bg-blue-900 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden animate-fade-in">
        <form onSubmit={handleSearch}>
          <div className="flex items-center px-4 py-3 border-b dark:border-gray-700">
            <Search size={20} className="mr-3 text-gray-400" />
            <input
              ref={inputRef}
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search is currently not working... Please ignore this function"
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400"
            />
            <button 
              type="button"
              onClick={toggleSearch}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>
        </form>
         {/* Original value for enabled recent search is: "recentSearches.length > 0"
         change this line below the comment to enable recent search function */}
        {recentSearches.length == 0 && (
          <div className="px-4 py-3">
            <h3 className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              <Clock size={14} className="mr-1" />
              Recent Searches
            </h3>
            
            <div className="space-y-1">
              {recentSearches
                .filter(search => search.query.trim() !== '')
                .map(search => (
                  <button
                    key={search.id}
                    onClick={() => {
                      setSearchQuery(search.query);
                      addRecentSearch(search.query);
                      toggleSearch();
                      navigate(`/search?q=${encodeURIComponent(search.query)}`);
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-blue-800 rounded-md"
                  >
                    <span>{search.query}</span>
                    <ArrowRight size={14} className="text-gray-400" />
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
