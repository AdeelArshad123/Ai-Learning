'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiSearch,
  FiX,
  FiMic,
  FiMicOff,
  FiZap,
  FiTrendingUp,
  FiBookOpen,
  FiCode,
  FiVideo,
  FiUsers,
  FiExternalLink
} from 'react-icons/fi'
import { 
  FaBrain, 
  FaRobot, 
  FaMagic, 
  FaLightbulb,
  FaFire,
  FaStar
} from 'react-icons/fa'

interface SearchSuggestion {
  id: string
  text: string
  type: 'query' | 'topic' | 'skill' | 'project'
  icon: any
  aiGenerated?: boolean
  popularity?: number
}

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'tutorial' | 'course' | 'project' | 'tool' | 'concept'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  relevanceScore: number
  aiRecommended?: boolean
  estimatedTime?: string
  icon: any
  url?: string
  externalUrl?: string
}

export default function AISearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [aiInsights, setAiInsights] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // AI-powered search suggestions
  const aiSuggestions: SearchSuggestion[] = [
    { id: '1', text: 'Learn React Hooks for beginners', type: 'topic', icon: FaLightbulb, aiGenerated: true, popularity: 95 },
    { id: '2', text: 'Build a full-stack app with Next.js', type: 'project', icon: FiCode, aiGenerated: true, popularity: 88 },
    { id: '3', text: 'Master async/await in JavaScript', type: 'skill', icon: FaBrain, aiGenerated: true, popularity: 92 },
    { id: '4', text: 'TypeScript best practices', type: 'topic', icon: FiBookOpen, aiGenerated: true, popularity: 85 },
    { id: '5', text: 'Create responsive designs with Tailwind', type: 'skill', icon: FaMagic, aiGenerated: true, popularity: 90 }
  ]

  // Comprehensive AI-powered search results database
  const mockResults: SearchResult[] = [
    // Next.js Full-Stack Results
    {
      id: '1',
      title: 'Complete Next.js Full-Stack Tutorial',
      description: 'Build a complete full-stack application with Next.js, including API routes, database integration, and deployment',
      type: 'tutorial',
      difficulty: 'intermediate',
      relevanceScore: 98,
      aiRecommended: true,
      estimatedTime: '4 hours',
      icon: FiBookOpen,
      externalUrl: 'https://nextjs.org/learn/foundations/about-nextjs'
    },
    {
      id: '2',
      title: 'Next.js E-commerce Full-Stack Project',
      description: 'Create a complete e-commerce platform with Next.js, Stripe payments, and user authentication',
      type: 'project',
      difficulty: 'advanced',
      relevanceScore: 96,
      aiRecommended: true,
      estimatedTime: '8 hours',
      icon: FiCode,
      externalUrl: 'https://github.com/vercel/commerce'
    },
    {
      id: '3',
      title: 'Next.js API Routes & Database Integration',
      description: 'Learn to build robust APIs with Next.js API routes, connect to databases, and handle authentication',
      type: 'course',
      difficulty: 'intermediate',
      relevanceScore: 94,
      aiRecommended: true,
      estimatedTime: '3 hours',
      icon: FiVideo,
      externalUrl: 'https://nextjs.org/docs/api-routes/introduction'
    },
    {
      id: '4',
      title: 'Full-Stack Blog with Next.js & MongoDB',
      description: 'Build a complete blog platform with Next.js, MongoDB, and user management',
      type: 'project',
      difficulty: 'intermediate',
      relevanceScore: 92,
      aiRecommended: true,
      estimatedTime: '6 hours',
      icon: FiCode,
      externalUrl: 'https://github.com/vercel/next.js/tree/canary/examples/with-mongodb'
    },
    {
      id: '5',
      title: 'Next.js Deployment & Production Best Practices',
      description: 'Deploy your Next.js full-stack app to Vercel, AWS, and other platforms with optimization tips',
      type: 'tutorial',
      difficulty: 'intermediate',
      relevanceScore: 90,
      estimatedTime: '2 hours',
      icon: FiBookOpen,
      externalUrl: 'https://nextjs.org/docs/deployment'
    },
    // React Results
    {
      id: '6',
      title: 'React Hooks Complete Guide',
      description: 'Master useState, useEffect, and custom hooks with practical examples',
      type: 'tutorial',
      difficulty: 'intermediate',
      relevanceScore: 88,
      aiRecommended: true,
      estimatedTime: '45 min',
      icon: FiBookOpen,
      externalUrl: 'https://react.dev/reference/react'
    },
    {
      id: '7',
      title: 'Build a Todo App with React Hooks',
      description: 'Hands-on project to practice React Hooks in a real application',
      type: 'project',
      difficulty: 'beginner',
      relevanceScore: 85,
      aiRecommended: true,
      estimatedTime: '2 hours',
      icon: FiCode,
      externalUrl: 'https://react.dev/learn/tutorial-tic-tac-toe'
    },
    // JavaScript Results
    {
      id: '8',
      title: 'JavaScript ES6+ Modern Features',
      description: 'Learn arrow functions, destructuring, async/await, and other modern JavaScript features',
      type: 'tutorial',
      difficulty: 'beginner',
      relevanceScore: 82,
      estimatedTime: '1 hour',
      icon: FiBookOpen,
      externalUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'
    },
    {
      id: '9',
      title: 'Async JavaScript & Promises Masterclass',
      description: 'Master asynchronous JavaScript with promises, async/await, and error handling',
      type: 'course',
      difficulty: 'intermediate',
      relevanceScore: 89,
      estimatedTime: '2.5 hours',
      icon: FiVideo,
      externalUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises'
    },
    // Full-Stack General Results
    {
      id: '10',
      title: 'MERN Stack Complete Guide',
      description: 'Build full-stack applications with MongoDB, Express, React, and Node.js',
      type: 'course',
      difficulty: 'advanced',
      relevanceScore: 91,
      aiRecommended: true,
      estimatedTime: '10 hours',
      icon: FiVideo,
      externalUrl: 'https://www.mongodb.com/mern-stack'
    },
    {
      id: '11',
      title: 'Full-Stack Authentication System',
      description: 'Implement complete user authentication with JWT, sessions, and OAuth',
      type: 'tutorial',
      difficulty: 'advanced',
      relevanceScore: 87,
      estimatedTime: '3 hours',
      icon: FiBookOpen,
      externalUrl: 'https://jwt.io/introduction'
    },
    {
      id: '12',
      title: 'REST API Design & Development',
      description: 'Learn to design and build RESTful APIs with best practices and security',
      type: 'tutorial',
      difficulty: 'intermediate',
      relevanceScore: 84,
      estimatedTime: '2 hours',
      icon: FiBookOpen,
      externalUrl: 'https://restfulapi.net/'
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // AI-powered search with debouncing
  useEffect(() => {
    if (query.trim()) {
      const timeoutId = setTimeout(() => {
        performAISearch(query)
      }, 300)
      return () => clearTimeout(timeoutId)
    } else {
      setResults([])
      setSuggestions(aiSuggestions.slice(0, 5))
      setIsOpen(true)
    }
  }, [query])

  const performAISearch = async (searchQuery: string) => {
    setIsLoading(true)
    try {
      // Simulate AI search API call
      await new Promise(resolve => setTimeout(resolve, 800))

      // Advanced AI search algorithm
      const searchTerms = searchQuery.toLowerCase().split(' ')
      const filteredResults = mockResults.filter(result => {
        const titleWords = result.title.toLowerCase().split(' ')
        const descWords = result.description.toLowerCase().split(' ')
        const allWords = [...titleWords, ...descWords]

        // Check for exact phrase match (higher relevance)
        const exactMatch = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          result.description.toLowerCase().includes(searchQuery.toLowerCase())

        // Check for individual word matches
        const wordMatches = searchTerms.filter(term =>
          allWords.some(word => word.includes(term) || term.includes(word))
        ).length

        // Check for semantic matches (technology-specific)
        const semanticMatches = checkSemanticMatches(searchQuery, result)

        // Calculate relevance score
        let relevanceBoost = 0
        if (exactMatch) relevanceBoost += 20
        if (wordMatches > 0) relevanceBoost += wordMatches * 5
        if (semanticMatches) relevanceBoost += 15

        // Update relevance score
        result.relevanceScore = Math.min(100, result.relevanceScore + relevanceBoost)

        return exactMatch || wordMatches >= Math.max(1, searchTerms.length * 0.6) || semanticMatches
      }).sort((a, b) => b.relevanceScore - a.relevanceScore)

      setResults(filteredResults)

      // Generate AI insights
      const insights = generateAIInsights(searchQuery, filteredResults)
      setAiInsights(insights)

      setIsOpen(true)
      setSelectedIndex(-1)
    } catch (error) {
      console.error('AI search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Check for semantic matches based on technology relationships
  const checkSemanticMatches = (query: string, result: SearchResult): boolean => {
    const queryLower = query.toLowerCase()
    const titleLower = result.title.toLowerCase()
    const descLower = result.description.toLowerCase()

    // Technology relationship mapping
    const semanticMap: { [key: string]: string[] } = {
      'nextjs': ['next.js', 'react', 'full-stack', 'ssr', 'vercel'],
      'next.js': ['nextjs', 'react', 'full-stack', 'ssr', 'vercel'],
      'fullstack': ['full-stack', 'full stack', 'mern', 'mean', 'backend', 'frontend'],
      'full-stack': ['fullstack', 'full stack', 'mern', 'mean', 'backend', 'frontend'],
      'full stack': ['fullstack', 'full-stack', 'mern', 'mean', 'backend', 'frontend'],
      'react': ['nextjs', 'next.js', 'hooks', 'jsx', 'frontend'],
      'javascript': ['js', 'node', 'react', 'vue', 'angular', 'es6'],
      'js': ['javascript', 'node', 'react', 'vue', 'angular', 'es6'],
      'backend': ['api', 'server', 'node', 'express', 'database'],
      'frontend': ['react', 'vue', 'angular', 'html', 'css', 'ui'],
      'database': ['mongodb', 'mysql', 'postgresql', 'sql', 'nosql'],
      'auth': ['authentication', 'login', 'jwt', 'oauth', 'security'],
      'authentication': ['auth', 'login', 'jwt', 'oauth', 'security']
    }

    // Check if query terms have semantic relationships with result content
    for (const [key, related] of Object.entries(semanticMap)) {
      if (queryLower.includes(key)) {
        return related.some(term => titleLower.includes(term) || descLower.includes(term))
      }
    }

    return false
  }

  const generateAIInsights = (query: string, results: SearchResult[]): string[] => {
    const insights = []
    
    if (results.length > 0) {
      insights.push(`Found ${results.length} highly relevant resources for "${query}"`)
      
      const aiRecommended = results.filter(r => r.aiRecommended).length
      if (aiRecommended > 0) {
        insights.push(`${aiRecommended} AI-recommended resources based on your learning profile`)
      }
      
      const avgDifficulty = results.reduce((acc, r) => {
        return acc + (r.difficulty === 'beginner' ? 1 : r.difficulty === 'intermediate' ? 2 : 3)
      }, 0) / results.length
      
      if (avgDifficulty < 1.5) {
        insights.push('Perfect for beginners - start with these fundamentals')
      } else if (avgDifficulty > 2.5) {
        insights.push('Advanced content - make sure you have the prerequisites')
      } else {
        insights.push('Good mix of beginner to intermediate content')
      }
    }
    
    return insights
  }

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      
      recognition.onstart = () => {
        setIsListening(true)
      }
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setQuery(transcript)
        setIsListening(false)
      }
      
      recognition.onerror = () => {
        setIsListening(false)
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      recognition.start()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < (results.length > 0 ? results.length - 1 : suggestions.length - 1) ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      if (results.length > 0 && selectedIndex < results.length) {
        // Open the selected search result
        handleResultClick(results[selectedIndex])
      } else if (suggestions.length > 0 && selectedIndex < suggestions.length) {
        // Use the selected suggestion as query
        setQuery(suggestions[selectedIndex])
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  // Handle search result click
  const handleResultClick = (result: SearchResult) => {
    if (result.externalUrl) {
      // Open external URL in new tab
      window.open(result.externalUrl, '_blank', 'noopener,noreferrer')

      // Show a brief success message
      console.log(`Opening: ${result.title}`)
    } else if (result.url) {
      // Navigate to internal URL
      window.location.href = result.url
    } else {
      // Fallback: show more details or navigate to a default page
      console.log('Clicked on result:', result.title)
      alert(`This would open: ${result.title}\n\nDescription: ${result.description}`)
    }

    // Close the search dropdown
    setIsOpen(false)
    setQuery('')

    // Optional: Track the click for analytics
    trackSearchResultClick(result)
  }

  // Track search result clicks for analytics
  const trackSearchResultClick = (result: SearchResult) => {
    // This could send analytics data to your backend
    console.log('Search result clicked:', {
      resultId: result.id,
      title: result.title,
      type: result.type,
      aiRecommended: result.aiRecommended,
      query: query
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30'
      case 'advanced': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30'
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <FaBrain className="text-blue-500 w-5 h-5" />
          <FiSearch className="text-gray-400 w-4 h-4" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask AI anything... (e.g., 'How to learn React?', 'Build a portfolio')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-16 pr-16 py-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl"
        />
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {query && (
            <button
              onClick={() => {
                setQuery('')
                setIsOpen(false)
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <FiX className="w-4 h-4 text-gray-400" />
            </button>
          )}
          
          <button
            onClick={handleVoiceSearch}
            className={`p-2 rounded-full transition-all duration-200 ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400'
            }`}
          >
            {isListening ? <FiMicOff className="w-4 h-4" /> : <FiMic className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            {/* AI Insights */}
            {aiInsights.length > 0 && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <FaRobot className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">AI Insights</span>
                </div>
                {aiInsights.map((insight, index) => (
                  <p key={index} className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    • {insight}
                  </p>
                ))}
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <FaBrain className="w-4 h-4 text-blue-500 animate-pulse" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">AI is searching...</span>
                </div>
              </div>
            )}

            {/* Search Results */}
            {results.length > 0 && (
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2">
                  Search Results ({results.length})
                </div>
                {results.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleResultClick(result)}
                    className={`p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                      selectedIndex === index
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        result.aiRecommended 
                          ? 'bg-blue-100 dark:bg-blue-900/30' 
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <result.icon className={`w-4 h-4 ${
                          result.aiRecommended 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white truncate">
                            {result.title}
                          </h3>
                          {result.aiRecommended && (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                              <FaBrain className="w-2 h-2 text-blue-600 dark:text-blue-400" />
                              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">AI</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {result.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs">
                          <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(result.difficulty)}`}>
                            {result.difficulty}
                          </span>
                          {result.estimatedTime && (
                            <span className="text-gray-500 dark:text-gray-400">
                              {result.estimatedTime}
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <FiTrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-green-600 dark:text-green-400 font-medium">
                              {result.relevanceScore}% match
                            </span>
                          </div>
                          {result.externalUrl && (
                            <div className="flex items-center gap-1 text-blue-500">
                              <FiExternalLink className="w-3 h-3" />
                              <span className="text-xs">External Link</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* AI Suggestions */}
            {!query && suggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2 flex items-center gap-2">
                  <FaMagic className="w-3 h-3" />
                  AI Suggestions
                </div>
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setQuery(suggestion.text)}
                    className={`w-full p-3 text-left rounded-xl transition-all duration-200 ${
                      selectedIndex === index 
                        ? 'bg-blue-50 dark:bg-blue-900/20' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <suggestion.icon className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {suggestion.text}
                      </span>
                      {suggestion.aiGenerated && (
                        <div className="ml-auto flex items-center gap-1">
                          <FaStar className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {suggestion.popularity}%
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query && results.length === 0 && !isLoading && (
              <div className="p-8 text-center">
                <FiSearch className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  No results found for "{query}"
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Try different keywords or ask AI for suggestions
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
