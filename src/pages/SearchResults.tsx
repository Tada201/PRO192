import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';

  // Simulated search results state
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    // Simulate search logic here
    // For now, just simulate no results for any query
    if (query.trim() === '') {
      setResults([]);
    } else {
      // Simulate no results found
      setResults([]);
    }
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Search Results for "{query}"</h1>
      {results.length === 0 ? (
        <div className="border border-gray-400 rounded p-6 text-center text-gray-600 dark:text-gray-300 mt-8">
          <p className="text-xl font-semibold mb-2">No results found</p>
          <p>Try adjusting your search or check back later.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li key={index} className="p-4 border rounded shadow-sm">
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
