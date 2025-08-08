'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiSearch, 
  FiFilter, 
  FiExternalLink, 
  FiBook, 
  FiCode, 
  FiVideo, 
  FiTool,
  FiStar,
  FiClock,
  FiUser,
  FiGlobe,
  FiBookmark,
  FiPlay
} from 'react-icons/fi'
import { FaRobot, FaGithub, FaStackOverflow } from 'react-icons/fa'

interface SearchResult {
  id: string
  title: string
  description: string
  type: string
  category: string
  difficulty: string
  url: string
  rating: number
  duration?: string
  author: string
  tags: string[]
  isPopular?: boolean
  isFree?: boolean
}

export default function AISearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  // AI-powered search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const performSearch = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/ai-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query,
            type: selectedType,
            difficulty: selectedDifficulty,
            includeAISuggestions: true
          })
        })

        if (response.ok) {
          const data = await response.json()
          setResults(data.results || [])
        } else {
          setResults(getMockResults(query))
        }
      } catch (error) {
        console.error('Search error:', error)
        setResults(getMockResults(query))
      } finally {
        setLoading(false)
      }
    }

    const debounceTimeout = setTimeout(performSearch, 500)
    return () => clearTimeout(debounceTimeout)
  }, [query, selectedType, selectedDifficulty])

  const getMockResults = (searchQuery: string): SearchResult[] => {
    const mockData: SearchResult[] = [
      {
        id: '1',
        title: 'React.js Complete Guide',
        description: 'Comprehensive tutorial covering React fundamentals, hooks, and advanced patterns',
        type: 'tutorial',
        category: 'Frontend',
        difficulty: 'Intermediate',
        url: 'https://react.dev/learn',
        rating: 4.8,
        duration: '6 hours',
        author: 'React Team',
        tags: ['react', 'javascript', 'frontend'],
        isPopular: true,
        isFree: true
      },
      {
        id: '2',
        title: 'JavaScript ES6+ Features',
        description: 'Modern JavaScript features and best practices for 2024',
        type: 'article',
        category: 'Programming',
        difficulty: 'Intermediate',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        rating: 4.7,
        duration: '45 min read',
        author: 'MDN Contributors',
        tags: ['javascript', 'es6'],
        isPopular: true,
        isFree: true
      },
      {
        id: '3',
        title: 'Python for Data Science',
        description: 'Learn Python programming with focus on data analysis',
        type: 'course',
        category: 'Data Science',
        difficulty: 'Beginner',
        url: 'https://www.python.org/about/gettingstarted/',
        rating: 4.9,
        duration: '12 weeks',
        author: 'Python Foundation',
        tags: ['python', 'data-science'],
        isPopular: true,
        isFree: true
      },
      {
        id: '4',
        title: 'Next.js Documentation',
        description: 'Official Next.js documentation with examples and best practices',
        type: 'documentation',
        category: 'Framework',
        difficulty: 'Intermediate',
        url: 'https://nextjs.org/docs',
        rating: 4.8,
        author: 'Vercel Team',
        tags: ['nextjs', 'react', 'fullstack'],
        isPopular: true,
        isFree: true
      },
      {
        id: '5',
        title: 'TypeScript Handbook',
        description: 'Complete guide to TypeScript for JavaScript developers',
        type: 'documentation',
        category: 'Programming',
        difficulty: 'Intermediate',
        url: 'https://www.typescriptlang.org/docs/',
        rating: 4.7,
        author: 'Microsoft',
        tags: ['typescript', 'javascript', 'types'],
        isFree: true
      },
      {
        id: '6',
        title: 'Node.js Tutorial',
        description: 'Complete Node.js tutorial for backend development',
        type: 'tutorial',
        category: 'Backend',
        difficulty: 'Intermediate',
        url: 'https://nodejs.org/en/docs/',
        rating: 4.6,
        duration: '8 hours',
        author: 'Node.js Foundation',
        tags: ['nodejs', 'javascript', 'backend'],
        isPopular: true,
        isFree: true
      },
      {
        id: '7',
        title: 'CSS Grid Complete Guide',
        description: 'Master CSS Grid layout with practical examples',
        type: 'article',
        category: 'Frontend',
        difficulty: 'Intermediate',
        url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
        rating: 4.7,
        duration: '30 min read',
        author: 'CSS-Tricks',
        tags: ['css', 'grid', 'layout'],
        isPopular: true,
        isFree: true
      },
      {
        id: '8',
        title: 'Git Version Control',
        description: 'Learn Git version control from basics to advanced',
        type: 'tutorial',
        category: 'Tools',
        difficulty: 'Beginner',
        url: 'https://git-scm.com/doc',
        rating: 4.5,
        duration: '4 hours',
        author: 'Git Team',
        tags: ['git', 'version-control', 'collaboration'],
        isPopular: true,
        isFree: true
      }
    ]

    return mockData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tutorial': return <FiBook className="w-4 h-4" />
      case 'documentation': return <FiCode className="w-4 h-4" />
      case 'video': return <FiVideo className="w-4 h-4" />
      case 'tool': return <FiTool className="w-4 h-4" />
      case 'course': return <FiPlay className="w-4 h-4" />
      case 'article': return <FiBookmark className="w-4 h-4" />
      case 'repository': return <FaGithub className="w-4 h-4" />
      default: return <FiGlobe className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'Advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Search Header */}
      <div className="relative mb-6">
        <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-2">
          <div className="flex-1 flex items-center">
            <div className="flex items-center pl-4">
              <FiSearch className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask AI anything about programming, tools, tutorials..."
              className="flex-1 px-4 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl transition-all duration-200 ${
              showFilters 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <FiFilter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="tutorial">Tutorials</option>
                  <option value="documentation">Documentation</option>
                  <option value="video">Videos</option>
                  <option value="course">Courses</option>
                  <option value="article">Articles</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-gray-600 dark:text-gray-400">AI is searching for the best resources...</span>
          </div>
        </div>
      )}

      {/* Search Results */}
      {!loading && results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Found {results.length} results for "{query}"
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FaRobot className="w-4 h-4" />
              <span>AI-powered results</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      {getTypeIcon(result.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {result.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(result.difficulty)}`}>
                          {result.difficulty}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {result.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {result.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {result.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FiUser className="w-3 h-3" />
                      <span>{result.author}</span>
                    </div>
                    {result.duration && (
                      <div className="flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        <span>{result.duration}</span>
                      </div>
                    )}
                  </div>
                </div>

                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors group-hover:bg-blue-700"
                >
                  <span>View Resource</span>
                  <FiExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && results.length === 0 && query.trim() !== '' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <FiSearch className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search terms or filters
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['React', 'JavaScript', 'Python', 'TypeScript', 'Next.js'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Access Links */}
      {!query.trim() && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { name: 'React Docs', url: 'https://react.dev', icon: <FiCode className="w-5 h-5" /> },
            { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: <FiBook className="w-5 h-5" /> },
            { name: 'GitHub', url: 'https://github.com', icon: <FaGithub className="w-5 h-5" /> },
            { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: <FaStackOverflow className="w-5 h-5" /> }
          ].map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                {link.icon}
              </div>
              <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {link.name}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
