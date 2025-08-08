'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiUser,
  FiTarget,
  FiClock,
  FiBook,
  FiCode,
  FiAward,
  FiCheck,
  FiX,
  FiArrowRight,
  FiArrowLeft,
  FiStar,
  FiTrendingUp,
  FiZap,
  FiHeart,
  FiSettings,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiHelpCircle,
  FiInfo,
  FiCheckCircle,
  FiGift,
  FiRocket,
  FiBrain,
  FiRegLightbulb
} from 'react-icons/fi'
import { FaRobot, FaBrain, FaRegLightbulb, FaTrophy, FaFire, FaGraduationCap, FaUsers, FaBookOpen, FaCode, FaChartLine } from 'react-icons/fa'

interface OnboardingStep {
  id: string
  title: string
  description: string
  type: 'welcome' | 'profile' | 'goals' | 'preferences' | 'demo' | 'completion'
  component: React.ReactNode
  isCompleted: boolean
}

interface UserProfile {
  experience: string
  interests: string[]
  goals: string[]
  timeCommitment: string
  learningStyle: string
  preferredTopics: string[]
}

interface ProgressiveOnboardingProps {
  userId: string
  isOpen: boolean
  onComplete: () => void
  onSkip: () => void
}

export default function ProgressiveOnboarding({
  userId,
  isOpen,
  onComplete,
  onSkip
}: ProgressiveOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    experience: '',
    interests: [],
    goals: [],
    timeCommitment: '',
    learningStyle: '',
    preferredTopics: []
  })
  const [progress, setProgress] = useState(0)
  const [showTips, setShowTips] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner', description: 'New to programming', icon: <FiUser className="w-5 h-5" /> },
    { value: 'intermediate', label: 'Intermediate', description: 'Some programming experience', icon: <FiCode className="w-5 h-5" /> },
    { value: 'advanced', label: 'Advanced', description: 'Experienced developer', icon: <FiAward className="w-5 h-5" /> }
  ]

  const interestOptions = [
    { value: 'frontend', label: 'Frontend Development', icon: <FiCode className="w-4 h-4" /> },
    { value: 'backend', label: 'Backend Development', icon: <FiSettings className="w-4 h-4" /> },
    { value: 'mobile', label: 'Mobile Development', icon: <FiPlay className="w-4 h-4" /> },
    { value: 'data-science', label: 'Data Science & AI', icon: <FaBrain className="w-4 h-4" /> },
    { value: 'devops', label: 'DevOps & Cloud', icon: <FiTrendingUp className="w-4 h-4" /> },
    { value: 'cybersecurity', label: 'Cybersecurity', icon: <FiZap className="w-4 h-4" /> }
  ]

  const goalOptions = [
    { value: 'career-change', label: 'Career Change', description: 'Switch to tech industry', icon: <FiTarget className="w-4 h-4" /> },
    { value: 'skill-upgrade', label: 'Skill Upgrade', description: 'Improve existing skills', icon: <FiTrendingUp className="w-4 h-4" /> },
    { value: 'personal-project', label: 'Personal Projects', description: 'Build your own apps', icon: <FiCode className="w-4 h-4" /> },
    { value: 'freelance', label: 'Freelance Work', description: 'Start freelancing', icon: <FiUser className="w-4 h-4" /> },
    { value: 'academic', label: 'Academic', description: 'For studies or research', icon: <FiBook className="w-4 h-4" /> }
  ]

  const timeOptions = [
    { value: '15min', label: '15 minutes/day', description: 'Quick daily sessions' },
    { value: '30min', label: '30 minutes/day', description: 'Moderate learning pace' },
    { value: '1hour', label: '1 hour/day', description: 'Dedicated learning time' },
    { value: '2hours', label: '2+ hours/day', description: 'Intensive learning' }
  ]

  const learningStyleOptions = [
    { value: 'visual', label: 'Visual Learner', description: 'Prefer videos and diagrams', icon: <FiPlay className="w-4 h-4" /> },
    { value: 'hands-on', label: 'Hands-on', description: 'Learn by doing projects', icon: <FiCode className="w-4 h-4" /> },
    { value: 'reading', label: 'Reading', description: 'Prefer articles and docs', icon: <FiBook className="w-4 h-4" /> },
    { value: 'interactive', label: 'Interactive', description: 'Quizzes and challenges', icon: <FiAward className="w-4 h-4" /> }
  ]

  // Load onboarding progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`onboarding_${userId}`)
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress)
      setCurrentStep(parsed.currentStep || 0)
      setUserProfile(parsed.userProfile || userProfile)
      setProgress(parsed.progress || 0)
    }
  }, [userId])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(`onboarding_${userId}`, JSON.stringify({
      currentStep,
      userProfile,
      progress
    }))
  }, [currentStep, userProfile, progress, userId])

  // Update progress based on current step
  useEffect(() => {
    const totalSteps = 5
    setProgress(((currentStep + 1) / totalSteps) * 100)
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < 4) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(prev => prev - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const handleComplete = () => {
    // Save completed onboarding
    localStorage.setItem(`onboarding_completed_${userId}`, 'true')
    onComplete()
  }

  const handleSkip = () => {
    onSkip()
  }

  const updateUserProfile = (field: keyof UserProfile, value: any) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const toggleInterest = (interest: string) => {
    setUserProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const toggleGoal = (goal: string) => {
    setUserProfile(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const toggleTopic = (topic: string) => {
    setUserProfile(prev => ({
      ...prev,
      preferredTopics: prev.preferredTopics.includes(topic)
        ? prev.preferredTopics.filter(t => t !== topic)
        : [...prev.preferredTopics, topic]
    }))
  }

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
            >
              <FaRocket className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to AI CodeLearner! 🚀
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's personalize your learning experience. This quick setup will help us create the perfect learning path for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <FaBrain className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Learning</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Personalized recommendations and adaptive content</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                <FaGraduationCap className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interactive Experience</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Quizzes, challenges, and hands-on projects</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <FaUsers className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Connect with fellow learners and mentors</p>
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              What's your programming experience level?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {experienceOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateUserProfile('experience', option.value)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    userProfile.experience === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      userProfile.experience === option.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {option.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{option.label}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              What interests you most?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
              Select all that apply. We'll tailor your learning path accordingly.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interestOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleInterest(option.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    userProfile.interests.includes(option.value)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      userProfile.interests.includes(option.value)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {option.icon}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{option.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              What are your learning goals?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {goalOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleGoal(option.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    userProfile.goals.includes(option.value)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      userProfile.goals.includes(option.value)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {option.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{option.label}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{option.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                How much time can you dedicate to learning?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {timeOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateUserProfile('timeCommitment', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      userProfile.timeCommitment === option.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{option.label}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              How do you prefer to learn?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {learningStyleOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateUserProfile('learningStyle', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    userProfile.learningStyle === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      userProfile.learningStyle === option.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {option.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{option.label}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Personalized Learning Path
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <FaBrain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">AI Recommendations</span>
                </div>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p>• {userProfile.experience === 'beginner' ? 'Start with fundamentals' : 'Focus on advanced concepts'}</p>
                  <p>• {userProfile.interests.length > 0 ? `Prioritize ${userProfile.interests[0]} content` : 'Explore diverse topics'}</p>
                  <p>• {userProfile.timeCommitment === '15min' ? 'Quick daily sessions' : 'Dedicated learning blocks'}</p>
                  <p>• {userProfile.learningStyle === 'visual' ? 'Video-focused content' : 'Hands-on projects and exercises'}</p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true
      case 1: return userProfile.experience !== ''
      case 2: return userProfile.interests.length > 0
      case 3: return userProfile.goals.length > 0 && userProfile.timeCommitment !== ''
      case 4: return userProfile.learningStyle !== ''
      default: return false
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <FaBrain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    AI Learning Setup
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Step {currentStep + 1} of 5
                  </p>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Progress
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: isAnimating ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isAnimating ? -20 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {getStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {showTips && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                  >
                    <FiRegLightbulb className="w-4 h-4" />
                    <span>Pro tip: Be honest for better recommendations!</span>
                  </motion.div>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {currentStep === 4 ? (
                  <>
                    <span>Complete Setup</span>
                    <FiCheck className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <FiArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
