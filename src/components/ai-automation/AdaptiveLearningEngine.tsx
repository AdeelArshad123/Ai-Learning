'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaBrain, 
  FaRoute, 
  FaChartLine, 
  FaClock, 
  FaTarget,
  FaUser,
  FaLightbulb,
  FaGraduationCap,
  FaAward,
  FaPlay,
  FaPause,
  FaForward
} from 'react-icons/fa'
import { SkillLevel, LearningStyle } from '../../types/ai-automation'

interface LearningPath {
  id: string
  title: string
  description: string
  estimatedDuration: number
  difficulty: SkillLevel
  progress: number
  topics: string[]
  nextMilestone: string
}

interface SkillGap {
  skill: string
  currentLevel: number
  targetLevel: number
  priority: 'high' | 'medium' | 'low'
  estimatedTime: number
}

interface StudyRecommendation {
  time: string
  duration: number
  topic: string
  reason: string
}

interface AdaptiveLearningEngineProps {
  className?: string
}

export default function AdaptiveLearningEngine({ className = '' }: AdaptiveLearningEngineProps) {
  const [userProfile, setUserProfile] = useState({
    skillLevel: SkillLevel.INTERMEDIATE,
    learningStyle: LearningStyle.VISUAL,
    preferredLanguages: ['JavaScript', 'React'],
    weakAreas: ['Algorithms', 'System Design'],
    strongAreas: ['Frontend Development', 'UI/UX'],
    goals: ['Master React', 'Learn Node.js']
  })

  const [learningPath, setLearningPath] = useState<LearningPath>({
    id: 'path-1',
    title: 'Full Stack JavaScript Developer',
    description: 'Comprehensive path from frontend to backend mastery',
    estimatedDuration: 12, // weeks
    difficulty: SkillLevel.INTERMEDIATE,
    progress: 35,
    topics: ['Advanced React', 'Node.js Fundamentals', 'Database Design', 'API Development'],
    nextMilestone: 'Complete React Advanced Patterns'
  })

  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([
    {
      skill: 'Algorithms & Data Structures',
      currentLevel: 40,
      targetLevel: 80,
      priority: 'high',
      estimatedTime: 6 // weeks
    },
    {
      skill: 'System Design',
      currentLevel: 25,
      targetLevel: 70,
      priority: 'medium',
      estimatedTime: 8
    },
    {
      skill: 'Backend Development',
      currentLevel: 60,
      targetLevel: 85,
      priority: 'high',
      estimatedTime: 4
    }
  ])

  const [studyRecommendations, setStudyRecommendations] = useState<StudyRecommendation[]>([
    {
      time: '09:00 AM',
      duration: 45,
      topic: 'React Advanced Patterns',
      reason: 'Peak focus time for complex concepts'
    },
    {
      time: '02:00 PM',
      duration: 30,
      topic: 'Algorithm Practice',
      reason: 'Good time for problem-solving practice'
    },
    {
      time: '07:00 PM',
      duration: 60,
      topic: 'Node.js Project Work',
      reason: 'Hands-on coding when energy is moderate'
    }
  ])

  const [isGeneratingPath, setIsGeneratingPath] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState('')

  const generateNewPath = async () => {
    setIsGeneratingPath(true)
    
    // Simulate AI path generation
    setTimeout(() => {
      const newPath: LearningPath = {
        id: 'path-2',
        title: `Personalized ${selectedGoal || 'Development'} Path`,
        description: 'AI-generated path based on your current skills and goals',
        estimatedDuration: Math.floor(Math.random() * 8) + 8, // 8-16 weeks
        difficulty: userProfile.skillLevel,
        progress: 0,
        topics: [
          'Foundation Building',
          'Core Concepts',
          'Practical Projects',
          'Advanced Topics'
        ],
        nextMilestone: 'Complete Foundation Module'
      }
      
      setLearningPath(newPath)
      setIsGeneratingPath(false)
    }, 2000)
  }

  const getLearningStyleIcon = (style: LearningStyle) => {
    switch (style) {
      case LearningStyle.VISUAL: return '👁️'
      case LearningStyle.AUDITORY: return '🎧'
      case LearningStyle.KINESTHETIC: return '✋'
      case LearningStyle.READING_WRITING: return '📝'
      default: return '🧠'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-100 dark:bg-red-900/30'
      case 'medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30'
      case 'low': return 'text-green-500 bg-green-100 dark:bg-green-900/30'
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
          <FaBrain className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Adaptive Learning Engine</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Personalized learning paths with AI optimization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile & Settings */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FaUser className="text-purple-500 w-4 h-4" />
              Learning Profile
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Skill Level</label>
                <select
                  value={userProfile.skillLevel}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, skillLevel: e.target.value as SkillLevel }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {Object.values(SkillLevel).map(level => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Learning Style</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {Object.values(LearningStyle).map(style => (
                    <button
                      key={style}
                      onClick={() => setUserProfile(prev => ({ ...prev, learningStyle: style }))}
                      className={`p-2 rounded-lg text-xs font-medium transition-all ${
                        userProfile.learningStyle === style
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">{getLearningStyleIcon(style)}</div>
                        <div>{style.replace('_', ' ')}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Goals</label>
                <div className="mt-2 space-y-1">
                  {userProfile.goals.map((goal, index) => (
                    <div key={index} className="flex items-center gap-2 px-2 py-1 bg-white dark:bg-gray-700 rounded text-sm">
                      <FaTarget className="text-purple-500 w-3 h-3" />
                      <span className="text-gray-700 dark:text-gray-300">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <input
              type="text"
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              placeholder="Enter new learning goal..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
            <button
              onClick={generateNewPath}
              disabled={isGeneratingPath}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 transition-all"
            >
              {isGeneratingPath ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FaRoute className="w-4 h-4" />
                  Generate New Path
                </>
              )}
            </button>
          </div>
        </div>

        {/* Learning Path */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FaRoute className="text-blue-500 w-4 h-4" />
              Current Learning Path
            </h4>
            
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{learningPath.title}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{learningPath.description}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium text-gray-900 dark:text-white">{learningPath.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${learningPath.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg">
                  <FaClock className="text-blue-500 w-4 h-4 mx-auto mb-1" />
                  <div className="font-medium text-gray-900 dark:text-white">{learningPath.estimatedDuration}w</div>
                  <div className="text-gray-500 dark:text-gray-400">Duration</div>
                </div>
                <div className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg">
                  <FaGraduationCap className="text-green-500 w-4 h-4 mx-auto mb-1" />
                  <div className="font-medium text-gray-900 dark:text-white">{learningPath.difficulty}</div>
                  <div className="text-gray-500 dark:text-gray-400">Level</div>
                </div>
              </div>

              <div>
                <h6 className="font-medium text-gray-900 dark:text-white mb-2">Next Milestone</h6>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FaAward className="text-yellow-500 w-4 h-4" />
                    <span className="text-sm text-yellow-800 dark:text-yellow-300">{learningPath.nextMilestone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Study Recommendations */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FaClock className="text-green-500 w-4 h-4" />
              Today's Study Plan
            </h4>
            
            <div className="space-y-2">
              {studyRecommendations.map((rec, index) => (
                <div key={index} className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">{rec.time}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{rec.duration}m</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">{rec.topic}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{rec.reason}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Gap Analysis */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FaChartLine className="text-orange-500 w-4 h-4" />
              Skill Gap Analysis
            </h4>
            
            <div className="space-y-3">
              {skillGaps.map((gap, index) => (
                <div key={index} className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{gap.skill}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(gap.priority)}`}>
                      {gap.priority}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Current: {gap.currentLevel}%</span>
                      <span>Target: {gap.targetLevel}%</span>
                    </div>
                    
                    <div className="relative w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gray-400 h-2 rounded-full"
                        style={{ width: `${gap.currentLevel}%` }}
                      />
                      <div
                        className="absolute top-0 bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full opacity-30"
                        style={{ width: `${gap.targetLevel}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">
                        Gap: {gap.targetLevel - gap.currentLevel}%
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        ~{gap.estimatedTime}w to close
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FaLightbulb className="text-indigo-500 w-4 h-4" />
              AI Insights
            </h4>
            
            <div className="space-y-2">
              <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  🎯 <strong>Focus Area:</strong> Your visual learning style suggests interactive coding exercises would be most effective.
                </div>
              </div>
              
              <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  ⏰ <strong>Optimal Time:</strong> Morning sessions (9-11 AM) show 23% better retention for complex topics.
                </div>
              </div>
              
              <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  📈 <strong>Progress Trend:</strong> You're 15% ahead of similar learners. Consider advancing to intermediate algorithms.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}