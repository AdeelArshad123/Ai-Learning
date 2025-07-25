'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGrid, FiList, FiFilter, FiPlus, FiBookOpen, FiTrendingUp, FiYoutube, FiCode, FiHelpCircle, FiClock, FiTarget } from 'react-icons/fi'
import SearchBar from './SearchBar'
import ProgressTracker from './ProgressTracker'
import { useNotifications } from './NotificationProvider'



interface QuickAction {
  id: string
  title: string
  description: string
  icon: any
  href: string
  color: string
}

const quickActions: QuickAction[] = [
  {
    id: '1',
    title: 'Generate Code',
    description: 'Get AI-powered code examples',
    icon: FiCode,
    href: '#ai-code',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Take Quiz',
    description: 'Test your knowledge',
    icon: FiHelpCircle,
    href: '#quizzes',
    color: 'bg-green-500'
  },
  {
    id: '3',
    title: 'Watch Videos',
    description: 'Learn from YouTube channels',
    icon: FiYoutube,
    href: '#youtube',
    color: 'bg-red-500'
  },
  {
    id: '4',
    title: 'Explore Trends',
    description: 'Discover trending tools',
    icon: FiTrendingUp,
    href: '#trending',
    color: 'bg-purple-500'
  }
]

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { showSuccess, showInfo } = useNotifications()

  const handleQuickAction = (action: QuickAction) => {
    showSuccess('Action Started', `Opening ${action.title}...`)
    // Here you would navigate to the specific section
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 rounded-3xl shadow-2xl p-8 mb-8 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-extrabold text-white drop-shadow-lg tracking-tight">Quick Actions</h2>
                <button className="text-sm font-semibold text-white bg-primary px-4 py-2 rounded shadow hover:bg-primary/90 transition-colors">View All</button>
              </div>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.id}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    onClick={() => handleQuickAction(action)}
                    className={`relative flex flex-col items-center justify-center rounded-3xl p-8 cursor-pointer group bg-gradient-to-br ${action.color} from-white/20 via-white/10 to-transparent shadow-2xl ring-2 ring-blue-400/60 hover:ring-4 hover:ring-blue-300/80 hover:scale-105 hover:shadow-2xl transition-all duration-200 min-h-[180px] overflow-hidden h-40 backdrop-blur-md`}
                    style={{ minWidth: 0 }}
                  >
                    {/* Animated Icon Accent */}
                    <span className="absolute -top-3 -right-3 w-8 h-8 bg-white/20 rounded-full blur-md animate-pulse z-0" />
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4 shadow-lg">
                      <action.icon className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2 text-center drop-shadow">{action.title}</h3>
                    <p className="text-base text-white/80 text-center font-medium">{action.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/70 dark:bg-gray-900/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { title: 'Completed React Hooks Quiz', time: '2 hours ago', score: '95%', type: 'Quiz', color: 'bg-green-100 text-green-700', icon: '📝' },
                  { title: 'Generated TypeScript Code Example', time: '4 hours ago', type: 'Code', color: 'bg-blue-100 text-blue-700', icon: '💻' },
                  { title: 'Watched Next.js Tutorial', time: '1 day ago', type: 'Video', color: 'bg-red-100 text-red-700', icon: '🎬' },
                  { title: 'Explored Tailwind CSS Trends', time: '2 days ago', type: 'Trend', color: 'bg-purple-100 text-purple-700', icon: '📈' }
                ].map((activity, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors border border-gray-100 dark:border-gray-700 shadow-sm ${activity.color}`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full text-xl bg-white/80 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                    {activity.score && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-200 text-green-800 ml-2">{activity.score}</span>
                    )}
                    <span className="text-xs px-3 py-1 rounded-full font-semibold border border-gray-300 dark:border-gray-600 ml-2">{activity.type}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Progress Tracker */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ProgressTracker />
            </motion.div>

            {/* Today's Goals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Goals</h3>
              <div className="space-y-4">
                {[
                  { label: 'Topics Covered', current: 2, target: 3, unit: '' },
                  { label: 'Quizzes Taken', current: 1, target: 2, unit: '' }
                ].map((goal, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-400">{goal.label}</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Learning Tip Card (modern, clean) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-5 flex items-center gap-3 max-w-full"
            >
              <span className="text-yellow-400 text-2xl">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 0 1 6 6c0 2.5-1.5 4.5-3.5 5.5V16a2.5 2.5 0 0 1-5 0v-2.5C5.5 12.5 4 10.5 4 8a6 6 0 0 1 6-6zm-1 14a1 1 0 1 0 2 0h-2z" /></svg>
              </span>
              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-gray-200 mb-1">Learning Tip</div>
                <div className="text-sm text-gray-700 dark:text-gray-300 italic font-medium">
                  "Break down complex topics into smaller, manageable chunks. This helps with retention and makes learning more enjoyable."
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>


    </div>
  )
}