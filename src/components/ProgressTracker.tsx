'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiTarget, FiTrendingUp, FiBookOpen, FiClock, FiStar, FiZap } from 'react-icons/fi';

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  unlocked: boolean
  progress: number
  maxProgress: number
}

interface LearningStats {
  totalTopics: number
  completedTopics: number
  totalQuizzes: number
  passedQuizzes: number
  totalTime: number // in minutes
  currentStreak: number
  averageScore: number
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first topic',
    icon: FiBookOpen,
    unlocked: true,
    progress: 1,
    maxProgress: 1
  },
  {
    id: '2',
    title: 'Quiz Master',
    description: 'Pass 10 quizzes',
    icon: FiTarget,
    unlocked: false,
    progress: 7,
    maxProgress: 10
  },
  {
    id: '3',
    title: 'Learning Streak',
    description: 'Learn for 7 days in a row',
    icon: FiTrendingUp,
    unlocked: false,
    progress: 5,
    maxProgress: 7
  },
  {
    id: '4',
    title: 'Code Explorer',
    description: 'Generate 20 code examples',
    icon: FiStar,
    unlocked: false,
    progress: 12,
    maxProgress: 20
  },
  {
    id: '5',
    title: 'Perfect Score',
    description: 'Get 100% on a quiz',
    icon: FiAward,
    unlocked: true,
    progress: 1,
    maxProgress: 1
  }
]

const mockStats: LearningStats = {
  totalTopics: 25,
  completedTopics: 8,
  totalQuizzes: 15,
  passedQuizzes: 12,
  totalTime: 420, // 7 hours
  currentStreak: 5,
  averageScore: 87
}

const statCards = [
  { label: 'Topics Completed', key: 'completedTopics', icon: FiBookOpen, color: 'from-blue-400 to-blue-600' },
  { label: 'Quizzes Passed', key: 'passedQuizzes', icon: FiTarget, color: 'from-green-400 to-green-600' },
  { label: 'Total Time', key: 'totalTime', icon: FiClock, color: 'from-purple-400 to-purple-600' },
  { label: 'Avg Score', key: 'averageScore', icon: FiStar, color: 'from-yellow-400 to-yellow-600' },
];

export default function ProgressTracker() {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'stats'>('overview');
  const [userProgress, setUserProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await fetch('/api/user-progress');
        if (response.ok) {
          const data = await response.json();
          setUserProgress(data);
        }
      } catch (error) {
        console.error('Failed to fetch user progress:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProgress();
  }, []);

  const stats = userProgress ? {
    ...mockStats,
    ...userProgress,
  } : mockStats;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md overflow-hidden max-w-md mx-auto p-0"
      style={{ boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.08)' }}
    >
      {/* Header with Progress Ring */}
      <div className="flex items-center gap-4 px-4 pt-4 pb-2 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="relative flex items-center justify-center">
          {/* Animated Progress Ring */}
          <svg width="48" height="48" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" stroke="#e5e7eb" strokeWidth="8" fill="none" />
            <motion.circle
              cx="40" cy="40" r="34"
              stroke="#6366f1"
              strokeWidth="8"
              fill="none"
              strokeDasharray={213.6}
              strokeDashoffset={213.6 - (stats.completedTopics / stats.totalTopics) * 213.6}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 213.6 }}
              animate={{ strokeDashoffset: 213.6 - (stats.completedTopics / stats.totalTopics) * 213.6 }}
              transition={{ duration: 1 }}
            />
            <text x="40" y="46" textAnchor="middle" fontSize="16" fill="#6366f1" fontWeight="bold">
              {Math.round((stats.completedTopics / stats.totalTopics) * 100)}%
            </text>
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">Your Progress</h2>
          <p className="text-xs text-primary font-medium">Track your learning journey</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xl font-bold text-primary">{stats.currentStreak}</span>
            <span className="text-xs text-gray-600 dark:text-gray-300">Day Streak</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 px-4 py-3">
        {statCards.map((card, idx) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.1 }}
            className={`rounded-lg p-2 flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm`}
          >
            <card.icon className="text-lg" />
            <div>
              <div className="text-base font-bold">
                {card.key === 'totalTime' ? formatTime(stats[card.key]) : stats[card.key]}
                {card.key === 'averageScore' ? '%' : ''}
              </div>
              <div className="text-xs font-medium opacity-80">{card.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-1 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-2 pt-2">
        {[
          { id: 'overview', label: 'Overview', icon: FiTrendingUp },
          { id: 'achievements', label: 'Achievements', icon: FiAward },
          { id: 'stats', label: 'Statistics', icon: FiTarget }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded font-semibold transition-all duration-150 text-sm focus:outline-none
              ${activeTab === tab.id
                ? 'bg-primary text-white shadow'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20'}
            `}
            style={{ minWidth: 80 }}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-inner p-4 m-3 mt-2 min-h-[60px] border border-gray-100 dark:border-gray-800"
      >
        {activeTab === 'overview' && (
          <div>
            <div className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-1">Keep up the great work! 🚀</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">You are making steady progress. Stay consistent and keep learning every day.</div>
          </div>
        )}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 gap-2">
            {mockAchievements.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-lg p-3 flex items-center gap-2 shadow border ${achievement.unlocked ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-900 dark:text-green-100' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200'}`}
              >
                <achievement.icon className={`text-xl ${achievement.unlocked ? 'text-green-600 dark:text-green-200' : 'text-gray-400'}`} />
                <div>
                  <div className="font-bold text-sm">{achievement.title}</div>
                  <div className="text-xs opacity-80">{achievement.description}</div>
                </div>
                {achievement.unlocked && (
                  <span className="ml-auto text-xs font-bold bg-green-100 dark:bg-green-800/40 px-2 py-0.5 rounded">Unlocked</span>
                )}
              </motion.div>
            ))}
          </div>
        )}
        {activeTab === 'stats' && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Average Score:</span>
              <span className="text-base font-bold text-blue-600">{stats.averageScore}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Longest Streak:</span>
              <span className="text-base font-bold text-purple-600">{stats.currentStreak} days</span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
} 