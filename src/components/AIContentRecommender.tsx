'use client'

import { useState, useEffect } from 'react'
import {
  FaRobot,
  FaStar,
  FaBookOpen,
  FaVideo,
  FaCode,
  FaLightbulb,
  FaArrowRight,
  FaHeart,
  FaSpinner,
  FaRedo
} from 'react-icons/fa'

interface RecommendedContent {
  id: string
  title: string
  description: string
  type: 'article' | 'video' | 'course' | 'tutorial' | 'documentation'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  rating: number
  url: string
  thumbnail?: string
  tags: string[]
  aiReason: string
}

interface AIContentRecommenderProps {
  userInterests?: string[]
  currentTopic?: string
  skillLevel?: 'beginner' | 'intermediate' | 'advanced'
  learningGoals?: string[]
}

export default function AIContentRecommender({
  userInterests = [],
  currentTopic = 'JavaScript',
  skillLevel = 'intermediate',
  learningGoals = []
}: AIContentRecommenderProps) {
  const [recommendations, setRecommendations] = useState<RecommendedContent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  // AI-powered content recommendation engine
  const generateRecommendations = async (): Promise<RecommendedContent[]> => {
    setIsLoading(true)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000))

    // AI-curated content based on user profile and current context
    const contentDatabase: RecommendedContent[] = [
      {
        id: '1',
        title: 'Modern JavaScript ES6+ Features You Must Know',
        description: 'Master arrow functions, destructuring, async/await, and other essential ES6+ features that every JavaScript developer should know.',
        type: 'article',
        difficulty: 'intermediate',
        estimatedTime: '15 min read',
        rating: 4.8,
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        tags: ['JavaScript', 'ES6', 'Modern JS', 'Functions'],
        aiReason: 'Recommended because you\'re currently exploring JavaScript and this covers essential modern features for intermediate developers.'
      },
      {
        id: '2',
        title: 'React Hooks Complete Guide',
        description: 'Deep dive into React Hooks including useState, useEffect, useContext, and custom hooks with practical examples.',
        type: 'video',
        difficulty: 'intermediate',
        estimatedTime: '45 min watch',
        rating: 4.9,
        url: 'https://reactjs.org/docs/hooks-intro.html',
        tags: ['React', 'Hooks', 'Frontend', 'Components'],
        aiReason: 'Perfect next step after JavaScript fundamentals. React is highly relevant for modern web development.'
      },
      {
        id: '3',
        title: 'Building Your First REST API with Node.js',
        description: 'Learn to create a complete REST API using Node.js, Express, and MongoDB with authentication and error handling.',
        type: 'tutorial',
        difficulty: 'intermediate',
        estimatedTime: '2 hour tutorial',
        rating: 4.7,
        url: 'https://nodejs.org/en/docs/',
        tags: ['Node.js', 'API', 'Backend', 'Express'],
        aiReason: 'Great for full-stack development. Complements your frontend skills with backend knowledge.'
      },
      {
        id: '4',
        title: 'CSS Grid and Flexbox Mastery',
        description: 'Master modern CSS layout techniques with Grid and Flexbox. Build responsive layouts with confidence.',
        type: 'course',
        difficulty: 'beginner',
        estimatedTime: '3 hours',
        rating: 4.6,
        url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
        tags: ['CSS', 'Layout', 'Grid', 'Flexbox', 'Responsive'],
        aiReason: 'Essential for web developers. Strong CSS skills complement your JavaScript knowledge perfectly.'
      },
      {
        id: '5',
        title: 'Python for Beginners: Complete Roadmap',
        description: 'Start your Python journey with this comprehensive guide covering syntax, data structures, and practical projects.',
        type: 'course',
        difficulty: 'beginner',
        estimatedTime: '4 hours',
        rating: 4.8,
        url: 'https://python.org/doc/',
        tags: ['Python', 'Beginner', 'Programming', 'Fundamentals'],
        aiReason: 'Python is excellent for expanding your programming skills. Great for data science and backend development.'
      },
      {
        id: '6',
        title: 'Advanced TypeScript Patterns',
        description: 'Explore advanced TypeScript features including generics, decorators, and advanced type manipulation.',
        type: 'article',
        difficulty: 'advanced',
        estimatedTime: '25 min read',
        rating: 4.7,
        url: 'https://www.typescriptlang.org/docs/',
        tags: ['TypeScript', 'Advanced', 'Types', 'Patterns'],
        aiReason: 'TypeScript adds type safety to JavaScript. Perfect for scaling your JavaScript applications.'
      },
      {
        id: '7',
        title: 'Git and GitHub Workflow Mastery',
        description: 'Master version control with Git and collaborative development with GitHub. Essential for any developer.',
        type: 'tutorial',
        difficulty: 'beginner',
        estimatedTime: '1.5 hours',
        rating: 4.9,
        url: 'https://git-scm.com/doc',
        tags: ['Git', 'GitHub', 'Version Control', 'Collaboration'],
        aiReason: 'Essential tool for all developers. Critical for professional development and team collaboration.'
      },
      {
        id: '8',
        title: 'Database Design Fundamentals',
        description: 'Learn database design principles, normalization, and SQL basics for building robust applications.',
        type: 'course',
        difficulty: 'intermediate',
        estimatedTime: '3.5 hours',
        rating: 4.5,
        url: 'https://www.postgresql.org/docs/',
        tags: ['Database', 'SQL', 'Design', 'Backend'],
        aiReason: 'Databases are crucial for full-stack development. Complements your API development skills.'
      }
    ]

    // AI filtering and ranking based on user profile
    let filteredContent = contentDatabase.filter(content => {
      // Match skill level or slightly above for growth
      const skillLevels = ['beginner', 'intermediate', 'advanced']
      const userLevelIndex = skillLevels.indexOf(skillLevel)
      const contentLevelIndex = skillLevels.indexOf(content.difficulty)
      
      // Include content at user level and one level above
      return contentLevelIndex >= userLevelIndex && contentLevelIndex <= userLevelIndex + 1
    })

    // Boost relevance based on current topic and interests
    filteredContent = filteredContent.map(content => ({
      ...content,
      relevanceScore: calculateRelevanceScore(content, currentTopic, userInterests)
    })).sort((a, b) => (b as any).relevanceScore - (a as any).relevanceScore)

    return filteredContent.slice(0, 6) // Return top 6 recommendations
  }

  const calculateRelevanceScore = (content: RecommendedContent, topic: string, interests: string[]): number => {
    let score = content.rating * 10 // Base score from rating

    // Boost if matches current topic
    if (content.tags.some(tag => tag.toLowerCase().includes(topic.toLowerCase()))) {
      score += 30
    }

    // Boost if matches user interests
    interests.forEach(interest => {
      if (content.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))) {
        score += 20
      }
    })

    // Boost popular content types
    if (content.type === 'tutorial' || content.type === 'course') {
      score += 10
    }

    return score
  }

  const toggleFavorite = (contentId: string) => {
    setFavorites(prev =>
      prev.includes(contentId)
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return FaVideo
      case 'course': return FaBookOpen
      case 'tutorial': return FaCode
      case 'documentation': return FaBookOpen
      default: return FaLightbulb
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  useEffect(() => {
    generateRecommendations().then(setRecommendations)
  }, [currentTopic, skillLevel])

  const refreshRecommendations = () => {
    generateRecommendations().then(setRecommendations)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <FaRobot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              AI Recommendations
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Personalized content for your learning journey
            </p>
          </div>
        </div>
        
        <button
          onClick={refreshRecommendations}
          disabled={isLoading}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50"
        >
          <FaRedo className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <FaSpinner className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              AI is analyzing your learning profile...
            </p>
          </div>
        </div>
      )}

      {/* Recommendations Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((content, index) => {
            const IconComponent = getTypeIcon(content.type)
            
            return (
              <div
                key={content.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group"
              >
                {/* Content Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 capitalize">
                      {content.type}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => toggleFavorite(content.id)}
                    className={`p-1 rounded-full transition-colors ${
                      favorites.includes(content.id)
                        ? 'text-red-500'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <FaHeart className="w-3 h-3" />
                  </button>
                </div>

                {/* Content Title */}
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {content.title}
                </h4>

                {/* Content Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {content.description}
                </p>

                {/* Tags and Difficulty */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(content.difficulty)}`}>
                    {content.difficulty}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {content.estimatedTime}
                  </span>
                </div>

                {/* AI Reason */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-3">
                  <div className="flex items-start gap-2">
                    <FaRobot className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      {content.aiReason}
                    </p>
                  </div>
                </div>

                {/* Rating and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FaStar className="w-3 h-3 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {content.rating}
                    </span>
                  </div>
                  
                  <a
                    href={content.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    <span>Explore</span>
                    <FaArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Footer */}
      {!isLoading && recommendations.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            🤖 Recommendations powered by AI • Updated based on your learning progress
          </p>
        </div>
      )}
    </div>
  )
}
