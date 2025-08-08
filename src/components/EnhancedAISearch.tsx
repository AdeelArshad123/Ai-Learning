'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  FiPlay,
  FiMic,
  FiMicOff,
  FiZap,
  FiTrendingUp,
  FiHeart,
  FiShare2,
  FiDownload
} from 'react-icons/fi'
import { FaRobot, FaGithub, FaStackOverflow, FaYoutube, FaBrain } from 'react-icons/fa'

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
  relevanceScore?: number
  aiInsights?: string[]
  relatedTopics?: string[]
}

interface SearchSuggestion {
  text: string
  type: 'recent' | 'trending' | 'ai-suggested' | 'voice'
  confidence?: number
}

export default function EnhancedAISearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [aiInsights, setAiInsights] = useState<string[]>([])
  const [semanticResults, setSemanticResults] = useState<SearchResult[]>([])

  const searchInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = 'en-US'

        recognitionInstance.onstart = () => {
          setIsListening(true)
        }

        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setQuery(transcript)
          handleSearch(transcript)
          setIsListening(false)
        }

        recognitionInstance.onerror = () => {
          setIsListening(false)
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
        }

        setRecognition(recognitionInstance)
        setVoiceEnabled(true)
      }
    }
  }, [])

  // Load search history
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory')
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Generate AI suggestions
  useEffect(() => {
    if (query.length > 2) {
      generateAISuggestions(query)
    } else {
      setSuggestions([])
    }
  }, [query])

  const generateAISuggestions = async (searchQuery: string) => {
    const aiSuggestions: SearchSuggestion[] = []

    // Semantic analysis of query
    const lowerQuery = searchQuery.toLowerCase()

    if (lowerQuery.includes('react') || lowerQuery.includes('frontend')) {
      aiSuggestions.push({
        text: 'React hooks tutorial for beginners',
        type: 'ai-suggested',
        confidence: 0.95
      })
      aiSuggestions.push({
        text: 'React vs Vue.js comparison',
        type: 'ai-suggested',
        confidence: 0.88
      })
    }

    if (lowerQuery.includes('python') || lowerQuery.includes('data')) {
      aiSuggestions.push({
        text: 'Python data science projects',
        type: 'ai-suggested',
        confidence: 0.92
      })
      aiSuggestions.push({
        text: 'Machine learning with Python',
        type: 'ai-suggested',
        confidence: 0.89
      })
    }

    if (lowerQuery.includes('javascript') || lowerQuery.includes('js')) {
      aiSuggestions.push({
        text: 'Modern JavaScript ES6+ features',
        type: 'ai-suggested',
        confidence: 0.94
      })
      aiSuggestions.push({
        text: 'JavaScript interview questions',
        type: 'ai-suggested',
        confidence: 0.87
      })
    }

    // Add trending suggestions
    aiSuggestions.push({
      text: 'Next.js 14 new features',
      type: 'trending',
      confidence: 0.85
    })

    aiSuggestions.push({
      text: 'TypeScript best practices 2024',
      type: 'trending',
      confidence: 0.83
    })

    // Add recent searches
    searchHistory.slice(0, 3).forEach(term => {
      aiSuggestions.push({
        text: term,
        type: 'recent',
        confidence: 0.7
      })
    })

    setSuggestions(aiSuggestions)
  }

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setShowSuggestions(false)

    // Add to search history
    const newHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 10)
    setSearchHistory(newHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))

    try {
      // Simulate AI-enhanced search
      await new Promise(resolve => setTimeout(resolve, 1500))

      const enhancedResults = await performEnhancedSearch(searchQuery)
      setResults(enhancedResults.results)
      setAiInsights(enhancedResults.insights)
      setSemanticResults(enhancedResults.semanticResults)

    } catch (error) {
      console.error('Search error:', error)
      setResults(getMockResults(searchQuery))
    } finally {
      setLoading(false)
    }
  }

  const performEnhancedSearch = async (query: string) => {
    // Simulate AI processing
    const lowerQuery = query.toLowerCase()

    const insights = []
    const semanticResults = []

    // AI insights based on query analysis
    if (lowerQuery.includes('beginner') || lowerQuery.includes('start')) {
      insights.push('🔰 Detected beginner-friendly search. Prioritizing foundational resources.')
    }

    if (lowerQuery.includes('advanced') || lowerQuery.includes('expert')) {
      insights.push('🚀 Found advanced-level request. Including expert tutorials and deep-dive content.')
    }

    if (lowerQuery.includes('project') || lowerQuery.includes('build')) {
      insights.push('🛠️ Project-focused search detected. Adding hands-on tutorials and code examples.')
    }

    if (lowerQuery.includes('interview') || lowerQuery.includes('job')) {
      insights.push('💼 Career-focused search. Including interview prep and industry best practices.')
    }

    // Semantic search results
    const baseResults = getMockResults(query)
    const enhancedResults = baseResults.map(result => ({
      ...result,
      relevanceScore: calculateRelevanceScore(result, query),
      aiInsights: generateAIInsights(result, query),
      relatedTopics: generateRelatedTopics(result, query)
    }))

    return {
      results: enhancedResults.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)),
      insights,
      semanticResults
    }
  }

  const calculateRelevanceScore = (result: SearchResult, query: string): number => {
    const lowerQuery = query.toLowerCase()
    const lowerTitle = result.title.toLowerCase()
    const lowerDesc = result.description.toLowerCase()
    const lowerTags = result.tags.join(' ').toLowerCase()

    let score = 0

    // Exact matches
    if (lowerTitle.includes(lowerQuery)) score += 10
    if (lowerDesc.includes(lowerQuery)) score += 5
    if (lowerTags.includes(lowerQuery)) score += 3

    // Partial matches
    const queryWords = lowerQuery.split(' ')
    queryWords.forEach(word => {
      if (lowerTitle.includes(word)) score += 2
      if (lowerDesc.includes(word)) score += 1
      if (lowerTags.includes(word)) score += 1.5
    })

    // Popularity bonus
    if (result.isPopular) score += 2
    if (result.rating > 4.5) score += 1

    return Math.min(score, 10)
  }

  const generateAIInsights = (result: SearchResult, query: string): string[] => {
    const insights = []

    if (result.difficulty === 'Beginner' && query.toLowerCase().includes('beginner')) {
      insights.push('Perfect for beginners')
    }

    if (result.isFree) {
      insights.push('Free resource')
    }

    if (result.rating > 4.7) {
      insights.push('Highly rated')
    }

    if (result.isPopular) {
      insights.push('Trending')
    }

    return insights
  }

  const generateRelatedTopics = (result: SearchResult, query: string): string[] => {
    const topics = []

    if (result.category === 'Frontend') {
      topics.push('React', 'Vue.js', 'Angular', 'CSS', 'HTML')
    }

    if (result.category === 'Backend') {
      topics.push('Node.js', 'Python', 'Java', 'Databases', 'APIs')
    }

    if (result.category === 'Data Science') {
      topics.push('Machine Learning', 'Python', 'Statistics', 'Visualization')
    }

    return topics.slice(0, 3)
  }

  const startVoiceSearch = () => {
    if (recognition && voiceEnabled) {
      recognition.start()
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text)
    handleSearch(suggestion.text)
  }

  const getMockResults = (searchQuery: string): SearchResult[] => {
    const mockData: SearchResult[] = [
      {
        id: '1',
        title: 'React.js Complete Guide 2024',
        description: 'Comprehensive tutorial covering React fundamentals, hooks, and advanced patterns with real-world projects',
        type: 'tutorial',
        category: 'Frontend',
        difficulty: 'Intermediate',
        url: 'https://react.dev/learn',
        rating: 4.8,
        duration: '6 hours',
        author: 'React Team',
        tags: ['react', 'javascript', 'frontend', 'hooks'],
        isPopular: true,
        isFree: true
      },
      {
        id: '2',
        title: 'JavaScript ES6+ Masterclass',
        description: 'Master modern JavaScript features and best practices for 2024 with hands-on exercises',
        type: 'course',
        category: 'Programming',
        difficulty: 'Intermediate',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        rating: 4.7,
        duration: '8 hours',
        author: 'MDN Contributors',
        tags: ['javascript', 'es6', 'modern-js'],
        isPopular: true,
        isFree: true
      },
      {
        id: '3',
        title: 'Python for Data Science & AI',
        description: 'Complete Python programming course focused on data analysis, machine learning, and AI applications',
        type: 'course',
        category: 'Data Science',
        difficulty: 'Beginner',
        url: 'https://www.python.org/about/gettingstarted/',
        rating: 4.9,
        duration: '12 weeks',
        author: 'Python Foundation',
        tags: ['python', 'data-science', 'ai', 'machine-learning'],
        isPopular: true,
        isFree: true
      },
      {
        id: '4',
        title: 'Next.js 14 Documentation',
        description: 'Official Next.js 14 documentation with examples, best practices, and advanced features',
        type: 'documentation',
        category: 'Framework',
        difficulty: 'Intermediate',
        url: 'https://nextjs.org/docs',
        rating: 4.8,
        author: 'Vercel Team',
        tags: ['nextjs', 'react', 'fullstack', 'typescript'],
        isPopular: true,
        isFree: true
      },
      {
        id: '5',
        title: 'TypeScript Handbook 2024',
        description: 'Complete guide to TypeScript for JavaScript developers with advanced type system concepts',
        type: 'documentation',
        category: 'Programming',
        difficulty: 'Intermediate',
        url: 'https://www.typescriptlang.org/docs/',
        rating: 4.7,
        author: 'Microsoft',
        tags: ['typescript', 'javascript', 'types', 'advanced'],
        isFree: true
      },
      {
        id: '6',
        title: 'Node.js Backend Development',
        description: 'Complete Node.js tutorial for backend development with Express, MongoDB, and deployment',
        type: 'tutorial',
        category: 'Backend',
        difficulty: 'Intermediate',
        url: 'https://nodejs.org/en/docs/',
        rating: 4.6,
        duration: '10 hours',
        author: 'Node.js Foundation',
        tags: ['nodejs', 'javascript', 'backend', 'express'],
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

  const getSuggestionTypeColor = (type: string) => {
    switch (type) {
      case 'ai-suggested': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      case 'trending': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
      case 'recent': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
      case 'voice': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Enhanced Search Header */}
      <div className="relative mb-6">
        <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-2">
          <div className="flex-1 flex items-center">
            <div className="flex items-center pl-4">
              <FiSearch className="w-5 h-5 text-gray-400" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(query)
                }
              }}
              placeholder="Ask AI anything about programming, tools, tutorials... (Try: 'React hooks for beginners')"
              className="flex-1 px-4 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg"
            />
          </div>

          {/* Voice Search Button */}
          <button
            onClick={startVoiceSearch}
            disabled={!voiceEnabled || isListening}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : voiceEnabled
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
            title={voiceEnabled ? 'Voice search' : 'Voice not available'}
          >
            {isListening ? <FiMicOff className="w-5 h-5" /> : <FiMic className="w-5 h-5" />}
          </button>

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

          <button
            onClick={() => handleSearch(query)}
            disabled={!query.trim() || loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Searching...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FaBrain className="w-4 h-4" />
                <span>AI Search</span>
              </div>
            )}
          </button>
        </div>

        {/* AI Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              ref={suggestionsRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-80 overflow-y-auto"
            >
              <div className="p-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-1 rounded ${getSuggestionTypeColor(suggestion.type)}`}>
                          {suggestion.type === 'ai-suggested' && <FaBrain className="w-3 h-3" />}
                          {suggestion.type === 'trending' && <FiTrendingUp className="w-3 h-3" />}
                          {suggestion.type === 'recent' && <FiClock className="w-3 h-3" />}
                          {suggestion.type === 'voice' && <FiMic className="w-3 h-3" />}
                        </div>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {suggestion.text}
                        </span>
                      </div>
                      {suggestion.confidence && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {Math.round(suggestion.confidence * 100)}%
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Insights */}
      {aiInsights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700"
        >
          <div className="flex items-center gap-2 mb-3">
            <FaBrain className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">AI Insights</h3>
          </div>
          <div className="space-y-2">
            {aiInsights.map((insight, index) => (
              <div key={index} className="text-sm text-gray-700 dark:text-gray-300">
                {insight}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  onChange={(e) => {
                    // Handle sorting
                  }}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Rating</option>
                  <option value="popularity">Popularity</option>
                  <option value="newest">Newest</option>
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
            <span className="text-gray-600 dark:text-gray-400">AI is analyzing your search...</span>
          </div>
        </div>
      )}

      {/* Search Results */}
      {!loading && results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Found {results.length} AI-enhanced results for "{query}"
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FaBrain className="w-4 h-4" />
              <span>AI-powered search</span>
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
                        {result.relevanceScore && (
                          <span className="text-xs text-green-600 dark:text-green-400">
                            {Math.round(result.relevanceScore * 10)}% match
                          </span>
                        )}
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

                {/* AI Insights */}
                {result.aiInsights && result.aiInsights.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {result.aiInsights.map((insight, insightIndex) => (
                        <span
                          key={insightIndex}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full"
                        >
                          <FaBrain className="w-3 h-3" />
                          {insight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

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

                <div className="flex items-center justify-between">
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors group-hover:bg-blue-700"
                  >
                    <span>View Resource</span>
                    <FiExternalLink className="w-4 h-4" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <FiHeart className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <FiShare2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                      <FiDownload className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && results.length === 0 && query.trim() !== '' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <FiSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search terms or use our AI suggestions
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['React', 'JavaScript', 'Python', 'TypeScript', 'Next.js'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion)
                  handleSearch(suggestion)
                }}
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
