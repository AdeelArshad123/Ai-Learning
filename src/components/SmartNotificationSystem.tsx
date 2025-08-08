'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiBell,
  FiX,
  FiCheck,
  FiClock,
  FiAward,
  FiBook,
  FiCode,
  FiTrendingUp,
  FiTarget,
  FiZap,
  FiStar,
  FiHeart,
  FiMessageCircle,
  FiPlay,
  FiPause,
  FiSettings,
  FiVolume2,
  FiVolumeX,
  FiCalendar,
  FiAlertCircle,
  FiInfo,
  FiCheckCircle,
  FiArrowRight,
  FiUsers,
  FiGift
} from 'react-icons/fi'
import { FaRobot, FaBrain, FaRegLightbulb, FaTrophy, FaFire } from 'react-icons/fa'

interface UserProgress {
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
  achievements: string[]
}

interface Notification {
  id: string
  type: 'reminder' | 'achievement' | 'suggestion' | 'milestone' | 'motivation' | 'alert'
  title: string
  message: string
  priority: 'low' | 'medium' | 'high'
  action?: string
  actionData?: any
  timestamp: Date
  read: boolean
  sound?: boolean
  icon?: React.ReactNode
  color?: string
}

interface SmartNotificationSystemProps {
  userId: string
  userProgress: UserProgress
  onNotificationAction: (action: string, data?: any) => void
}

export default function SmartNotificationSystem({
  userId,
  userProgress,
  onNotificationAction
}: SmartNotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [quietHours, setQuietHours] = useState({ enabled: false, start: '22:00', end: '08:00' })
  const [lastNotificationTime, setLastNotificationTime] = useState<Date>(new Date())
  const [notificationSettings, setNotificationSettings] = useState({
    reminders: true,
    achievements: true,
    suggestions: true,
    milestones: true,
    motivation: true
  })

  const notificationRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Load notifications from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem(`notifications_${userId}`)
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }
  }, [userId])

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem(`notifications_${userId}`, JSON.stringify(notifications))
    setUnreadCount(notifications.filter(n => !n.read).length)
  }, [notifications, userId])

  // Generate smart notifications based on user progress
  useEffect(() => {
    const generateSmartNotifications = () => {
      const newNotifications: Notification[] = []
      const now = new Date()

      // Check if enough time has passed since last notification
      const timeSinceLastNotification = now.getTime() - lastNotificationTime.getTime()
      if (timeSinceLastNotification < 300000) return // 5 minutes minimum

      // Streak-based notifications
      if (userProgress.currentStreak >= 7) {
        newNotifications.push({
          id: `streak-${Date.now()}`,
          type: 'achievement',
          title: '🔥 Amazing Streak!',
          message: `You've maintained a ${userProgress.currentStreak}-day learning streak! Keep up the momentum!`,
          priority: 'high',
          action: 'view-achievements',
          timestamp: now,
          read: false,
          sound: true,
          icon: <FaFire className="w-5 h-5" />,
          color: 'bg-orange-500'
        })
      }

      // Progress-based notifications
      if (userProgress.completedTopics >= 10) {
        newNotifications.push({
          id: `milestone-${Date.now()}`,
          type: 'milestone',
          title: '🎯 Milestone Reached!',
          message: `Congratulations! You've completed ${userProgress.completedTopics} topics. You're making excellent progress!`,
          priority: 'medium',
          action: 'view-progress',
          timestamp: now,
          read: false,
          sound: true,
          icon: <FiTarget className="w-5 h-5" />,
          color: 'bg-green-500'
        })
      }

      // Performance-based suggestions
      if (userProgress.averageQuizScore < 70) {
        newNotifications.push({
          id: `suggestion-${Date.now()}`,
          type: 'suggestion',
          title: '📚 Learning Tip',
          message: `Your quiz scores are at ${userProgress.averageQuizScore}%. Consider reviewing ${userProgress.improvementAreas[0]} to improve your performance.`,
          priority: 'medium',
          action: 'view-resources',
          actionData: { topic: userProgress.improvementAreas[0] },
          timestamp: now,
          read: false,
          sound: false,
          icon: <FaRegLightbulb className="w-5 h-5" />,
          color: 'bg-blue-500'
        })
      }

      // Motivation notifications
      if (userProgress.engagementScore < 80) {
        newNotifications.push({
          id: `motivation-${Date.now()}`,
          type: 'motivation',
          title: '💪 Stay Motivated!',
          message: 'Your engagement is dropping. Take a quick 5-minute quiz to get back on track!',
          priority: 'low',
          action: 'start-learning',
          timestamp: now,
          read: false,
          sound: false,
          icon: <FiZap className="w-5 h-5" />,
          color: 'bg-purple-500'
        })
      }

      // Time-based reminders
      const hour = now.getHours()
      if (hour >= 9 && hour <= 18) {
        newNotifications.push({
          id: `reminder-${Date.now()}`,
          type: 'reminder',
          title: '⏰ Study Time!',
          message: 'Perfect time for a learning session. Your brain is most active now!',
          priority: 'medium',
          action: 'continue-learning',
          timestamp: now,
          read: false,
          sound: true,
          icon: <FiClock className="w-5 h-5" />,
          color: 'bg-yellow-500'
        })
      }

      // Add new notifications
      if (newNotifications.length > 0) {
        setNotifications(prev => [...newNotifications, ...prev])
        setLastNotificationTime(now)
        
        // Play sound for high priority notifications
        if (soundEnabled && newNotifications.some(n => n.sound)) {
          playNotificationSound()
        }
      }
    }

    // Generate notifications every 30 minutes
    const interval = setInterval(generateSmartNotifications, 1800000)
    return () => clearInterval(interval)
  }, [userProgress, lastNotificationTime, soundEnabled])

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error)
    }
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(n => n.id !== notificationId)
    )
  }

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (notification.action) {
      onNotificationAction(notification.action, notification.actionData)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/30'
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30'
      case 'low': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/30'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <FiClock className="w-5 h-5" />
      case 'achievement': return <FiAward className="w-5 h-5" />
      case 'suggestion': return <FaRegLightbulb className="w-5 h-5" />
      case 'milestone': return <FiTarget className="w-5 h-5" />
      case 'motivation': return <FiZap className="w-5 h-5" />
      case 'alert': return <FiAlertCircle className="w-5 h-5" />
      default: return <FiBell className="w-5 h-5" />
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  return (
    <>
      {/* Hidden audio element for notification sounds */}
      <audio ref={audioRef} preload="auto">
        <source src="/notification-sound.mp3" type="audio/mpeg" />
      </audio>

      {/* Notification Bell */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
        >
          <FiBell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </motion.button>

        {/* Notification Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-12 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <FaBrain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Smart Notifications
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`p-2 rounded-lg transition-colors ${
                      soundEnabled
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                    }`}
                    title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
                  >
                    {soundEnabled ? <FiVolume2 className="w-4 h-4" /> : <FiVolumeX className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Mark all read
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <FiBell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No notifications yet</p>
                    <p className="text-sm mt-2">We'll notify you about your progress and achievements!</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 border-l-4 rounded-lg mb-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                          notification.read
                            ? 'opacity-60'
                            : 'border-l-4'
                        } ${getPriorityColor(notification.priority)}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`p-2 rounded-lg ${notification.color || 'bg-blue-500'} text-white`}>
                              {notification.icon || getTypeIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                {notification.title}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatTimeAgo(notification.timestamp)}
                                </span>
                                {notification.action && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleNotificationClick(notification)
                                    }}
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
                                  >
                                    <span>Action</span>
                                    <FiArrowRight className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{notifications.length} total notifications</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
} 