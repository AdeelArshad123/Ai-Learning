'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiAward,
  FiStar,
  FiTrendingUp,
  FiTarget,
  FiZap,
  FiHeart,
  FiGift,
  FiCrown,
  FiCheckCircle,
  FiClock,
  FiBook,
  FiCode,
  FiUsers,
  FiFire,
  FiRocket,
  FiBrain,
  FiLightbulb,
  FiSettings,
  FiX,
  FiArrowRight,
  FiArrowLeft,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiHelpCircle,
  FiInfo
} from 'react-icons/fi'
import { FaRobot, FaBrain, FaRegLightbulb, FaTrophy, FaFire, FaGraduationCap, FaUsers, FaBookOpen, FaCode, FaChartLine, FaCrown, FaGem, FaMedal, FaAward, FaStar, FaHeart, FaRocket, FaZap, FaTarget, FaCheckCircle } from 'react-icons/fa'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: 'learning' | 'streak' | 'milestone' | 'social' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xpReward: number
  isUnlocked: boolean
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
}

interface UserStats {
  level: number
  xp: number
  totalXp: number
  streak: number
  maxStreak: number
  topicsCompleted: number
  quizzesTaken: number
  averageScore: number
  studyTime: number
  achievements: string[]
  rank: string
  points: number
}

interface LeaderboardEntry {
  id: string
  name: string
  level: number
  xp: number
  rank: number
  avatar: string
  streak: number
  achievements: number
}

interface AIGamificationSystemProps {
  userId: string
  onAchievementUnlocked: (achievement: Achievement) => void
  onLevelUp: (newLevel: number) => void
}

export default function AIGamificationSystem({
  userId,
  onAchievementUnlocked,
  onLevelUp
}: AIGamificationSystemProps) {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 5,
    xp: 1250,
    totalXp: 8500,
    streak: 7,
    maxStreak: 12,
    topicsCompleted: 15,
    quizzesTaken: 23,
    averageScore: 78.5,
    studyTime: 47.5,
    achievements: ['first-step', 'streak-7', 'milestone-10', 'perfect-score'],
    rank: 'Silver',
    points: 2840
  })

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-step',
      title: 'First Steps',
      description: 'Complete your first learning session',
      icon: <FiTarget className="w-6 h-6" />,
      category: 'learning',
      rarity: 'common',
      xpReward: 50,
      isUnlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 7)
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: <FaFire className="w-6 h-6" />,
      category: 'streak',
      rarity: 'rare',
      xpReward: 200,
      isUnlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 2)
    },
    {
      id: 'milestone-10',
      title: 'Topic Master',
      description: 'Complete 10 learning topics',
      icon: <FiBook className="w-6 h-6" />,
      category: 'milestone',
      rarity: 'epic',
      xpReward: 500,
      isUnlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 5)
    },
    {
      id: 'perfect-score',
      title: 'Perfect Score',
      description: 'Get 100% on any quiz',
      icon: <FaStar className="w-6 h-6" />,
      category: 'learning',
      rarity: 'rare',
      xpReward: 150,
      isUnlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 1)
    },
    {
      id: 'streak-30',
      title: 'Monthly Master',
      description: 'Maintain a 30-day learning streak',
      icon: <FaCrown className="w-6 h-6" />,
      category: 'streak',
      rarity: 'legendary',
      xpReward: 1000,
      isUnlocked: false,
      progress: 7,
      maxProgress: 30
    },
    {
      id: 'speed-learner',
      title: 'Speed Learner',
      description: 'Complete 5 topics in one day',
      icon: <FiZap className="w-6 h-6" />,
      category: 'learning',
      rarity: 'epic',
      xpReward: 300,
      isUnlocked: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: 'social-butterfly',
      title: 'Social Butterfly',
      description: 'Help 10 other learners',
      icon: <FiUsers className="w-6 h-6" />,
      category: 'social',
      rarity: 'rare',
      xpReward: 250,
      isUnlocked: false,
      progress: 3,
      maxProgress: 10
    },
    {
      id: 'night-owl',
      title: 'Night Owl',
      description: 'Study for 5 hours after 10 PM',
      icon: <FiClock className="w-6 h-6" />,
      category: 'special',
      rarity: 'epic',
      xpReward: 400,
      isUnlocked: false,
      progress: 2.5,
      maxProgress: 5
    }
  ])

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { id: '1', name: 'Alex Chen', level: 12, xp: 15420, rank: 1, avatar: '👑', streak: 45, achievements: 18 },
    { id: '2', name: 'Sarah Kim', level: 10, xp: 12850, rank: 2, avatar: '⭐', streak: 32, achievements: 15 },
    { id: '3', name: 'Mike Johnson', level: 9, xp: 11200, rank: 3, avatar: '🔥', streak: 28, achievements: 12 },
    { id: '4', name: 'Emma Wilson', level: 8, xp: 9850, rank: 4, avatar: '💎', streak: 25, achievements: 11 },
    { id: '5', name: 'David Lee', level: 7, xp: 8750, rank: 5, avatar: '🚀', streak: 22, achievements: 10 }
  ])

  const [showAchievements, setShowAchievements] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showRewards, setShowRewards] = useState(false)
  const [recentUnlock, setRecentUnlock] = useState<Achievement | null>(null)
  const [levelUpAnimation, setLevelUpAnimation] = useState(false)

  // Load user stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem(`gamification_${userId}`)
    if (savedStats) {
      setUserStats(JSON.parse(savedStats))
    }
  }, [userId])

  // Save user stats to localStorage
  useEffect(() => {
    localStorage.setItem(`gamification_${userId}`, JSON.stringify(userStats))
  }, [userStats, userId])

  // Check for new achievements
  useEffect(() => {
    checkForNewAchievements()
  }, [userStats])

  const checkForNewAchievements = () => {
    const newAchievements: Achievement[] = []

    achievements.forEach(achievement => {
      if (!achievement.isUnlocked) {
        let shouldUnlock = false

        switch (achievement.id) {
          case 'streak-30':
            if (userStats.streak >= 30) shouldUnlock = true
            break
          case 'speed-learner':
            // Simulate progress
            if (achievement.progress && achievement.progress >= (achievement.maxProgress || 0)) shouldUnlock = true
            break
          case 'social-butterfly':
            // Simulate progress
            if (achievement.progress && achievement.progress >= (achievement.maxProgress || 0)) shouldUnlock = true
            break
          case 'night-owl':
            // Simulate progress
            if (achievement.progress && achievement.progress >= (achievement.maxProgress || 0)) shouldUnlock = true
            break
        }

        if (shouldUnlock) {
          newAchievements.push({
            ...achievement,
            isUnlocked: true,
            unlockedAt: new Date()
          })
        }
      }
    })

    if (newAchievements.length > 0) {
      setAchievements(prev => prev.map(achievement => {
        const newAchievement = newAchievements.find(n => n.id === achievement.id)
        return newAchievement || achievement
      }))

      newAchievements.forEach(achievement => {
        unlockAchievement(achievement)
      })
    }
  }

  const unlockAchievement = (achievement: Achievement) => {
    setRecentUnlock(achievement)
    onAchievementUnlocked(achievement)

    // Add XP
    const newXp = userStats.xp + achievement.xpReward
    const newTotalXp = userStats.totalXp + achievement.xpReward
    const newLevel = Math.floor(newTotalXp / 1000) + 1

    setUserStats(prev => ({
      ...prev,
      xp: newXp,
      totalXp: newTotalXp,
      level: newLevel,
      achievements: [...prev.achievements, achievement.id]
    }))

    // Check for level up
    if (newLevel > userStats.level) {
      setLevelUpAnimation(true)
      onLevelUp(newLevel)
      setTimeout(() => setLevelUpAnimation(false), 3000)
    }

    // Hide achievement notification after 5 seconds
    setTimeout(() => setRecentUnlock(null), 5000)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300'
      case 'rare': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300'
      case 'epic': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300'
      case 'legendary': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Bronze': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
      case 'Silver': return 'text-gray-600 bg-gray-100 dark:bg-gray-800'
      case 'Gold': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'Platinum': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'Diamond': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800'
    }
  }

  const getNextLevelXp = () => {
    return (userStats.level + 1) * 1000
  }

  const getXpProgress = () => {
    const currentLevelXp = userStats.level * 1000
    const nextLevelXp = getNextLevelXp()
    const progress = ((userStats.totalXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100
    return Math.min(progress, 100)
  }

  return (
    <>
      {/* Gamification Dashboard */}
      <div className="fixed bottom-6 left-6 z-40">
        <div className="flex flex-col gap-3">
          {/* Level Display */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {userStats.level}
                </div>
                {levelUpAnimation && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center"
                  >
                    <FiStar className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Level {userStats.level}</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getXpProgress()}%` }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {userStats.totalXp} / {getNextLevelXp()} XP
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaFire className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Streak</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{userStats.streak} days</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiBook className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Topics</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{userStats.topicsCompleted}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiAward className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Achievements</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{userStats.achievements.length}</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAchievements(true)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <FiAward className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLeaderboard(true)}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <FiTrendingUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Achievement Unlock Notification */}
      <AnimatePresence>
        {recentUnlock && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${getRarityColor(recentUnlock.rarity)}`}>
                {recentUnlock.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  Achievement Unlocked!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {recentUnlock.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  +{recentUnlock.xpReward} XP
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements Modal */}
      <AnimatePresence>
        {showAchievements && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl">
                    <FiAward className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Achievements
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievements.filter(a => a.isUnlocked).length} of {achievements.length} unlocked
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAchievements(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Achievements Grid */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        achievement.isUnlocked
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-3 rounded-xl ${getRarityColor(achievement.rarity)}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {achievement.title}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRarityColor(achievement.rarity)}`}>
                              {achievement.rarity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {achievement.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              +{achievement.xpReward} XP
                            </span>
                            {achievement.isUnlocked ? (
                              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                <FiCheckCircle className="w-4 h-4" />
                                <span className="text-sm">Unlocked</span>
                              </div>
                            ) : achievement.progress ? (
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ width: `${(achievement.progress / (achievement.maxProgress || 1)) * 100}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {achievement.progress}/{achievement.maxProgress}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Locked
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leaderboard Modal */}
      <AnimatePresence>
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl">
                    <FiAward className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Leaderboard
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Top learners this week
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLeaderboard(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Leaderboard List */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        index === 0
                          ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30'
                          : index === 1
                            ? 'border-gray-400 bg-gray-50 dark:bg-gray-900/30'
                            : index === 2
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                            <span className="text-lg">{entry.avatar}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {entry.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Level {entry.level} • {entry.xp} XP
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              #{entry.rank}
                            </span>
                            <div className="flex items-center gap-1">
                              <FaFire className="w-4 h-4 text-orange-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {entry.streak}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {entry.achievements} achievements
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
