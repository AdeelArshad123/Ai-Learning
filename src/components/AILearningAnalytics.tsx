'use client'

import { useState, useEffect } from 'react'
import {
  FaChartLine,
  FaBrain,
  FaTrophy,
  FaBullseye,
  FaClock,
  FaFire,
  FaArrowUp,
  FaArrowDown,
  FaLightbulb,
  FaRobot,
  FaCalendarAlt
} from 'react-icons/fa'

interface LearningMetrics {
  totalStudyTime: number
  completedTopics: number
  currentStreak: number
  averageQuizScore: number
  skillLevel: string
  strongAreas: string[]
  improvementAreas: string[]
  predictedCompletion: string
  learningVelocity: number
  engagementScore: number
}

interface AIInsight {
  id: string
  type: 'success' | 'warning' | 'info' | 'prediction'
  title: string
  description: string
  actionable: boolean
  recommendation?: string
}

export default function AILearningAnalytics() {
  const [metrics, setMetrics] = useState<LearningMetrics | null>(null)
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulate AI analytics processing
  const generateAnalytics = async (): Promise<{ metrics: LearningMetrics; insights: AIInsight[] }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const mockMetrics: LearningMetrics = {
      totalStudyTime: 47.5, // hours
      completedTopics: 12,
      currentStreak: 7, // days
      averageQuizScore: 78.5,
      skillLevel: 'Intermediate',
      strongAreas: ['JavaScript', 'React', 'CSS'],
      improvementAreas: ['Node.js', 'Databases', 'Testing'],
      predictedCompletion: '3 weeks',
      learningVelocity: 85, // percentage
      engagementScore: 92
    }

    const mockInsights: AIInsight[] = [
      {
        id: '1',
        type: 'success',
        title: 'Excellent Progress!',
        description: 'You\'ve maintained a 7-day learning streak and completed 12 topics this month.',
        actionable: false
      },
      {
        id: '2',
        type: 'prediction',
        title: 'Completion Forecast',
        description: 'Based on your current pace, you\'ll complete your JavaScript learning path in 3 weeks.',
        actionable: true,
        recommendation: 'Consider adding 15 minutes daily to finish 1 week earlier.'
      },
      {
        id: '3',
        type: 'warning',
        title: 'Knowledge Gap Detected',
        description: 'Your backend skills (Node.js, Databases) are lagging behind your frontend progress.',
        actionable: true,
        recommendation: 'Focus on Node.js fundamentals next to balance your full-stack skills.'
      },
      {
        id: '4',
        type: 'info',
        title: 'Optimal Learning Time',
        description: 'Your quiz scores are 23% higher when studying between 9-11 AM.',
        actionable: true,
        recommendation: 'Schedule challenging topics during your peak performance hours.'
      },
      {
        id: '5',
        type: 'success',
        title: 'Strong Foundation',
        description: 'Your JavaScript fundamentals score is in the top 15% of learners.',
        actionable: false
      }
    ]

    return { metrics: mockMetrics, insights: mockInsights }
  }

  useEffect(() => {
    generateAnalytics().then(({ metrics, insights }) => {
      setMetrics(metrics)
      setInsights(insights)
      setIsLoading(false)
    })
  }, [])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return FaTrophy
      case 'warning': return FaLightbulb
      case 'info': return FaBrain
      case 'prediction': return FaBullseye
      default: return FaRobot
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300'
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300'
      case 'prediction': return 'bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300'
      default: return 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-800 dark:text-gray-300'
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <FaBrain className="w-12 h-12 text-blue-500 animate-pulse mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              AI is analyzing your learning patterns...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!metrics) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <FaChartLine className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Learning Analytics</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your learning insights at a glance</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Learning Velocity</div>
          <div className="text-lg font-bold text-green-600">{metrics.learningVelocity}%</div>
        </div>
      </div>

      {/* Horizontal Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <FaClock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <div className="text-xl font-bold text-blue-900 dark:text-blue-100">{metrics.totalStudyTime}h</div>
          <div className="text-xs text-blue-600 dark:text-blue-400">Study Time</div>
        </div>

        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <FaFire className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <div className="text-xl font-bold text-green-900 dark:text-green-100">{metrics.currentStreak}</div>
          <div className="text-xs text-green-600 dark:text-green-400">Day Streak</div>
        </div>

        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
          <FaTrophy className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <div className="text-xl font-bold text-purple-900 dark:text-purple-100">{metrics.averageQuizScore}%</div>
          <div className="text-xs text-purple-600 dark:text-purple-400">Quiz Score</div>
        </div>

        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
          <FaBullseye className="w-5 h-5 text-orange-600 mx-auto mb-1" />
          <div className="text-xl font-bold text-orange-900 dark:text-orange-100">{metrics.predictedCompletion}</div>
          <div className="text-xs text-orange-600 dark:text-orange-400">Completion</div>
        </div>
      </div>

      {/* Horizontal Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Engagement</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{metrics.engagementScore}%</span>
          </div>
          <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${metrics.engagementScore}%` }}
            />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{metrics.learningVelocity}%</span>
          </div>
          <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${metrics.learningVelocity}%` }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal AI Insights */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <FaRobot className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {insights.slice(0, 3).map((insight, index) => {
            const IconComponent = getInsightIcon(insight.type)

            return (
              <div
                key={insight.id}
                className={`border rounded-lg p-3 ${getInsightColor(insight.type)}`}
              >
                <div className="flex items-start gap-2">
                  <IconComponent className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm mb-1 truncate">{insight.title}</h4>
                    <p className="text-xs leading-relaxed">{insight.description}</p>

                    {insight.recommendation && (
                      <div className="mt-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded text-xs">
                        <span className="font-medium">💡 </span>
                        {insight.recommendation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Horizontal Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
            <FaArrowUp className="w-4 h-4" />
            Strong Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {metrics.strongAreas.map((area, index) => (
              <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-full text-xs">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2">
            <FaBullseye className="w-4 h-4" />
            Focus Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {metrics.improvementAreas.map((area, index) => (
              <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300 rounded-full text-xs">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
