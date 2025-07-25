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
  FaRefresh,
  FaFilter,
  FaHeart,
  FaBookmark
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

const typeColors = {
  quiz: 'from-blue-500 to-blue-600',
  tutorial: 'from-green-500 to-green-600',
  project: 'from-purple-500 to-purple-600',
  video: 'from-red-500 to-red-600',
  article: 'from-yellow-500 to-yellow-600'
}

const priorityColors = {
  high: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
  medium: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20',
  low: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
}

export default function PersonalizedRecommendationsSimple() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/personalized-recommendations')
      if (response.ok) {
        const data = await response.json()
        setRecommendations(data.recommendations || [])
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FaRocket className="text-white text-xl" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              🤖 Personalized for You
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            AI-curated recommendations based on your learning progress, interests, and goals
          </p>
        </motion.div>

        {/* Recommendations Grid */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {recommendations.map((rec, index) => {
              const IconComponent = typeIcons[rec.type] || FaBookOpen
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
                  }`} />

                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-4">
                    {rec.isNew && (
                      <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    {rec.isTrending && (
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <FaFire className="text-xs" />
                        TRENDING
                      </span>
                    )}
                  </div>

                  {/* Type Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${typeColors[rec.type]} flex items-center justify-center mb-4`}>
                    <IconComponent className="text-white text-xl" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {rec.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {rec.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${difficultyColors[rec.difficulty]}`}>
                      {rec.difficulty}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                      <FaClock />
                      {rec.estimatedTime}
                    </div>
                  </div>

                  {/* Reason */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 italic">
                    {rec.reason}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500 dark:bg-gray-700 dark:hover:bg-red-900/30 transition-colors">
                        <FaHeart className="text-sm" />
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-500 dark:bg-gray-700 dark:hover:bg-blue-900/30 transition-colors">
                        <FaBookmark className="text-sm" />
                      </button>
                    </div>
                    
                    <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all group-hover:scale-105">
                      Start
                      <FaChevronRight className="text-xs" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && recommendations.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaFilter className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No recommendations found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try refreshing to get new recommendations
            </p>
            <button
              onClick={fetchRecommendations}
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors"
            >
              <FaRefresh />
              Refresh Recommendations
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
