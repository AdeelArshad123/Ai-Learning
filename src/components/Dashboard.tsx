'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// Optimized icon imports - only import what we need
import {
  FiTarget,
  FiActivity,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiTrendingUp,
  FiTrendingDown,
  FiCheckCircle,
  FiBookOpen,
  FiCode,
  FiZap,
  FiAward,
  FiClock,
  FiBarChart
} from 'react-icons/fi'
import {
  FaRocket,
  FaLightbulb,
  FaBrain,
  FaGamepad,
  FaVideo,
  FaFire,
  FaCrown,
  FaChartLine,
  FaHeart,
  FaTrophy,
  FaRobot,
  FaMagic,
  FaEye,
  FaBolt
} from 'react-icons/fa'
import { useNotifications } from '@/components/NotificationProvider'
import type { NotificationContextType } from '@/types/notifications'

// Enhanced interfaces for the AI-powered dashboard
interface QuickAction {
  id: string
  title: string
  description: string
  icon: any
  href: string
  gradient: string
  bgColor: string
  count?: number
  isNew?: boolean
  aiRecommended?: boolean
  priority?: 'low' | 'medium' | 'high'
}

interface AIInsight {
  type: 'recommendation' | 'warning' | 'celebration' | 'tip'
  title: string
  message: string
  actionable: boolean
  action?: string
  priority: 'low' | 'medium' | 'high'
  category: string
  icon: any
}

interface UserAnalytics {
  totalXP: number
  currentLevel: number
  streak: number
  completedTopics: number
  skillLevel: string
  weeklyProgress: number
  learningVelocity: number
  nextMilestone: string
}

interface ProgressData {
  label: string
  current: number
  target: number
  percentage: number
  color: string
  icon: any
  trend: 'up' | 'down' | 'stable'
}

interface Activity {
  id: string
  title: string
  description: string
  time: string
  type: 'quiz' | 'code' | 'video' | 'trend' | 'achievement'
  score?: string
  icon: any
  color: string
  gradient: string
}

interface LearningTip {
  id: string
  title: string
  content: string
  category: string
  icon: any
  color: string
}

// Automated data that updates dynamically
const getQuickActions = (): QuickAction[] => [
  {
    id: '1',
    title: 'AI Code Generator',
    description: 'Generate smart code examples',
    icon: FaBrain,
    href: '#ai-code',
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    count: 12,
    isNew: false
  },
  {
    id: '2',
    title: 'Interactive Quiz',
    description: 'Test your programming skills',
    icon: FaGamepad,
    href: '#quizzes',
    gradient: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    count: 8,
    isNew: true
  },
  {
    id: '3',
    title: 'Video Tutorials',
    description: 'Learn from expert channels',
    icon: FaVideo,
    href: '#youtube',
    gradient: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    count: 24
  },
  {
    id: '4',
    title: 'Trending Tools',
    description: 'Explore latest technologies',
    icon: FaRocket,
    href: '#trending',
    gradient: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    count: 15
  }
]

const getProgressData = (): ProgressData[] => [
  {
    label: 'Topics Mastered',
    current: 8,
    target: 12,
    percentage: 67,
    color: 'text-blue-600',
    icon: FiBookOpen,
    trend: 'up'
  },
  {
    label: 'Quizzes Completed',
    current: 15,
    target: 20,
    percentage: 75,
    color: 'text-green-600',
    icon: FiCheckCircle,
    trend: 'up'
  },
  {
    label: 'Study Streak',
    current: 7,
    target: 30,
    percentage: 23,
    color: 'text-orange-600',
    icon: FaFire,
    trend: 'stable'
  },
  {
    label: 'Code Generated',
    current: 42,
    target: 50,
    percentage: 84,
    color: 'text-purple-600',
    icon: FiCode,
    trend: 'up'
  }
]

const getRecentActivities = (): Activity[] => [
  {
    id: '1',
    title: 'React Hooks Mastery Quiz',
    description: 'Scored 95% on advanced React concepts',
    time: '2 hours ago',
    type: 'quiz',
    score: '95%',
    icon: FaGamepad,
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: '2',
    title: 'TypeScript Interface Generator',
    description: 'Generated complex type definitions',
    time: '4 hours ago',
    type: 'code',
    icon: FaBrain,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: '3',
    title: 'Next.js 14 Tutorial Series',
    description: 'Completed App Router fundamentals',
    time: '1 day ago',
    type: 'video',
    icon: FaVideo,
    color: 'text-red-600',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    id: '4',
    title: 'Achievement Unlocked: Code Ninja',
    description: 'Generated 50+ code examples',
    time: '2 days ago',
    type: 'achievement',
    icon: FaCrown,
    color: 'text-yellow-600',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: '5',
    title: 'Tailwind CSS Trends Analysis',
    description: 'Explored utility-first CSS patterns',
    time: '3 days ago',
    type: 'trend',
    icon: FaChartLine,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-indigo-500'
  }
]

const getLearningTips = (): LearningTip[] => [
  {
    id: '1',
    title: 'Code Practice Tip',
    content: 'Practice coding for at least 30 minutes daily. Consistency beats intensity when building programming skills.',
    category: 'Practice',
    icon: FaLightbulb,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: '2',
    title: 'Learning Strategy',
    content: 'Break complex topics into smaller chunks. Master one concept before moving to the next.',
    category: 'Strategy',
    icon: FaBrain,
    color: 'from-blue-400 to-purple-500'
  },
  {
    id: '3',
    title: 'Project Building',
    content: 'Build projects while learning. Apply new concepts immediately to reinforce understanding.',
    category: 'Application',
    icon: FaRocket,
    color: 'from-green-400 to-blue-500'
  },
  {
    id: '4',
    title: 'Community Learning',
    content: 'Join coding communities and forums. Learning with others accelerates your progress.',
    category: 'Community',
    icon: FaHeart,
    color: 'from-pink-400 to-red-500'
  }
]

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([])
  const [userAnalytics, setUserAnalytics] = useState<UserAnalytics | null>(null)
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [personalizedActions, setPersonalizedActions] = useState<QuickAction[]>([])
  const { showSuccess, showInfo } = useNotifications()

  // Load AI insights and analytics on component mount
  useEffect(() => {
    loadAIInsights()
    loadUserAnalytics()
  }, [])

  // Auto-rotate learning tips every 10 seconds
  useEffect(() => {
    if (!isAutoRefresh) return

    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % getLearningTips().length)
    }, 10000)

    return () => clearInterval(interval)
  }, [isAutoRefresh])

  // Load AI insights
  const loadAIInsights = async () => {
    try {
      setIsLoadingAI(true)
      const response = await fetch('/api/ai-insights', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.ok) {
        const data = await response.json()
        setAiInsights(data.data.insights || [])

        // Generate personalized quick actions based on AI insights
        const aiActions = generatePersonalizedActions(data.data.recommendations || [])
        setPersonalizedActions(aiActions)
      }
    } catch (error) {
      console.error('Failed to load AI insights:', error)
      // Fallback to default insights
      setAiInsights(getDefaultInsights())
    } finally {
      setIsLoadingAI(false)
    }
  }

  // Load user analytics
  const loadUserAnalytics = async () => {
    try {
      const response = await fetch('/api/ai-insights?userId=demo-user')
      if (response.ok) {
        const data = await response.json()
        setUserAnalytics(data.data.overview)
      }
    } catch (error) {
      console.error('Failed to load user analytics:', error)
      // Fallback analytics
      setUserAnalytics({
        totalXP: 1250,
        currentLevel: 3,
        streak: 5,
        completedTopics: 12,
        skillLevel: 'intermediate',
        weeklyProgress: 75,
        learningVelocity: 8.5,
        nextMilestone: 'Level 4 (350 XP to go)'
      })
    }
  }

  const handleQuickAction = async (action: QuickAction) => {
    showSuccess('Action Started', `Opening ${action.title}...`)

    // Track user action for AI learning
    try {
      await fetch('/api/ai-insights', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user',
          action: 'quick-action-clicked',
          data: { actionId: action.id, title: action.title }
        })
      })
    } catch (error) {
      console.error('Failed to track action:', error)
    }

    // Scroll to the specific section
    const element = document.querySelector(action.href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Generate personalized actions based on AI recommendations
  const generatePersonalizedActions = (recommendations: any[]): QuickAction[] => {
    return recommendations.slice(0, 3).map((rec, index) => ({
      id: `ai-${index}`,
      title: rec.title,
      description: rec.description,
      icon: rec.type === 'skill-building' ? FaBrain :
            rec.type === 'project' ? FaRocket :
            rec.type === 'exploration' ? FaLightbulb : FaMagic,
      href: '#ai-recommendations',
      gradient: rec.priority === 'high' ? 'from-red-500 to-pink-500' :
                rec.priority === 'medium' ? 'from-blue-500 to-cyan-500' :
                'from-green-500 to-emerald-500',
      bgColor: rec.priority === 'high' ? 'bg-red-50 dark:bg-red-900/20' :
               rec.priority === 'medium' ? 'bg-blue-50 dark:bg-blue-900/20' :
               'bg-green-50 dark:bg-green-900/20',
      aiRecommended: true,
      priority: rec.priority,
      isNew: true
    }))
  }

  // Default AI insights fallback
  const getDefaultInsights = (): AIInsight[] => [
    {
      type: 'recommendation',
      title: '🎯 Focus Recommendation',
      message: 'Based on your progress, consider practicing React Hooks today',
      actionable: true,
      action: 'practice-react-hooks',
      priority: 'high',
      category: 'skill-development',
      icon: FiTarget
    },
    {
      type: 'celebration',
      title: '🔥 Great Progress!',
      message: 'You\'re on a 5-day learning streak! Keep it up!',
      actionable: false,
      priority: 'medium',
      category: 'motivation',
      icon: FaFire
    },
    {
      type: 'tip',
      title: '⏰ Optimal Learning Time',
      message: 'You learn best in the morning. Schedule important topics then!',
      actionable: true,
      action: 'schedule-learning',
      priority: 'medium',
      category: 'optimization',
      icon: FiClock
    }
  ]

  const quickActions = getQuickActions()
  const progressData = getProgressData()
  const recentActivities = getRecentActivities()
  const learningTips = getLearningTips()
  const currentTip = learningTips[currentTipIndex]

  return (
    <section className="py-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      <div className="w-full px-6">
        {/* AI Insights Header */}
        {userAnalytics && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto mb-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaRobot className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">AI-Powered Dashboard</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Welcome back, Level {userAnalytics.currentLevel} Learner!
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {userAnalytics.totalXP} XP • {userAnalytics.streak} day streak • {userAnalytics.nextMilestone}
            </p>
          </motion.div>
        )}

        {/* AI Insights Banner */}
        {aiInsights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <FaBrain className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  AI Learning Insights
                  {isLoadingAI && <FiRefreshCw className="w-3 h-3 animate-spin" />}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {aiInsights.slice(0, 2).map((insight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <insight.icon className={`w-3 h-3 mt-0.5 flex-shrink-0 ${
                        insight.type === 'celebration' ? 'text-green-500' :
                        insight.type === 'warning' ? 'text-red-500' :
                        insight.type === 'tip' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`} />
                      <div>
                        <p className="text-xs font-medium text-gray-900 dark:text-white">
                          {insight.title}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {insight.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Horizontal Dashboard Cards */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">

            {/* Quick Actions Card - Takes more space */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200/60 dark:border-gray-700/60 p-4 h-32 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center flex-shrink-0">
                  <FaRocket className="text-white text-sm" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {personalizedActions.length > 0 ? 'AI Recommended Actions' : 'Quick Actions'}
                </h3>
                {personalizedActions.length > 0 && (
                  <div className="flex items-center gap-1">
                    <FaBrain className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600 dark:text-blue-400">AI</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-4 gap-3 h-20">
                {quickActions.slice(0, 4).map((action, index) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickAction(action)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 group relative overflow-hidden h-full border hover:shadow-md ${
                      action.aiRecommended
                        ? 'border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30'
                        : 'border-transparent hover:border-blue-200 dark:hover:border-blue-800/50 hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-700/50 dark:hover:to-blue-900/20'
                    }`}
                  >
                    <div className={`w-6 h-6 bg-gradient-to-r ${action.gradient} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0 shadow-sm group-hover:shadow-md`}>
                      <action.icon className="text-white text-sm" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {action.title.split(' ')[0]}
                    </span>
                    {/* AI Badge */}
                    {action.aiRecommended && (
                      <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                        <FaBrain className="w-2 h-2" />
                      </div>
                    )}

                    {/* Priority Indicator */}
                    {action.aiRecommended && action.priority === 'high' && (
                      <div className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}

                    {action.isNew && !action.aiRecommended && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-sm" />
                    )}

                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200/60 dark:border-gray-700/60 p-4 h-32"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-md flex items-center justify-center">
                  <FiTarget className="text-white text-xs" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Progress</h3>
              </div>

              {progressData.slice(0, 2).map((progress, index) => (
                <motion.div
                  key={progress.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <progress.icon className={`${progress.color} text-xs`} />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                      {progress.label.split(' ')[0]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-12 bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                      <motion.div
                        className={`h-1 rounded-full bg-gradient-to-r ${
                          progress.percentage >= 80 ? 'from-green-500 to-emerald-500' :
                          progress.percentage >= 60 ? 'from-blue-500 to-cyan-500' :
                          progress.percentage >= 40 ? 'from-yellow-500 to-orange-500' :
                          'from-red-500 to-pink-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress.percentage}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-900 dark:text-white min-w-0">
                      {progress.percentage}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Recent Activity Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200/60 dark:border-gray-700/60 p-4 h-32"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-md flex items-center justify-center">
                  <FiActivity className="text-white text-xs" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Activity</h3>
              </div>

              {recentActivities.slice(0, 2).map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-2"
                >
                  <div className={`w-5 h-5 bg-gradient-to-r ${activity.gradient} rounded-md flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className="text-white text-xs" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white text-xs truncate">
                      {activity.title.split(' ').slice(0, 2).join(' ')}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>

                  {activity.score && (
                    <div className="text-xs font-bold text-green-600 dark:text-green-400 flex-shrink-0">
                      {activity.score}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Learning Tip Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200/60 dark:border-gray-700/60 p-4 h-32"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 bg-gradient-to-r ${currentTip.color} rounded-md flex items-center justify-center`}>
                    <currentTip.icon className="text-white text-xs" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Tip</h3>
                </div>

                <div className="flex gap-1">
                  {learningTips.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTipIndex(index)}
                      className={`w-1 h-1 rounded-full transition-colors ${
                        index === currentTipIndex
                          ? 'bg-blue-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTip.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-16 overflow-hidden"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1 text-xs">{currentTip.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                    {currentTip.content.substring(0, 80)}...
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
