'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { FaGithub, FaCode, FaStar, FaBrain, FaRobot, FaMagic, FaLightbulb, FaTrophy, FaFire, FaRocket, FaEye, FaCodeBranch, FaUsers, FaCalendarAlt, FaArrowUp } from 'react-icons/fa'
import { FiTrendingUp, FiZap, FiTarget, FiAward } from 'react-icons/fi'

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
  // AI-enhanced properties
  aiScore?: number
  learningValue?: number
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced'
  aiRecommended?: boolean
  personalizedScore?: number
  aiInsights?: string[]
  trendingScore?: number
  educationalTags?: string[]
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
  const [aiAnalyzing, setAiAnalyzing] = useState(false)
  const [sortBy, setSortBy] = useState<'trending' | 'ai-recommended' | 'learning-value'>('ai-recommended')
  const [userSkillLevel, setUserSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate')

  // AI analysis functions
  const analyzeRepositoryWithAI = (repo: Repository): Repository => {
    // Simulate AI analysis
    const aiScore = Math.floor(Math.random() * 30) + 70 // 70-100
    const learningValue = Math.floor(Math.random() * 40) + 60 // 60-100

    // Determine difficulty based on repo characteristics
    let difficultyLevel: 'beginner' | 'intermediate' | 'advanced' = 'intermediate'
    if (repo.description?.toLowerCase().includes('beginner') || repo.description?.toLowerCase().includes('tutorial')) {
      difficultyLevel = 'beginner'
    } else if (repo.description?.toLowerCase().includes('advanced') || repo.description?.toLowerCase().includes('enterprise')) {
      difficultyLevel = 'advanced'
    }

    // Generate AI insights
    const insights = []
    if (repo.stargazers_count > 10000) insights.push('Highly popular in the community')
    if (repo.language === 'JavaScript' || repo.language === 'TypeScript') insights.push('Great for web development learning')
    if (repo.description?.toLowerCase().includes('framework')) insights.push('Framework/library for building applications')
    if (repo.description?.toLowerCase().includes('tool')) insights.push('Development tool to improve productivity')

    // Educational tags
    const educationalTags = []
    if (repo.language) educationalTags.push(repo.language)
    if (repo.description?.toLowerCase().includes('react')) educationalTags.push('React')
    if (repo.description?.toLowerCase().includes('api')) educationalTags.push('API')
    if (repo.description?.toLowerCase().includes('database')) educationalTags.push('Database')

    return {
      ...repo,
      aiScore,
      learningValue,
      difficultyLevel,
      aiRecommended: aiScore > 85,
      personalizedScore: calculatePersonalizedScore(repo, aiScore, learningValue),
      aiInsights: insights,
      trendingScore: Math.floor(repo.stargazers_count / 1000) + Math.floor(Math.random() * 20),
      educationalTags
    }
  }

  const calculatePersonalizedScore = (repo: Repository, aiScore: number, learningValue: number): number => {
    let score = (aiScore + learningValue) / 2

    // Adjust based on user skill level
    if (repo.difficultyLevel === userSkillLevel) {
      score += 10
    } else if (
      (userSkillLevel === 'beginner' && repo.difficultyLevel === 'intermediate') ||
      (userSkillLevel === 'intermediate' && repo.difficultyLevel === 'advanced')
    ) {
      score += 5
    } else {
      score -= 5
    }

    return Math.min(100, Math.max(0, score))
  }

  useEffect(() => {
    const fetchTrendingRepos = async () => {
      try {
        const response = await axios.get('/api/get-trending', {
          timeout: 5000 // 5 second timeout
        })
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setAiAnalyzing(true)
          // AI-enhance the repositories
          const enhancedRepos = response.data.map(analyzeRepositoryWithAI)
          setRepos(enhancedRepos)
          setUsingFallback(false)
          setTimeout(() => setAiAnalyzing(false), 1000) // Simulate AI processing time
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
  }, [userSkillLevel])

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading trending repositories...</p>
      </div>
    )
  }

  // Sort repositories based on selected criteria
  const getSortedRepos = () => {
    let sortedRepos = [...repos]

    switch (sortBy) {
      case 'ai-recommended':
        sortedRepos = sortedRepos.sort((a, b) => (b.personalizedScore || 0) - (a.personalizedScore || 0))
        break
      case 'learning-value':
        sortedRepos = sortedRepos.sort((a, b) => (b.learningValue || 0) - (a.learningValue || 0))
        break
      case 'trending':
        sortedRepos = sortedRepos.sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0))
        break
      default:
        sortedRepos = sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count)
    }

    return sortedRepos
  }

  const coderLanguages = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart'
  ];
  const coderKeywords = [
    'code', 'program', 'dev', 'framework', 'library', 'tool', 'AI', 'ML', 'data', 'script', 'API', 'backend', 'frontend', 'fullstack'
  ];

  const sortedRepos = getSortedRepos()
  const filteredRepos = sortedRepos.filter(repo =>
    coderLanguages.includes(repo.language) ||
    coderKeywords.some(kw =>
      (repo.description && repo.description.toLowerCase().includes(kw)) ||
      (repo.name && repo.name.toLowerCase().includes(kw))
    )
  );

  return (
    <div className="my-8">
      {/* AI Status Banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <FaBrain className="w-4 h-4" />
            <span className="text-sm font-medium">
              {aiAnalyzing ? 'AI is analyzing repositories...' :
               usingFallback ? 'AI-curated popular repositories (GitHub API temporarily unavailable)' :
               'AI-enhanced trending repositories with personalized recommendations'}
            </span>
            {aiAnalyzing && <div className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin ml-2" />}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Skill Level:</span>
            <select
              value={userSkillLevel}
              onChange={(e) => setUserSkillLevel(e.target.value as any)}
              className="text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
          <div className="flex gap-2">
            {[
              { value: 'ai-recommended', label: 'AI Recommended', icon: FaBrain },
              { value: 'learning-value', label: 'Learning Value', icon: FaLightbulb },
              { value: 'trending', label: 'Trending', icon: FiTrendingUp }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  sortBy === option.value
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <option.icon className="w-3 h-3" />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <FiTarget className="w-4 h-4" />
          <span>{filteredRepos.length} repositories found</span>
        </div>
      </div>

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
              {/* AI Recommended Badge */}
              {repo.aiRecommended && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <FaBrain className="w-2 h-2" />
                  AI
                </div>
              )}

              {/* New badge */}
              {isNewRepo(repo.created_at) && !repo.aiRecommended && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">NEW</span>
              )}

              {/* Difficulty Level */}
              {repo.difficultyLevel && (
                <div className={`absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded-full ${
                  repo.difficultyLevel === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                  repo.difficultyLevel === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {repo.difficultyLevel}
                </div>
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
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 leading-relaxed flex-1">
                {repo.description}
              </p>

              {/* AI Insights */}
              {repo.aiInsights && repo.aiInsights.length > 0 && (
                <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-1 mb-1">
                    <FaLightbulb className="w-3 h-3 text-blue-500" />
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300">AI Insight</span>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    {repo.aiInsights[0]}
                  </p>
                </div>
              )}

              {/* AI Scores */}
              {(repo.aiScore || repo.learningValue || repo.personalizedScore) && (
                <div className="mb-3 grid grid-cols-3 gap-2 text-xs">
                  {repo.aiScore && (
                    <div className="text-center">
                      <div className="text-gray-500 dark:text-gray-400">AI Score</div>
                      <div className="font-bold text-blue-600 dark:text-blue-400">{repo.aiScore}</div>
                    </div>
                  )}
                  {repo.learningValue && (
                    <div className="text-center">
                      <div className="text-gray-500 dark:text-gray-400">Learning</div>
                      <div className="font-bold text-green-600 dark:text-green-400">{repo.learningValue}</div>
                    </div>
                  )}
                  {repo.personalizedScore && (
                    <div className="text-center">
                      <div className="text-gray-500 dark:text-gray-400">For You</div>
                      <div className="font-bold text-purple-600 dark:text-purple-400">{Math.round(repo.personalizedScore)}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Educational Tags */}
              {repo.educationalTags && repo.educationalTags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1">
                  {repo.educationalTags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {repo.educationalTags.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{repo.educationalTags.length - 3} more
                    </span>
                  )}
                </div>
              )}

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