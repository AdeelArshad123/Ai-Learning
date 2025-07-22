'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaTrophy, FaFire, FaBook, FaCode } from 'react-icons/fa'

interface UserStats {
  totalQuizzes: number
  averageScore: number
  topicsLearned: number
  currentStreak: number
  achievements: string[]
}

export default function UserProfile() {
  const { data: session } = useSession()
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/user-profile')
        if (response.ok) {
          const data = await response.json()
          setUserProfile(data)
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchUserProfile()
    }
  }, [session])

  // Use real data if available, otherwise fallback to mock data
  const userStats: UserStats = userProfile ? {
    totalQuizzes: userProfile.stats?.quizzesTaken || 0,
    averageScore: userProfile.stats?.averageScore || 0,
    topicsLearned: userProfile.stats?.topicsCompleted || 0,
    currentStreak: userProfile.stats?.currentStreak || 0,
    achievements: userProfile.achievements || ['First Quiz', 'Perfect Score', 'Week Warrior', 'JavaScript Master']
  } : {
    totalQuizzes: 24,
    averageScore: 0.85,
    topicsLearned: 8,
    currentStreak: 7,
    achievements: ['First Quiz', 'Perfect Score', 'Week Warrior', 'JavaScript Master']
  }

  if (!session) {
    return null
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg border"
      >
        <div className="animate-pulse space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="h-8 bg-gray-200 rounded w-12 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border"
    >
      <div className="flex items-center gap-4 mb-6">
        <img
          src={session.user?.image || '/default-avatar.png'}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-primary"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{session.user?.name}</h2>
          <p className="text-gray-600">{session.user?.email}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <FaCode className="text-blue-500 text-2xl mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">{userStats.totalQuizzes}</div>
          <div className="text-sm text-blue-600">Quizzes Taken</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <FaBook className="text-green-500 text-2xl mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">{userStats.topicsLearned}</div>
          <div className="text-sm text-green-600">Topics Learned</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <FaFire className="text-yellow-500 text-2xl mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-600">{userStats.currentStreak}</div>
          <div className="text-sm text-yellow-600">Day Streak</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <FaTrophy className="text-purple-500 text-2xl mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-600">{(userStats.averageScore * 100).toFixed(0)}%</div>
          <div className="text-sm text-purple-600">Avg Score</div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Achievements</h3>
        <div className="flex flex-wrap gap-2">
          {userStats.achievements.map((achievement, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              {achievement}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
} 