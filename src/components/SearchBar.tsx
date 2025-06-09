import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchResult {
  type: 'code' | 'download' | 'section' | 'tutorial' | 'reference' | 'example';
  content: string;
  element?: HTMLElement;
  url?: string;
  category?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  description?: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fuzzy search function for typo correction
  const fuzzyMatch = (str: string, pattern: string): boolean => {
    pattern = pattern.toLowerCase();
    str = str.toLowerCase();
    
    let patternIdx = 0;
    for (let strIdx = 0; strIdx < str.length; strIdx++) {
      if (patternIdx < pattern.length && str[strIdx] === pattern[patternIdx]) {
        patternIdx++;
      }
    }
    return patternIdx === pattern.length;
  };

  // Search function
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];

    // Search code blocks
    const codeBlocks = document.querySelectorAll('pre, code, .code-block');
    codeBlocks.forEach((block) => {
      const text = block.textContent || '';
      if (fuzzyMatch(text, searchQuery) || text.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push({
          type: 'code',
          content: text.slice(0, 100) + (text.length > 100 ? '...' : ''),
          element: block as HTMLElement
        });
      }
    });

    // Search downloadable materials
    const downloadLinks = document.querySelectorAll('a[href$=".pdf"], a[href$=".doc"], a[href$=".zip"], .download-link');
    downloadLinks.forEach((link) => {
      const text = link.textContent || '';
      const href = (link as HTMLAnchorElement).href;
      if (fuzzyMatch(text, searchQuery) || text.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push({
          type: 'download',
          content: text,
          url: href,
          element: link as HTMLElement
        });
      }
    });

    // Search page sections
    const sections = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .section, section');
    sections.forEach((section) => {
      const text = section.textContent || '';
      if (fuzzyMatch(text, searchQuery) || text.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push({
          type: 'section',
          content: text.slice(0, 80) + (text.length > 80 ? '...' : ''),
          element: section as HTMLElement
        });
      }
    });

    setResults(searchResults.slice(0, 10)); // Limit to 10 results
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle result selection
  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'download' && result.url) {
      window.open(result.url, '_blank');
    } else if (result.element) {
      result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Highlight the element temporarily
      result.element.style.backgroundColor = '#3A86FF';
      result.element.style.transition = 'background-color 0.3s';
      setTimeout(() => {
        result.element!.style.backgroundColor = '';
      }, 2000);
    }
    setIsOpen(false);
    setQuery('');
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleResultClick(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'code': return '📝';
      case 'download': return '📥';
      case 'section': return '📍';
      default: return '🔍';
    }
  };

  const getResultTypeLabel = (type: string) => {
    switch (type) {
      case 'code': return 'Code';
      case 'download': return 'Download';
      case 'section': return 'Section';
      default: return 'Result';
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="search"
          placeholder="Search code, downloads, sections..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-64 px-4 py-2 pl-10 pr-10 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Search the page"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={index}
              onClick={() => handleResultClick(result)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                index === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{getResultIcon(result.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                      {getResultTypeLabel(result.type)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-gray-100 truncate">
                    {result.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
            No results found for "{query}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;