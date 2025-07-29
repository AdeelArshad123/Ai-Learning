'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaRocket, 
  FaBookOpen, 
  FaCode, 
  FaVideo, 
  FaNewspaper, 
  FaClock, 
  FaStar, 
  FaFire, 
  FaChevronRight,
  FaRedo,
  FaFilter,
  FaHeart,
  FaBookmark,
  FaRobot
} from 'react-icons/fa'

interface Recommendation {
  id: string
  type: 'quiz' | 'tutorial' | 'project' | 'video' | 'article'
  title: string
  description: string
  difficulty: string
  estimatedTime: string
  priority: 'high' | 'medium' | 'low'
  reason: string
  url?: string
  tags: string[]
  isNew?: boolean
  isTrending?: boolean
  completionRate?: number
}

const typeIcons = {
  quiz: FaBookOpen,
  tutorial: FaCode,
  project: FaRocket,
  video: FaVideo,
  article: FaNewspaper
}

const priorityColors = {
  high: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
  medium: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20',
  low: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

export default function AIRecommendationsTest() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock data for testing when API is not available
  const mockRecommendations: Recommendation[] = [
    {
      id: 'mock-1',
      type: 'quiz',
      title: 'Master JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and control structures',
      difficulty: 'beginner',
      estimatedTime: '15 min',
      priority: 'high',
      reason: 'Based on your recent activity, strengthening JavaScript fundamentals will help you progress faster',
      tags: ['JavaScript', 'fundamentals', 'practice'],
      isNew: true
    },
    {
      id: 'mock-2',
      type: 'tutorial',
      title: 'React Hooks Deep Dive',
      description: 'Learn advanced React hooks patterns and best practices for modern React development',
      difficulty: 'intermediate',
      estimatedTime: '45 min',
      priority: 'high',
      reason: 'Perfect next step after mastering React basics',
      tags: ['React', 'hooks', 'advanced'],
      isTrending: true
    },
    {
      id: 'mock-3',
      type: 'project',
      title: 'Build a Full-Stack Todo App',
      description: 'Create a complete todo application with React frontend and Node.js backend',
      difficulty: 'intermediate',
      estimatedTime: '2 hours',
      priority: 'medium',
      reason: 'Hands-on project to apply your React and Node.js skills',
      tags: ['React', 'Node.js', 'fullstack', 'project'],
      completionRate: 85
    },
    {
      id: 'mock-4',
      type: 'video',
      title: 'TypeScript for React Developers',
      description: 'Learn how to use TypeScript effectively in React applications',
      difficulty: 'intermediate',
      estimatedTime: '30 min',
      priority: 'medium',
      reason: 'TypeScript will improve your code quality and development experience',
      tags: ['TypeScript', 'React', 'types']
    }
  ]

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Try to fetch from API first
      const response = await fetch('/api/personalized-recommendations')
      if (response.ok) {
        const data = await response.json()
        setRecommendations(data.recommendations || [])
      } else {
        throw new Error('API not available')
      }
    } catch (error) {
      console.log('API not available, using mock data')
      setError('Using demo data - API endpoint not available')
      // Use mock data when API is not available
      setTimeout(() => {
        setRecommendations(mockRecommendations)
        setLoading(false)
      }, 1000)
      return
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <FaRobot className="text-4xl text-blue-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              AI Recommendations Test
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Testing the AI-powered personalized learning recommendations system
          </p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg text-yellow-800 dark:text-yellow-200">
              {error}
            </div>
          )}
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={fetchRecommendations}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaRedo className="w-4 h-4" />
              Refresh Recommendations
            </button>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {recommendations.length} recommendations found
          </div>
        </div>

        {/* Recommendations Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendations.map((rec, index) => {
              const Icon = typeIcons[rec.type] || FaBookOpen
              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all cursor-pointer group hover:shadow-xl ${priorityColors[rec.priority]}`}
                >
                  {/* Priority Indicator */}
                  <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                    rec.priority === 'high' ? 'bg-red-500' :
                    rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>

                  {/* Badges */}
                  <div className="flex gap-2 mb-4">
                    {rec.isNew && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold rounded-full">
                        NEW
                      </span>
                    )}
                    {rec.isTrending && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs font-semibold rounded-full flex items-center gap-1">
                        <FaFire className="w-3 h-3" />
                        TRENDING
                      </span>
                    )}
                  </div>

                  {/* Icon and Type */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {rec.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {rec.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {rec.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FaClock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{rec.estimatedTime}</span>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${difficultyColors[rec.difficulty as keyof typeof difficultyColors]}`}>
                      {rec.difficulty}
                    </span>
                  </div>

                  {/* Reason */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-600 dark:text-gray-300 italic">
                      "{rec.reason}"
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {rec.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group">
                    Start Learning
                    <FaChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && recommendations.length === 0 && (
          <div className="text-center py-12">
            <FaRobot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Recommendations Available
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try refreshing or check back later for personalized recommendations.
            </p>
            <button
              onClick={fetchRecommendations}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Refresh Recommendations
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
