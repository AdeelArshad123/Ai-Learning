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

// Fallback repositories data
const fallbackRepos: Repository[] = [
  {
    id: 1,
    name: "next.js",
    description: "The React Framework for the Web",
    stargazers_count: 115000,
    html_url: "https://github.com/vercel/next.js",
    language: "JavaScript",
    owner: {
      login: "vercel",
      avatar_url: "https://avatars.githubusercontent.com/u/14985020?v=4"
    }
  },
  {
    id: 2,
    name: "tailwindcss",
    description: "A utility-first CSS framework for rapid UI development",
    stargazers_count: 73000,
    html_url: "https://github.com/tailwindlabs/tailwindcss",
    language: "JavaScript",
    owner: {
      login: "tailwindlabs",
      avatar_url: "https://avatars.githubusercontent.com/u/67109815?v=4"
    }
  },
  {
    id: 3,
    name: "typescript",
    description: "TypeScript is JavaScript with syntax for types",
    stargazers_count: 94000,
    html_url: "https://github.com/microsoft/TypeScript",
    language: "TypeScript",
    owner: {
      login: "microsoft",
      avatar_url: "https://avatars.githubusercontent.com/u/6154722?v=4"
    }
  },
  {
    id: 4,
    name: "react",
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces",
    stargazers_count: 220000,
    html_url: "https://github.com/facebook/react",
    language: "JavaScript",
    owner: {
      login: "facebook",
      avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4"
    }
  },
  {
    id: 5,
    name: "vue",
    description: "Vue.js is a progressive, incrementally-adoptable JavaScript framework",
    stargazers_count: 206000,
    html_url: "https://github.com/vuejs/vue",
    language: "JavaScript",
    owner: {
      login: "vuejs",
      avatar_url: "https://avatars.githubusercontent.com/u/6128107?v=4"
    }
  },
  {
    id: 6,
    name: "python",
    description: "The Python programming language",
    stargazers_count: 55000,
    html_url: "https://github.com/python/cpython",
    language: "Python",
    owner: {
      login: "python",
      avatar_url: "https://avatars.githubusercontent.com/u/1525981?v=4"
    }
  },
  {
    id: 7,
    name: "django",
    description: "The Web framework for perfectionists with deadlines",
    stargazers_count: 75000,
    html_url: "https://github.com/django/django",
    language: "Python",
    owner: {
      login: "django",
      avatar_url: "https://avatars.githubusercontent.com/u/27804?v=4"
    }
  },
  {
    id: 8,
    name: "express",
    description: "Fast, unopinionated, minimalist web framework for node",
    stargazers_count: 63000,
    html_url: "https://github.com/expressjs/express",
    language: "JavaScript",
    owner: {
      login: "expressjs",
      avatar_url: "https://avatars.githubusercontent.com/u/5658226?v=4"
    }
  },
  {
    id: 9,
    name: "angular",
    description: "The modern web developer's platform",
    stargazers_count: 93000,
    html_url: "https://github.com/angular/angular",
    language: "TypeScript",
    owner: {
      login: "angular",
      avatar_url: "https://avatars.githubusercontent.com/u/139426?v=4"
    }
  }
]

export default function TrendingTools() {
  const [repos, setRepos] = useState<Repository[]>(fallbackRepos)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchTrendingRepos = async () => {
      try {
        const response = await axios.get('/api/get-trending', {
          timeout: 5000 // 5 second timeout
        })
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setRepos(response.data)
          setUsingFallback(false)
        } else {
          setUsingFallback(true)
        }
        setLoading(false)
      } catch (err: any) {
        console.log('API failed, using fallback data:', err.message)
        setUsingFallback(true)
        setLoading(false)
        // Don't set error, just use fallback data
      }
    }

    // Add a small delay to show loading state
    setTimeout(fetchTrendingRepos, 500)
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading trending repositories...</p>
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
      {/* Status Banner */}
      {usingFallback && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <FaGithub className="w-4 h-4" />
            <span className="text-sm font-medium">
              Showing curated popular repositories (GitHub API temporarily unavailable)
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRepos.map((repo, idx) => (
          <motion.div
            key={repo.id}
            className="relative bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 group flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.03 }}
            whileHover={{ scale: 1.01, y: -4 }}
          >
            {/* Header Section */}
            <div className="relative p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
              {/* New badge */}
              {isNewRepo(repo.created_at) && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">NEW</span>
              )}

              {/* Owner info */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={repo.owner.avatar_url}
                  alt={repo.owner.login}
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-600 shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {repo.name}
                  </h3>
                  <a
                    href={`https://github.com/${repo.owner.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    @{repo.owner.login}
                  </a>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                <FaStar className="w-4 h-4" />
                <span className="text-sm font-semibold">{repo.stargazers_count.toLocaleString()}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">stars</span>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="p-4 flex-1 flex flex-col">
              {/* Language Tag */}
              <div className="mb-3">
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${getLanguageColor(repo.language)}`}>
                  <FaCode className="w-3 h-3" />
                  {repo.language}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed flex-1">
                {repo.description}
              </p>

              {/* Action Button */}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FaGithub className="w-4 h-4" />
                View Repository
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 