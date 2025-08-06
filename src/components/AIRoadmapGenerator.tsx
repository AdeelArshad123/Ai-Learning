'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaRobot,
  FaRoute,
  FaGraduationCap,
  FaClock,
  FaCheckCircle,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
  FaUser,
  FaCode,
  FaLaptopCode,
  FaRocket,
  FaSpinner,
  FaDownload,
  FaShare,
  FaStar,
  FaCalendarAlt,
  FaBookOpen,
  FaVideo,
  FaProjectDiagram,
  FaTrophy,
  FaChartLine,
  FaUsers,
  FaLightbulb,
  FaBolt,
  FaBookmark,
  FaYoutube,
  FaBook,
  FaExternalLinkAlt,
  FaDiscord,
  FaReddit,
  FaGithub,
  FaLink,
  FaPlay,
  FaFileAlt
} from 'react-icons/fa'

interface UserProfile {
  name: string
  experience: 'complete-beginner' | 'some-coding' | 'career-change'
  interests: string[]
  goals: string[]
  timeCommitment: string
  preferredLearning: string[]
  background: string
}

interface RoadmapStep {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  type: 'theory' | 'practice' | 'project' | 'assessment'
  resources: {
    type: 'video' | 'article' | 'course' | 'practice' | 'project'
    title: string
    url: string
    duration: string
  }[]
  skills: string[]
  prerequisites: string[]
  isCompleted: boolean
}

interface LearningRoadmap {
  title: string
  description: string
  totalDuration: string
  difficulty: string
  steps: RoadmapStep[]
  milestones: {
    week: number
    title: string
    description: string
    skills: string[]
  }[]
}

export default function AIRoadmapGenerator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    experience: 'complete-beginner',
    interests: [],
    goals: [],
    timeCommitment: '',
    preferredLearning: [],
    background: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedRoadmap, setGeneratedRoadmap] = useState<LearningRoadmap | null>(null)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [userProgress, setUserProgress] = useState({
    totalTimeSpent: 0,
    streakDays: 0,
    skillsLearned: 0,
    projectsCompleted: 0
  })
  const [achievements, setAchievements] = useState<string[]>([])
  const [bookmarkedResources, setBookmarkedResources] = useState<Set<string>>(new Set())

  const experienceOptions = [
    { value: 'complete-beginner', label: 'Complete Beginner', desc: 'Never coded before' },
    { value: 'some-coding', label: 'Some Experience', desc: 'Basic HTML/CSS or simple scripts' },
    { value: 'career-change', label: 'Career Change', desc: 'Professional from another field' }
  ]

  const interestOptions = [
    'Web Development', 'Mobile Apps', 'Data Science', 'AI/Machine Learning', 
    'Game Development', 'Desktop Applications', 'DevOps', 'Cybersecurity',
    'Blockchain', 'IoT', 'Cloud Computing', 'UI/UX Design'
  ]

  const goalOptions = [
    'Get a job as developer', 'Freelance projects', 'Start own business',
    'Build personal projects', 'Career advancement', 'Learn for hobby',
    'Contribute to open source', 'Become full-stack developer'
  ]

  const timeOptions = [
    '1-2 hours/day', '3-4 hours/day', '5-6 hours/day', 'Full-time (8+ hours/day)',
    'Weekends only', 'Flexible schedule'
  ]

  const learningOptions = [
    'Video tutorials', 'Interactive coding', 'Reading documentation',
    'Hands-on projects', 'Live coding sessions', 'Community learning',
    'Structured courses', 'Self-paced learning'
  ]

  const generateRoadmap = async () => {
    setIsGenerating(true)

    try {
      // Call the API to generate personalized roadmap
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile)
      })

      if (response.ok) {
        const data = await response.json()
        setGeneratedRoadmap(data.roadmap)
      } else {
        throw new Error('Failed to generate roadmap')
      }
    } catch (error) {
      console.error('Error generating roadmap:', error)
      // Fallback to mock data
      const roadmap: LearningRoadmap = {
      title: `${userProfile.interests[0] || 'Programming'} Learning Path`,
      description: `Personalized roadmap for ${userProfile.name} to become a ${userProfile.interests[0] || 'developer'} in ${userProfile.timeCommitment}`,
      totalDuration: userProfile.timeCommitment.includes('Full-time') ? '3-4 months' : '6-8 months',
      difficulty: userProfile.experience === 'complete-beginner' ? 'Beginner-Friendly' : 'Progressive',
      steps: [
        {
          id: '1',
          title: 'Programming Fundamentals',
          description: 'Learn basic programming concepts and logic',
          duration: '2-3 weeks',
          difficulty: 'beginner',
          type: 'theory',
          resources: [
            { type: 'video', title: 'Programming Basics Course', url: '#', duration: '10 hours' },
            { type: 'practice', title: 'Coding Exercises', url: '#', duration: '5 hours' }
          ],
          skills: ['Variables', 'Functions', 'Loops', 'Conditionals'],
          prerequisites: [],
          isCompleted: false
        },
        {
          id: '2',
          title: 'Choose Your First Language',
          description: userProfile.interests.includes('Web Development') ? 'Start with JavaScript' : 'Learn Python basics',
          duration: '3-4 weeks',
          difficulty: 'beginner',
          type: 'practice',
          resources: [
            { type: 'course', title: 'JavaScript Fundamentals', url: '#', duration: '20 hours' },
            { type: 'practice', title: 'Coding Challenges', url: '#', duration: '10 hours' }
          ],
          skills: ['Syntax', 'Data Types', 'Functions', 'Objects'],
          prerequisites: ['Programming Fundamentals'],
          isCompleted: false
        },
        {
          id: '3',
          title: 'Build Your First Project',
          description: 'Apply what you learned in a real project',
          duration: '2-3 weeks',
          difficulty: 'intermediate',
          type: 'project',
          resources: [
            { type: 'project', title: 'Personal Portfolio Website', url: '#', duration: '15 hours' },
            { type: 'video', title: 'Project Walkthrough', url: '#', duration: '3 hours' }
          ],
          skills: ['Project Planning', 'Problem Solving', 'Debugging'],
          prerequisites: ['Choose Your First Language'],
          isCompleted: false
        }
      ],
      milestones: [
        {
          week: 4,
          title: 'First Milestone',
          description: 'Complete programming fundamentals',
          skills: ['Basic Programming Logic', 'Problem Solving']
        },
        {
          week: 8,
          title: 'Language Proficiency',
          description: 'Comfortable with chosen programming language',
          skills: ['Language Syntax', 'Basic Projects']
        }
      ]
    }
      setGeneratedRoadmap(roadmap)
    }

    setIsGenerating(false)
    setShowRoadmap(true)
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      generateRoadmap()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setUserProfile({
      name: '',
      experience: 'complete-beginner',
      interests: [],
      goals: [],
      timeCommitment: '',
      preferredLearning: [],
      background: ''
    })
    setGeneratedRoadmap(null)
    setShowRoadmap(false)
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

  const toggleLearning = (learning: string) => {
    setUserProfile(prev => ({
      ...prev,
      preferredLearning: prev.preferredLearning.includes(learning)
        ? prev.preferredLearning.filter(l => l !== learning)
        : [...prev.preferredLearning, learning]
    }))
  }

  const markStepComplete = (stepId: string) => {
    setCompletedSteps(prev => {
      const newCompleted = new Set(prev)
      if (newCompleted.has(stepId)) {
        newCompleted.delete(stepId)
      } else {
        newCompleted.add(stepId)
        // Update progress
        setUserProgress(prev => ({
          ...prev,
          skillsLearned: prev.skillsLearned + 1,
          totalTimeSpent: prev.totalTimeSpent + 30 // Assume 30 min per step
        }))
        // Check for achievements
        checkAchievements(newCompleted.size)
      }
      return newCompleted
    })
  }

  const checkAchievements = (completedCount: number) => {
    const newAchievements = []
    if (completedCount === 1 && !achievements.includes('first-step')) {
      newAchievements.push('first-step')
    }
    if (completedCount === 5 && !achievements.includes('milestone-5')) {
      newAchievements.push('milestone-5')
    }
    if (completedCount === 10 && !achievements.includes('milestone-10')) {
      newAchievements.push('milestone-10')
    }
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements])
    }
  }

  const toggleBookmark = (resourceId: string) => {
    setBookmarkedResources(prev => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(resourceId)) {
        newBookmarks.delete(resourceId)
      } else {
        newBookmarks.add(resourceId)
      }
      return newBookmarks
    })
  }

  const calculateProgress = () => {
    if (!generatedRoadmap) return 0
    return Math.round((completedSteps.size / generatedRoadmap.steps.length) * 100)
  }

  if (showRoadmap && generatedRoadmap) {
    const progressPercentage = calculateProgress()

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <FaRoute className="text-3xl text-blue-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Learning Roadmap
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {generatedRoadmap.description}
          </p>
        </div>

        {/* Progress & Stats Dashboard - Horizontal Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Progress */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <FaChartLine className="text-blue-500" />
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">PROGRESS</span>
            </div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{progressPercentage}%</div>
            <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Time Spent */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <FaClock className="text-green-500" />
              <span className="text-xs text-green-600 dark:text-green-400 font-semibold">TIME</span>
            </div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{userProgress.totalTimeSpent}h</div>
            <div className="text-xs text-green-600 dark:text-green-400">Total learning time</div>
          </div>

          {/* Skills Learned */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <FaLightbulb className="text-purple-500" />
              <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">SKILLS</span>
            </div>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{completedSteps.size}</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">Steps completed</div>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <FaTrophy className="text-yellow-500" />
              <span className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold">BADGES</span>
            </div>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{achievements.length}</div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400">Achievements earned</div>
          </div>
        </div>

        {/* Compact Action Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={resetForm}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 text-sm"
          >
            <FaArrowRight className="rotate-180 w-3 h-3" />
            New Roadmap
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm">
            <FaDownload className="w-3 h-3" />
            Export PDF
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 text-sm">
            <FaShare className="w-3 h-3" />
            Share
          </button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 text-sm">
            <FaBookmark className="w-3 h-3" />
            Save Progress
          </button>
        </div>

        {/* Compact Roadmap Steps - Horizontal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {generatedRoadmap.steps.map((step, index) => {
            const isCompleted = completedSteps.has(step.id)
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 transition-all ${
                  isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-blue-500'
                }`}
              >
                {/* Compact Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {step.duration}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      step.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      step.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {step.difficulty}
                    </span>
                  </div>
                </div>

                {/* Compact Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {step.description}
                </p>

                {/* Horizontal Skills & Resources Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {/* Skills */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Skills:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {step.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {step.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                          +{step.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Resources Count */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Resources:
                    </h4>
                    <div className="flex items-center gap-2">
                      {step.resources.slice(0, 2).map((resource, resourceIndex) => {
                        const ResourceIcon = resource.type === 'video' ? FaVideo :
                                           resource.type === 'course' ? FaBookOpen :
                                           resource.type === 'project' ? FaProjectDiagram : FaCode
                        return (
                          <div
                            key={resourceIndex}
                            className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-600 rounded text-xs border border-gray-200 dark:border-gray-500"
                          >
                            <ResourceIcon className="text-blue-500 w-3 h-3" />
                            <span className="text-gray-700 dark:text-gray-300 truncate max-w-20">
                              {resource.title}
                            </span>
                            <button
                              onClick={() => toggleBookmark(`${step.id}-${resourceIndex}`)}
                              className={`ml-1 ${bookmarkedResources.has(`${step.id}-${resourceIndex}`) ? 'text-yellow-500' : 'text-gray-400'}`}
                            >
                              <FaBookmark className="w-3 h-3" />
                            </button>
                          </div>
                        )
                      })}
                      {step.resources.length > 2 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{step.resources.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Compact Action Button */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => markStepComplete(step.id)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors text-sm ${
                      isCompleted
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <FaCheckCircle className="w-3 h-3" />
                    {isCompleted ? 'Completed' : 'Mark Complete'}
                  </button>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {index + 1}/{generatedRoadmap.steps.length}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Comprehensive Learning Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
              <FaGraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Complete Learning Resources
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Curated resources to accelerate your learning journey
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* YouTube Channels */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <FaYoutube className="w-5 h-5 text-red-500" />
                <h4 className="font-semibold text-gray-900 dark:text-white">Top YouTube Channels</h4>
              </div>
              <div className="space-y-3">
                {generatedRoadmap.steps
                  .filter(step => step.learningResources?.youtubeChannels)
                  .slice(0, 2)
                  .flatMap(step => step.learningResources!.youtubeChannels.slice(0, 3))
                  .map((channel, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <FaYoutube className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <a
                          href={channel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 dark:text-blue-400 hover:underline block truncate"
                        >
                          {channel.name}
                        </a>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {channel.description}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {channel.subscribers} subscribers
                        </span>
                      </div>
                      <FaExternalLinkAlt className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    </div>
                  ))}
              </div>
            </div>

            {/* Documentation & Books */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <FaBook className="w-5 h-5 text-blue-500" />
                <h4 className="font-semibold text-gray-900 dark:text-white">Documentation & Books</h4>
              </div>
              <div className="space-y-3">
                {generatedRoadmap.steps
                  .filter(step => step.learningResources?.documentation || step.learningResources?.books)
                  .slice(0, 2)
                  .flatMap(step => [
                    ...(step.learningResources?.documentation?.slice(0, 2) || []).map(doc => ({ ...doc, type: 'doc' })),
                    ...(step.learningResources?.books?.slice(0, 1) || []).map(book => ({ ...book, type: 'book', name: book.title, url: book.url || '#' }))
                  ])
                  .slice(0, 4)
                  .map((resource, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      {resource.type === 'doc' ? (
                        <FaFileAlt className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                      ) : (
                        <FaBook className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 dark:text-blue-400 hover:underline block truncate"
                        >
                          {resource.name}
                        </a>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {resource.description}
                        </p>
                        {resource.type === 'book' && 'free' in resource && resource.free && (
                          <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded mt-1">
                            Free
                          </span>
                        )}
                      </div>
                      <FaExternalLinkAlt className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    </div>
                  ))}
              </div>
            </div>

            {/* Practice Websites */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <FaCode className="w-5 h-5 text-green-500" />
                <h4 className="font-semibold text-gray-900 dark:text-white">Practice Platforms</h4>
              </div>
              <div className="space-y-3">
                {generatedRoadmap.steps
                  .filter(step => step.learningResources?.practiceWebsites)
                  .slice(0, 2)
                  .flatMap(step => step.learningResources!.practiceWebsites.slice(0, 2))
                  .map((site, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <FaCode className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 dark:text-blue-400 hover:underline block truncate"
                        >
                          {site.name}
                        </a>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {site.description}
                        </p>
                        <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded mt-1">
                          {site.difficulty}
                        </span>
                      </div>
                      <FaExternalLinkAlt className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    </div>
                  ))}
              </div>
            </div>

            {/* Communities */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <FaUsers className="w-5 h-5 text-purple-500" />
                <h4 className="font-semibold text-gray-900 dark:text-white">Learning Communities</h4>
              </div>
              <div className="space-y-3">
                {generatedRoadmap.steps
                  .filter(step => step.learningResources?.communities)
                  .slice(0, 2)
                  .flatMap(step => step.learningResources!.communities.slice(0, 2))
                  .map((community, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      {community.platform === 'Discord' ? (
                        <FaDiscord className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                      ) : community.platform === 'Reddit' ? (
                        <FaReddit className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                      ) : community.platform === 'GitHub' ? (
                        <FaGithub className="w-4 h-4 text-gray-600 dark:text-gray-300 mt-1 flex-shrink-0" />
                      ) : (
                        <FaLink className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <a
                          href={community.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 dark:text-blue-400 hover:underline block truncate"
                        >
                          {community.name}
                        </a>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {community.description}
                        </p>
                        <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded mt-1">
                          {community.platform}
                        </span>
                      </div>
                      <FaExternalLinkAlt className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Quick Access to All Resources */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Ready to Start Learning?
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Access all resources and start your journey with the first step
                </p>
              </div>
              <button
                onClick={() => {
                  const firstIncompleteStep = generatedRoadmap.steps.find(step => !step.isCompleted)
                  if (firstIncompleteStep && firstIncompleteStep.resources.length > 0) {
                    window.open(firstIncompleteStep.resources[0].url, '_blank')
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaPlay className="w-4 h-4" />
                Start Learning
              </button>
            </div>
          </div>
        </motion.div>

        {/* Compact Milestones & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Milestones */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              Milestones
            </h3>
            <div className="space-y-2">
              {generatedRoadmap.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-700"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FaCalendarAlt className="text-yellow-600 w-3 h-3" />
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                      Week {milestone.week}: {milestone.title}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    {milestone.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {milestone.skills.slice(0, 2).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {milestone.skills.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                        +{milestone.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FaTrophy className="text-yellow-500" />
              Achievements
            </h3>
            <div className="space-y-2">
              {achievements.length > 0 ? (
                achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-700"
                  >
                    <div className="flex items-center gap-2">
                      <FaTrophy className="text-purple-600 w-4 h-4" />
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">
                        {achievement === 'first-step' ? 'First Step Completed!' :
                         achievement === 'milestone-5' ? '5 Steps Mastered!' :
                         achievement === 'milestone-10' ? '10 Steps Champion!' :
                         'Achievement Unlocked!'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-2">
                    <FaRocket className="text-gray-400 w-4 h-4" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      Complete steps to unlock achievements!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      {/* Enhanced Header */}
      <div className="relative text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30 animate-pulse" />
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
              <FaRobot className="text-3xl text-white" />
            </div>
          </div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
        >
          AI Learning Roadmap Generator
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Create your personalized learning journey with AI-powered recommendations
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-4"
        >
          <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">🤖 AI-Powered</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">⚡ Personalized</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
            <span className="text-sm font-medium text-green-700 dark:text-green-300">🎯 Goal-Oriented</span>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="relative mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FaRoute className="text-blue-500" />
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Step {currentStep} of 5
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round((currentStep / 5) * 100)}% Complete
            </span>
            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
              <FaCheckCircle className="w-3 h-3 text-green-600" />
              <span className="text-xs font-medium text-green-700 dark:text-green-300">
                {currentStep - 1} Done
              </span>
            </div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                step < currentStep
                  ? 'bg-green-500 text-white shadow-lg'
                  : step === currentStep
                    ? 'bg-blue-500 text-white shadow-lg animate-pulse'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              }`}>
                {step < currentStep ? <FaCheck className="w-4 h-4" /> : step}
              </div>
              <span className={`text-xs mt-2 font-medium ${
                step <= currentStep ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'
              }`}>
                {step === 1 ? 'Profile' : step === 2 ? 'Interests' : step === 3 ? 'Goals' : step === 4 ? 'Time' : 'Learning'}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / 5) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative inline-block mb-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-30 animate-pulse" />
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
                  <FaUser className="text-3xl text-white" />
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Welcome to Your Learning Journey! 👋
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Let's start by getting to know you better so we can create the perfect learning path
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  What should we call you? ✨
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name (e.g., Alex, Sarah, John)"
                    className="w-full px-6 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg placeholder-gray-400"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {userProfile.name && <FaCheckCircle className="text-green-500 w-5 h-5" />}
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  What's your programming experience level? 🚀
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {experienceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setUserProfile(prev => ({ ...prev, experience: option.value as any }))}
                      className={`p-4 border-2 rounded-xl text-left transition-all duration-200 hover:scale-105 ${
                        userProfile.experience === option.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                          : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {option.value === 'complete-beginner' ? '🌱' :
                           option.value === 'some-basics' ? '🌿' :
                           option.value === 'intermediate' ? '🌳' : '🏆'}
                        </span>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {option.desc}
                          </div>
                        </div>
                        {userProfile.experience === option.value && (
                          <FaCheckCircle className="text-blue-500 ml-auto w-5 h-5" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative inline-block mb-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-30 animate-pulse" />
                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full">
                  <FaCode className="text-3xl text-white" />
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                What sparks your interest? 🎯
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Choose the areas you're passionate about. You can select multiple options!
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Selected: {userProfile.interests.length}
                </span>
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                    💡 Pick 2-4 for best results
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {interestOptions.map((interest, index) => {
                const isSelected = userProfile.interests.includes(interest)
                const icons = {
                  'Web Development': '🌐',
                  'Mobile Apps': '📱',
                  'Data Science': '📊',
                  'AI/Machine Learning': '🤖',
                  'Game Development': '🎮',
                  'DevOps': '⚙️',
                  'Cybersecurity': '🔒',
                  'Blockchain': '⛓️',
                  'Cloud Computing': '☁️',
                  'Desktop Apps': '💻',
                  'IoT': '🌐',
                  'AR/VR': '🥽'
                }
                return (
                  <motion.button
                    key={interest}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => toggleInterest(interest)}
                    className={`relative p-4 border-2 rounded-xl text-center transition-all duration-200 hover:scale-105 group ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      {icons[interest as keyof typeof icons] || '💡'}
                    </div>
                    <div className={`font-semibold text-sm ${
                      isSelected
                        ? 'text-purple-700 dark:text-purple-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {interest}
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full p-1"
                      >
                        <FaCheckCircle className="w-4 h-4" />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <FaRocket className="text-3xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                What are your goals?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                What do you want to achieve with programming?
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {goalOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`p-3 border rounded-lg text-left transition-all ${
                    userProfile.goals.includes(goal)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-medium text-xs">
                    {goal}
                  </div>
                  {userProfile.goals.includes(goal) && (
                    <FaCheckCircle className="text-blue-500 mt-1 w-3 h-3" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <FaClock className="text-3xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                How much time can you commit?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                This helps us create a realistic timeline for your learning journey
              </p>
            </div>

            <div className="space-y-3">
              {timeOptions.map((time) => (
                <label
                  key={time}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                    userProfile.timeCommitment === time
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="timeCommitment"
                    value={time}
                    checked={userProfile.timeCommitment === time}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, timeCommitment: e.target.value }))}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {time}
                    </div>
                  </div>
                  {userProfile.timeCommitment === time && (
                    <FaCheckCircle className="text-blue-500" />
                  )}
                </label>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <FaGraduationCap className="text-3xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                How do you prefer to learn?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Select your preferred learning methods
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {learningOptions.map((learning) => (
                <button
                  key={learning}
                  onClick={() => toggleLearning(learning)}
                  className={`p-3 border rounded-lg text-left transition-all ${
                    userProfile.preferredLearning.includes(learning)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-medium text-xs">
                    {learning}
                  </div>
                  {userProfile.preferredLearning.includes(learning) && (
                    <FaCheckCircle className="text-blue-500 mt-1 w-3 h-3" />
                  )}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tell us about your background (optional)
              </label>
              <textarea
                value={userProfile.background}
                onChange={(e) => setUserProfile(prev => ({ ...prev, background: e.target.value }))}
                placeholder="Any relevant experience, education, or specific areas you want to focus on..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Navigation Buttons */}
      <div className="relative mt-8">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              currentStep === 1
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-lg hover:shadow-xl'
            }`}
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </motion.button>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Step {currentStep} of 5
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    step <= currentStep ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !userProfile.name) ||
              (currentStep === 2 && userProfile.interests.length === 0) ||
              (currentStep === 3 && userProfile.goals.length === 0) ||
              (currentStep === 4 && !userProfile.timeCommitment) ||
              (currentStep === 5 && userProfile.preferredLearning.length === 0)
            }
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
              (currentStep === 1 && !userProfile.name) ||
              (currentStep === 2 && userProfile.interests.length === 0) ||
              (currentStep === 3 && userProfile.goals.length === 0) ||
              (currentStep === 4 && !userProfile.timeCommitment) ||
              (currentStep === 5 && userProfile.preferredLearning.length === 0)
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : currentStep === 5
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
            }`}
          >
            {isGenerating ? (
              <>
                <FaSpinner className="animate-spin w-4 h-4" />
                <span>Generating Your Roadmap...</span>
              </>
            ) : currentStep === 5 ? (
              <>
                <FaRocket className="w-4 h-4" />
                <span>Generate My Roadmap</span>
                <span className="text-lg">🚀</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <FaArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>

        {/* Helpful Tips */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              💡 {currentStep === 1 ? 'Tell us your name to get started' :
                  currentStep === 2 ? 'Select 2-4 areas for the best roadmap' :
                  currentStep === 3 ? 'Choose your learning goals' :
                  currentStep === 4 ? 'How much time can you dedicate?' :
                  'Almost done! Choose your learning style'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
