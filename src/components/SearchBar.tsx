'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiX, FiTrendingUp, FiCode, FiBookOpen } from 'react-icons/fi'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchResult {
  id: string
  title: string
  type: 'topic' | 'tool' | 'language'
  description: string
  icon: any
}

const mockSearchResults: SearchResult[] = [
  { id: '1', title: 'React Hooks', type: 'topic', description: 'Learn React Hooks for functional components', icon: FiCode },
  { id: '2', title: 'TypeScript', type: 'language', description: 'TypeScript programming language tutorials', icon: FiBookOpen },
  { id: '3', title: 'Next.js', type: 'tool', description: 'Next.js framework for React applications', icon: FiTrendingUp },
  { id: '4', title: 'Tailwind CSS', type: 'tool', description: 'Utility-first CSS framework', icon: FiCode },
  { id: '5', title: 'Node.js', type: 'tool', description: 'JavaScript runtime environment', icon: FiTrendingUp },
  { id: '6', title: 'Python', type: 'language', description: 'Python programming language', icon: FiBookOpen },
  { id: '7', title: 'Machine Learning', type: 'topic', description: 'Machine learning algorithms and concepts', icon: FiCode },
  { id: '8', title: 'Docker', type: 'tool', description: 'Containerization platform', icon: FiTrendingUp },
]

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (debouncedQuery.trim()) {
      const performSearch = async () => {
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
          if (response.ok) {
            const data = await response.json()
            setResults(data.results || [])
            setIsOpen(true)
            setSelectedIndex(-1)
          }
        } catch (error) {
          console.error('Search error:', error)
          // Fallback to mock data
          const filtered = mockSearchResults.filter(item =>
            item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
          )
          setResults(filtered)
          setIsOpen(true)
          setSelectedIndex(-1)
        }
      }
      performSearch()
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [debouncedQuery])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : prev)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSelectResult(results[selectedIndex])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
    }
  }

  const handleSelectResult = (result: SearchResult) => {
    console.log('Selected:', result)
    setQuery('')
    setIsOpen(false)
    // Here you can navigate to the specific page or trigger an action
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'topic': return 'bg-blue-100 text-blue-800'
      case 'tool': return 'bg-green-100 text-green-800'
      case 'language': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search topics, tools, languages..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white/80 backdrop-blur-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setIsOpen(false)
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
          >
            <div className="max-h-80 overflow-y-auto">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                    index === selectedIndex ? 'bg-primary/10' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectResult(result)}
                >
                  <div className="flex-shrink-0">
                    <result.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 truncate">{result.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                        {result.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{result.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-gray-200 p-3 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                Press Enter to select, Esc to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 