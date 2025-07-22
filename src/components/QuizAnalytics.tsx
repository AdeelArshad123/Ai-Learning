'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { quizTracker } from '@/utils/quizTracker'
import { FiTrendingUp, FiClock, FiAward, FiTarget, FiBookOpen, FiBarChart, FiDownload, FiRefreshCw, FiCalendar, FiZap, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'

interface QuizAnalyticsProps {
  topic: string
  language: string
}

export default function QuizAnalytics({ topic, language }: QuizAnalyticsProps) {
  const [stats, setStats] = useState<any>(null)
  const [globalStats, setGlobalStats] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'insights' | 'recommendations'>('overview')

  useEffect(() => {
    const topicStats = quizTracker.getPerformanceStats(topic, language)
    const global = quizTracker.getGlobalStats()
    setStats(topicStats)
    setGlobalStats(global)
  }, [topic, language])

  if (!stats) {
    return (
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <div className="text-center text-gray-500">
          <FiBarChart className="text-4xl mx-auto mb-4 text-gray-300" />
          <p>No quiz data available yet. Take your first quiz to see analytics!</p>
        </div>
      </div>
    )
  }

  const getProgressColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600'
    if (score >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConsistencyColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Learning Analytics</h3>
            <p className="text-gray-600">{topic} • {language}</p>
          </div>
          <button
            onClick={() => quizTracker.exportData()}
            className="btn-secondary px-4 py-2 text-sm flex items-center gap-2"
          >
            <FiDownload />
            Export Data
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {[
          { id: 'overview', label: 'Overview', icon: FiBarChart },
          { id: 'progress', label: 'Progress', icon: FiTrendingUp },
          { id: 'insights', label: 'Insights', icon: FiTarget },
          { id: 'recommendations', label: 'Recommendations', icon: FiBookOpen }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="text-lg" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-blue-600 font-medium text-sm">Total Quizzes</div>
                <div className="text-2xl font-bold text-blue-800">{stats.totalQuizzes}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-green-600 font-medium text-sm">Average Score</div>
                <div className={`text-2xl font-bold ${getProgressColor(stats.averageScore)}`}>
                  {(stats.averageScore * 100).toFixed(1)}%
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-purple-600 font-medium text-sm">Best Score</div>
                <div className="text-2xl font-bold text-purple-800">
                  {(stats.bestScore * 100).toFixed(1)}%
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-orange-600 font-medium text-sm">Current Level</div>
                <div className="text-2xl font-bold text-orange-800 capitalize">
                  {stats.currentDifficulty}
                </div>
              </div>
            </div>

            {/* Time Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FiClock className="text-gray-600" />
                  Time Analysis
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Time Spent:</span>
                    <span className="font-medium">{Math.round(stats.totalTimeSpent / 60)} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Time/Question:</span>
                    <span className="font-medium">{Math.round(stats.averageTimePerQuestion)} seconds</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FiAward className="text-gray-600" />
                  Consistency Score
                </h4>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getConsistencyColor(stats.consistencyScore)}`}>
                    {Math.round(stats.consistencyScore)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {stats.consistencyScore >= 80 ? 'Excellent consistency!' :
                     stats.consistencyScore >= 60 ? 'Good consistency' :
                     'Try to quiz more regularly'}
                  </div>
                </div>
              </div>
            </div>

            {/* Global Stats */}
            {globalStats && globalStats.totalQuizzes > 0 && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Global Performance</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Total Quizzes</div>
                    <div className="font-bold">{globalStats.totalQuizzes}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Favorite Language</div>
                    <div className="font-bold">{globalStats.favoriteLanguage}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Favorite Topic</div>
                    <div className="font-bold">{globalStats.favoriteTopic}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Best Streak</div>
                    <div className="font-bold">{globalStats.totalStreak}</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Improvement Rate */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiTrendingUp className="text-green-600" />
                Improvement Rate
              </h4>
              <div className="text-center">
                <div className={`text-3xl font-bold ${stats.improvementRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.improvementRate >= 0 ? '+' : ''}{stats.improvementRate.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {stats.improvementRate >= 0 ? 'You\'re improving!' : 'Keep practicing to improve'}
                </div>
              </div>
            </div>

            {/* Streak History */}
            {stats.streakHistory.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Streak History</h4>
                <div className="flex items-center gap-2">
                  {stats.streakHistory.slice(-5).map((streak: number, idx: number) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        streak >= 3 ? 'bg-green-500 text-white' :
                        streak >= 2 ? 'bg-yellow-500 text-white' :
                        'bg-gray-300 text-gray-700'
                      }`}
                    >
                      {streak}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Recent streaks (last 5 quizzes)
                </div>
              </div>
            )}

            {/* Last Quiz Info */}
            {stats.lastQuizDate && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FiCalendar className="text-blue-600" />
                  Last Activity
                </h4>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-800">{stats.lastQuizDate}</div>
                  <div className="text-sm text-gray-600 mt-1">Last quiz taken</div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'insights' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Strong Areas */}
            {stats.strongAreas.length > 0 && (
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FiCheckCircle className="text-green-600" />
                  Your Strengths
                </h4>
                <div className="space-y-2">
                  {stats.strongAreas.map((area: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Weak Areas */}
            {stats.weakAreas.length > 0 && (
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FiAlertCircle className="text-red-600" />
                  Areas for Improvement
                </h4>
                <div className="space-y-2">
                  {stats.weakAreas.map((area: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Time Efficiency */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FiZap className="text-yellow-600" />
                Time Efficiency
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Time per Question:</span>
                  <span className="font-medium">{Math.round(stats.averageTimePerQuestion)} seconds</span>
                </div>
                <div className="text-sm text-gray-600">
                  {stats.averageTimePerQuestion < 60 ? 'Excellent speed!' :
                   stats.averageTimePerQuestion < 120 ? 'Good pace' :
                   'Consider practicing for speed'}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Learning Path */}
            {stats.learningPath.length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiBookOpen className="text-purple-600" />
                  Recommended Learning Path
                </h4>
                <div className="space-y-3">
                  {stats.learningPath.map((step: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Type Recommendations */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Quiz Type Recommendations</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Try different quiz types to improve learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Code completion questions for practical skills</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Scenario-based questions for real-world application</span>
                </div>
              </div>
            </div>

            {/* Study Tips */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Study Tips</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Take quizzes regularly to maintain consistency</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Review explanations for incorrect answers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Practice with code snippets to improve understanding</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Focus on weak areas identified in insights</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 