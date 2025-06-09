import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, Filter } from 'lucide-react';
import { findSimilarQueries, getSearchCacheByQuery, saveSearchAnalytics } from '../data/searchCache';
import { sections } from '../data/sections';

interface SearchResult {
  type: 'tutorial' | 'reference' | 'example' | 'download' | 'code';
  content: string;
  url?: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  element?: HTMLElement;
}

interface SearchCategory {
  name: string;
  results: SearchResult[];
}

const AdvancedSearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [didYouMeanSuggestions, setDidYouMeanSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches on mount
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Debounced search with 300ms delay and cancel inflight requests
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(-1);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const timeoutId = setTimeout(() => {
      if (!controller.signal.aborted) {
        performSearch(query);
        setIsLoading(false);
      }
    }, 300);
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
      setIsLoading(false);
    };
  }, [query, selectedFilter]);

  // Enhanced search data categorized like W3Schools
  const searchData = {
    tutorials: [
      { content: 'Java Basics Tutorial', url: '/section/introduction', difficulty: 'Beginner' as const, description: 'Learn Java fundamentals, syntax, and basic programming concepts' },
      { content: 'Object-Oriented Programming Guide', url: '/section/foundations', difficulty: 'Beginner' as const, description: 'Understanding classes, objects, and OOP principles' },
      { content: 'Inheritance and Polymorphism', url: '/section/inheritance', difficulty: 'Advanced' as const, description: 'Master advanced OOP concepts and design patterns' },
      { content: 'Exception Handling Mastery', url: '/section/exception-handling', difficulty: 'Intermediate' as const, description: 'Learn proper error handling and debugging techniques' },
      { content: 'Collections Framework Complete Guide', url: '/section/collections', difficulty: 'Intermediate' as const, description: 'Master Lists, Sets, Maps, and collection algorithms' },
      { content: 'File I/O Operations', url: '/section/file-io', difficulty: 'Intermediate' as const, description: 'Reading and writing files in Java applications' }
    ],
    references: [
      { content: 'Java API Documentation', url: '#', difficulty: 'Intermediate' as const, description: 'Complete reference for Java standard library classes and methods' },
      { content: 'OOP Principles Quick Reference', url: '#', difficulty: 'Beginner' as const, description: 'Essential object-oriented programming concepts summary' },
      { content: 'Java Keywords Reference', url: '#', difficulty: 'Beginner' as const, description: 'Complete list of Java reserved words and their usage' },
      { content: 'Exception Types Catalog', url: '#', difficulty: 'Intermediate' as const, description: 'Comprehensive list of Java exception classes' },
      { content: 'Collection Interface Hierarchy', url: '#', difficulty: 'Intermediate' as const, description: 'Visual guide to Java collections framework structure' }
    ],
    examples: [
      { content: 'class Student { private String name; }', url: '#', difficulty: 'Beginner' as const, description: 'Basic class definition with encapsulation' },
      { content: 'public void setName(String name) { this.name = name; }', url: '#', difficulty: 'Beginner' as const, description: 'Setter method implementation example' },
      { content: 'ArrayList<String> list = new ArrayList<>();', url: '#', difficulty: 'Intermediate' as const, description: 'Generic collections instantiation and usage' },
      { content: 'try { /* code */ } catch (Exception e) { System.out.println(e.getMessage()); }', url: '#', difficulty: 'Intermediate' as const, description: 'Exception handling with try-catch blocks' },
      { content: 'public class Dog extends Animal implements Playable', url: '#', difficulty: 'Advanced' as const, description: 'Multiple inheritance using extends and implements' },
      { content: 'Map<String, Integer> scores = new HashMap<>();', url: '#', difficulty: 'Intermediate' as const, description: 'Map collection for key-value pair storage' }
    ],
    downloads: [
      { content: 'Course Syllabus PDF', url: 'https://drive.google.com/file/d/1F-MrzcO8qpKdOirw5AA0-ZzfHs6Su0XG/view', difficulty: 'Beginner' as const, description: 'Complete course outline, schedule, and learning objectives' },
      { content: 'Java Syntax Cheat Sheet', url: '#', difficulty: 'Beginner' as const, description: 'Essential Java syntax reference for quick lookup' },
      { content: 'Practice Exercise Collection', url: '#', difficulty: 'Intermediate' as const, description: 'Coding challenges with solutions and explanations' },
      { content: 'OOP Design Patterns Guide', url: '#', difficulty: 'Advanced' as const, description: 'Common design patterns implemented in Java' }
    ]
  };

  // Enhanced fuzzy search with better matching
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

  // Helper to highlight query in text
  const highlightQuery = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
    return text.split(regex).map((part, i) =>
      regex.test(part)
        ? <mark key={i} className="bg-yellow-200 text-black rounded px-0.5">{part}</mark>
        : part
    );
  };

  // Enhanced search with cache integration and "Did you mean?" suggestions
  const performSearch = (searchQuery: string) => {
    const categories: SearchCategory[] = [];
    
    // First, search the cache for exact and fuzzy matches
    const cacheResults = getSearchCacheByQuery(searchQuery);
    
    // Group cache results by category
    const categoryGroups: { [key: string]: SearchResult[] } = {};
    
    cacheResults.forEach(item => {
      // Filter by difficulty
      if (selectedFilter !== 'all' && item.difficulty.toLowerCase() !== selectedFilter) {
        return;
      }
      
      const category = item.category.charAt(0).toUpperCase() + item.category.slice(1) + 's';
      
      if (!categoryGroups[category]) {
        categoryGroups[category] = [];
      }
      
      categoryGroups[category].push({
        type: item.category,
        content: item.query,
        url: item.url,
        category: item.category.charAt(0).toUpperCase() + item.category.slice(1),
        difficulty: item.difficulty,
        description: item.description
      });
    });

    // Convert grouped results to categories
    Object.entries(categoryGroups).forEach(([categoryName, results]) => {
      if (results.length > 0) {
        categories.push({
          name: categoryName,
          results: results.slice(0, 4) // Limit to 4 results per category
        });
      }
    });

    // Also search static data if cache doesn't have enough results
    if (categories.length === 0 || categories.reduce((total, cat) => total + cat.results.length, 0) < 5) {
      Object.entries(searchData).forEach(([categoryName, items]) => {
        const categoryResults: SearchResult[] = [];
        
        items.forEach(item => {
          // Filter by difficulty
          if (selectedFilter !== 'all' && item.difficulty.toLowerCase() !== selectedFilter) {
            return;
          }
          
          // Check if query matches content or description
          const contentMatch = fuzzyMatch(item.content, searchQuery) || 
            item.content.toLowerCase().includes(searchQuery.toLowerCase());
          const descriptionMatch = fuzzyMatch(item.description, searchQuery) || 
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
          
          if (contentMatch || descriptionMatch) {
            categoryResults.push({
              type: categoryName.slice(0, -1) as any,
              content: item.content,
              url: item.url,
              category: categoryName.charAt(0).toUpperCase() + categoryName.slice(1, -1),
              difficulty: item.difficulty,
              description: item.description
            });
          }
        });
        
        if (categoryResults.length > 0) {
          // Check if category already exists, if so merge
          const existingCategory = categories.find(cat => cat.name === categoryName.charAt(0).toUpperCase() + categoryName.slice(1));
          if (existingCategory) {
            existingCategory.results.push(...categoryResults.slice(0, 2));
          } else {
            categories.push({
              name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
              results: categoryResults.slice(0, 3)
            });
          }
        }
      });
    }

    // Search live content on the page
    const codeBlocks = document.querySelectorAll('pre, code, .code-block');
    const liveResults: SearchResult[] = [];
    
    codeBlocks.forEach((block) => {
      const text = block.textContent || '';
      if (fuzzyMatch(text, searchQuery) || text.toLowerCase().includes(searchQuery.toLowerCase())) {
        liveResults.push({
          type: 'code',
          content: text.slice(0, 100) + (text.length > 100 ? '...' : ''),
          category: 'Live Code',
          difficulty: 'Intermediate' as const,
          description: 'Code found on current page',
          element: block as HTMLElement
        });
      }
    });

    if (liveResults.length > 0) {
      categories.push({
        name: 'Live Code',
        results: liveResults.slice(0, 2)
      });
    }

    // Check for "Did you mean?" suggestions if no results found
    if (categories.length === 0) {
      const suggestions = findSimilarQueries(searchQuery);
      setDidYouMeanSuggestions(suggestions);
    } else {
      setDidYouMeanSuggestions([]);
    }

    setResults(categories);
    trackSearch(searchQuery);
  };

  // Enhanced analytics tracking with cache integration
  const trackSearch = (searchQuery: string) => {
    const resultCount = results.reduce((total, category) => total + category.results.length, 0);
    const analytics = {
      query: searchQuery,
      timestamp: Date.now(),
      resultCount,
      filter: selectedFilter,
      category: results.length > 0 ? results[0].name : undefined
    };
    saveSearchAnalytics(analytics);
    // Update recent searches
    const updatedRecent = [searchQuery, ...recentSearches.filter(q => q !== searchQuery)].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
  };

  // Log click-through analytics
  const logClickThrough = (result: SearchResult) => {
    saveSearchAnalytics({
      query,
      timestamp: Date.now(),
      resultCount: 1,
      category: result.category
    });
  };

  const validSectionIds = sections.map(s => s.id);

  // Handle result selection
  const handleResultClick = (result: SearchResult) => {
    logClickThrough(result);
    if (result.url && result.url !== '#') {
      if (result.url.startsWith('http')) {
        window.open(result.url, '_blank');
      } else {
        // For internal section navigation, only navigate if section exists
        const sectionId = result.url.split('/').pop();
        if (sectionId && validSectionIds.includes(sectionId)) {
          window.location.href = result.url;
          setTimeout(() => {
            if (result.url) {
              const heading = document.querySelector(
                `[id='${sectionId}'] h1, [id='${sectionId}'] h2, .info-section h1, .info-section h2`
              );
              if (heading) {
                (heading as HTMLElement).style.backgroundColor = 'yellow';
                setTimeout(() => {
                  (heading as HTMLElement).style.backgroundColor = '';
                }, 2000);
              }
            }
          }, 500);
        } else {
          // Optionally show a toast or error (simple alert for now)
          alert('Section not found. Please select a valid section.');
          return;
        }
      }
    } else if (result.element) {
      result.element.scrollIntoView({ behavior: 'smooth' });
      result.element.style.backgroundColor = 'yellow';
      setTimeout(() => {
        result.element!.style.backgroundColor = '';
      }, 2000);
    }
    setIsOpen(false);
    setQuery('');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const totalResults = results.reduce((total, category) => total + category.results.length, 0);
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % totalResults);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? totalResults - 1 : prev - 1);
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        let currentIndex = 0;
        for (const category of results) {
          for (const result of category.results) {
            if (currentIndex === selectedIndex) {
              handleResultClick(result);
              return;
            }
            currentIndex++;
          }
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto" role="search" aria-label="Site search">
      {/* YouTube-style pill search container */}
      <div className="relative flex justify-center">
        <div className="relative w-full max-w-lg">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsOpen(true);
              setShowSuggestions(true);
            }}
            placeholder="Search tutorials, examples, references..."
            className="w-full px-12 py-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls="search-results-dropdown"
            aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
          />
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
          <div className="absolute right-3 top-2 flex items-center space-x-1">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${showFilters ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              title="Filters"
              aria-label="Toggle filters"
              tabIndex={0}
            >
              <Filter className="h-4 w-4" />
            </button>
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setIsOpen(false);
                  setDidYouMeanSuggestions([]);
                }}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-400 transition-colors"
                aria-label="Clear search"
                tabIndex={0}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {isLoading && (
            <div className="absolute right-12 top-3.5">
              <span className="inline-block w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" aria-label="Loading"></span>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="absolute top-12 left-0 right-0 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty:</span>
            {['all', 'beginner', 'intermediate', 'advanced'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter as any)}
                className={`px-3 py-1 text-xs rounded-full border ${
                  selectedFilter === filter
                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
                aria-pressed={selectedFilter === filter}
                tabIndex={0}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Dropdown */}
      {isOpen && (
        <div id="search-results-dropdown" role="listbox" aria-label="Search results" className="absolute top-12 left-0 right-0 z-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-96 overflow-y-auto p-2">
          {/* Suggestions when no query */}
          {!query && showSuggestions && (
            <div className="p-4">
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Searches</span>
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(search)}
                      className="block w-full text-left px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      tabIndex={0}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Search Results */}
          {query && results.length > 0 && (
            <div>
              {results.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-4 last:mb-2">
                  <div className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {category.name}
                  </div>
                  {category.results.map((result, resultIndex) => {
                    const globalIndex = results.slice(0, categoryIndex).reduce((sum, cat) => sum + cat.results.length, 0) + resultIndex;
                    return (
                      <button
                        key={resultIndex}
                        id={`search-result-${globalIndex}`}
                        role="option"
                        aria-selected={selectedIndex === globalIndex}
                        onClick={() => handleResultClick(result)}
                        className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          selectedIndex === globalIndex ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                        }`}
                        tabIndex={0}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 dark:text-white truncate">
                              {highlightQuery(result.content, query)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {highlightQuery(result.description, query)}
                            </div>
                          </div>
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getDifficultyColor(result.difficulty)}`}>
                            {result.difficulty}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* "Did you mean?" suggestions and No results */}
          {query && results.length === 0 && (
            <div className="p-4">
              {didYouMeanSuggestions.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Did you mean:</p>
                  {didYouMeanSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(suggestion)}
                      className="inline-block mr-2 mb-2 px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                      tabIndex={0}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p>No results found for "{query}"</p>
                <p className="text-sm mt-1">Try adjusting your search terms or filters</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchBar;
