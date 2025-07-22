'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { FaGithub, FaCode, FaStar } from 'react-icons/fa'

interface Repository {
  id: number
  name: string
  description: string
  stargazers_count: number
  html_url: string
  language: string
  owner: {
    login: string
    avatar_url: string
  }
  created_at?: string
}

function isNewRepo(created_at?: string) {
  if (!created_at) return false
  const created = new Date(created_at)
  const now = new Date()
  const diff = now.getTime() - created.getTime()
  return diff < 365 * 24 * 60 * 60 * 1000 // less than 1 year
}

function getLanguageColor(language: string) {
  const colors: Record<string, string> = {
    JavaScript: 'bg-yellow-200 text-yellow-800',
    Python: 'bg-blue-200 text-blue-800',
    TypeScript: 'bg-blue-100 text-blue-700',
    Java: 'bg-red-200 text-red-800',
    'C++': 'bg-purple-200 text-purple-800',
    'C#': 'bg-green-200 text-green-800',
    Go: 'bg-cyan-200 text-cyan-800',
    Rust: 'bg-orange-200 text-orange-800',
    PHP: 'bg-indigo-200 text-indigo-800',
    Ruby: 'bg-pink-200 text-pink-800',
    default: 'bg-gray-200 text-gray-700',
  };
  return colors[language] || colors.default;
}

export default function TrendingTools() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTrendingRepos = async () => {
      try {
        const response = await axios.get('/api/get-trending')
        setRepos(response.data)
        setLoading(false)
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || 'Failed to fetch trending repositories'
        setError(errorMessage)
        setLoading(false)
      }
    }

    fetchTrendingRepos()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    )
  }

  const coderLanguages = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart'
  ];
  const coderKeywords = [
    'code', 'program', 'dev', 'framework', 'library', 'tool', 'AI', 'ML', 'data', 'script', 'API', 'backend', 'frontend', 'fullstack'
  ];
  const filteredRepos = repos.filter(repo =>
    coderLanguages.includes(repo.language) ||
    coderKeywords.some(kw =>
      (repo.description && repo.description.toLowerCase().includes(kw)) ||
      (repo.name && repo.name.toLowerCase().includes(kw))
    )
  );

  return (
    <div className="my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRepos.map((repo, idx) => (
          <motion.div
            key={repo.id}
            className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col h-full min-h-[180px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            {/* New badge */}
            {isNewRepo(repo.created_at) && (
              <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full z-10">NEW</span>
            )}
            
            {/* Header with avatar and name */}
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={repo.owner.avatar_url} 
                alt={repo.owner.login}
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
                  {repo.name}
                </h3>
                <a 
                  href={`https://github.com/${repo.owner.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-primary"
                >
                  {repo.owner.login}
                </a>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-3 min-h-[36px] leading-relaxed">
              {repo.description}
            </p>
            
            {/* Footer with language and stats */}
            <div className="mt-auto space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2 py-1 rounded-md ${getLanguageColor(repo.language)} flex items-center gap-1`}>
                  <FaCode className="text-xs" />
                  {repo.language}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <FaStar className="mr-1 text-yellow-500 text-xs" />
                  {repo.stargazers_count.toLocaleString()}
                </span>
              </div>
              
              {/* View button */}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary text-white text-xs px-3 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-1"
              >
                <FaGithub className="text-xs" />
                View Repository
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 