// Search cache and common queries for the Java OOP course
export interface SearchCacheItem {
  query: string;
  category: 'tutorial' | 'reference' | 'example' | 'download';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  url?: string;
  description: string;
  tags: string[];
  popularity: number; // Higher = more popular
}

// Common search terms and their cached results
export const searchCache: SearchCacheItem[] = [
  // Java Basics
  {
    query: 'java class',
    category: 'tutorial',
    difficulty: 'Beginner',
    url: '/section/introduction',
    description: 'Learn how to create and define classes in Java',
    tags: ['class', 'object', 'java', 'basics', 'oop', 'introduction', 'overview', 'complexity', 'uml', 'terminology'],
    popularity: 95
  },
  {
    query: 'object creation',
    category: 'tutorial',
    difficulty: 'Beginner',
    url: '/section/foundations',
    description: 'How to instantiate objects from classes using new keyword',
    tags: ['object', 'instantiation', 'new', 'constructor', 'foundations', 'jvm', 'platform', 'data types', 'keywords', 'variables'],
    popularity: 92
  },

  // Object-Oriented Programming
  {
    query: 'inheritance',
    category: 'tutorial',
    difficulty: 'Intermediate',
    url: '/section/inheritance',
    description: 'Understand inheritance relationships and extends keyword',
    tags: ['inheritance', 'extends', 'superclass', 'subclass', 'is-a', 'hierarchy', 'reusability', 'parent', 'child', 'base', 'derived'],
    popularity: 89
  },
  {
    query: 'polymorphism',
    category: 'tutorial',
    difficulty: 'Advanced',
    url: '/section/polymorphism',
    description: 'Method overriding, overloading, and runtime polymorphism',
    tags: ['polymorphism', 'override', 'overload', 'dynamic', 'binding', 'forms', 'overriding', 'overloading', 'flexibility'],
    popularity: 85
  },
  {
    query: 'encapsulation',
    category: 'tutorial',
    difficulty: 'Intermediate',
    url: '/section/encapsulation',
    description: 'Data hiding using private fields and public methods',
    tags: ['encapsulation', 'private', 'public', 'getter', 'setter', 'data-hiding', 'fields', 'methods', 'cohesion', 'coupling', 'uml', 'access modifier'],
    popularity: 91
  },

  // Exception Handling
  {
    query: 'exception handling',
    category: 'tutorial',
    difficulty: 'Intermediate',
    url: '/section/exception',
    description: 'Try-catch blocks, finally, and custom exceptions',
    tags: ['exception', 'try', 'catch', 'finally', 'throw', 'throws', 'checked', 'unchecked', 'runtime', 'error', 'handling'],
    popularity: 87
  },

  // Collections Framework
  {
    query: 'arraylist',
    category: 'tutorial',
    difficulty: 'Intermediate',
    url: '/section/collection',
    description: 'Dynamic arrays using ArrayList class',
    tags: ['arraylist', 'list', 'dynamic', 'array', 'collections', 'adt', 'data structure', 'framework', 'java.util'],
    popularity: 90
  },
  {
    query: 'hashmap',
    category: 'tutorial',
    difficulty: 'Intermediate',
    url: '/section/collection',
    description: 'Key-value pairs using HashMap implementation',
    tags: ['hashmap', 'map', 'key', 'value', 'dictionary', 'collections', 'adt', 'data structure', 'framework', 'java.util'],
    popularity: 86
  },

  // File I/O
  {
    query: 'file io',
    category: 'tutorial',
    difficulty: 'Intermediate',
    url: '/section/io',
    description: 'Reading and writing files in Java applications',
    tags: ['file', 'io', 'input', 'output', 'stream', 'reader', 'writer', 'scanner', 'system.in', 'system.out', 'command line', 'standard input', 'standard output'],
    popularity: 78
  },

  // Downloads and References
  {
    query: 'syllabus',
    category: 'download',
    difficulty: 'Beginner',
    url: 'https://drive.google.com/file/d/1F-MrzcO8qpKdOirw5AA0-ZzfHs6Su0XG/view',
    description: 'Complete course syllabus and learning objectives',
    tags: ['syllabus', 'course', 'outline', 'schedule', 'objectives', 'reference'],
    popularity: 75
  },
  {
    query: 'cheat sheet',
    category: 'download',
    difficulty: 'Beginner',
    description: 'Quick reference guide for Java syntax and concepts',
    tags: ['cheat', 'sheet', 'reference', 'quick', 'guide', 'syntax', 'summary', 'java'],
    popularity: 88
  }
];

// Popular search queries based on course content
export const popularQueries = [
  'java classes',
  'inheritance',
  'polymorphism', 
  'exception handling',
  'arraylist',
  'encapsulation',
  'constructor',
  'interface',
  'collections framework',
  'getter setter'
];

// Search suggestions for "Did you mean?" functionality
export const searchSuggestions: { [key: string]: string[] } = {
  'inhertance': ['inheritance'],
  'polymorfism': ['polymorphism'],
  'excpetion': ['exception'],
  'encapulation': ['encapsulation'],
  'constructer': ['constructor'],
  'araylist': ['arraylist'],
  'hasmap': ['hashmap'],
  'interfce': ['interface'],
  'abstrac': ['abstract'],
  'overide': ['override'],
  'overoad': ['overload'],
  'finaly': ['finally'],
  'accesors': ['accessors'],
  'mutators': ['mutators'],
  'colections': ['collections']
};

// Search analytics interface
export interface SearchAnalytics {
  query: string;
  timestamp: number;
  resultCount: number;
  filter?: string;
  category?: string;
  clicked?: boolean;
  clickedResult?: string;
}

// Helper functions for search cache
export const getPopularQueriesByCategory = (category?: string) => {
  if (!category) return popularQueries;
  
  return searchCache
    .filter(item => item.category === category)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5)
    .map(item => item.query);
};

export const findSimilarQueries = (query: string): string[] => {
  const normalized = query.toLowerCase().trim();
  
  // Check for direct suggestions
  if (searchSuggestions[normalized]) {
    return searchSuggestions[normalized];
  }
  
  // Find similar queries from cache
  const similar = searchCache
    .filter(item => {
      const itemQuery = item.query.toLowerCase();
      return itemQuery.includes(normalized) || 
             normalized.includes(itemQuery) ||
             item.tags.some(tag => tag.includes(normalized) || normalized.includes(tag));
    })
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3)
    .map(item => item.query);
  
  return similar;
};

export const getSearchCacheByQuery = (query: string): SearchCacheItem[] => {
  const normalized = query.toLowerCase().trim();
  
  return searchCache.filter(item => {
    const itemQuery = item.query.toLowerCase();
    const tagsMatch = item.tags.some(tag => 
      tag.includes(normalized) || normalized.includes(tag)
    );
    const descriptionMatch = item.description.toLowerCase().includes(normalized);
    
    return itemQuery.includes(normalized) || 
           normalized.includes(itemQuery) ||
           tagsMatch ||
           descriptionMatch;
  }).sort((a, b) => b.popularity - a.popularity);
};

// Analytics storage functions
export const saveSearchAnalytics = (analytics: SearchAnalytics) => {
  const existing = JSON.parse(localStorage.getItem('searchAnalytics') || '[]');
  existing.push(analytics);
  localStorage.setItem('searchAnalytics', JSON.stringify(existing.slice(-200))); // Keep last 200
};

export const getSearchAnalytics = (): SearchAnalytics[] => {
  return JSON.parse(localStorage.getItem('searchAnalytics') || '[]');
};

export const getTopSearches = (limit: number = 10): string[] => {
  const analytics = getSearchAnalytics();
  const queryCounts: { [key: string]: number } = {};
  
  analytics.forEach(item => {
    queryCounts[item.query] = (queryCounts[item.query] || 0) + 1;
  });
  
  return Object.entries(queryCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([query]) => query);
};