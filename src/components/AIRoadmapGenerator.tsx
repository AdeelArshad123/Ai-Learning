'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaRobot,
  FaRoute,
  FaGraduationCap,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Compact Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          <FaRobot className="text-3xl text-blue-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Roadmap Generator
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Get your personalized learning path in 5 quick steps
        </p>
      </div>

      {/* Compact Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {currentStep} of 5
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round((currentStep / 5) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <FaUser className="text-3xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Let's get to know you!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tell us about yourself so we can create the perfect learning path
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What's your name?
                </label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What's your programming experience?
                </label>
                <div className="space-y-3">
                  {experienceOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                        userProfile.experience === option.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="experience"
                        value={option.value}
                        checked={userProfile.experience === option.value}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, experience: e.target.value as any }))}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {option.desc}
                        </div>
                      </div>
                      {userProfile.experience === option.value && (
                        <FaCheckCircle className="text-blue-500" />
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <FaCode className="text-3xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                What interests you most?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Select the areas you'd like to focus on (choose multiple)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`p-3 border rounded-lg text-left transition-all ${
                    userProfile.interests.includes(interest)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-medium text-xs">
                    {interest}
                  </div>
                  {userProfile.interests.includes(interest) && (
                    <FaCheckCircle className="text-blue-500 mt-1 w-3 h-3" />
                  )}
                </button>
              ))}
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

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            currentStep === 1
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={
            (currentStep === 1 && !userProfile.name) ||
            (currentStep === 2 && userProfile.interests.length === 0) ||
            (currentStep === 3 && userProfile.goals.length === 0) ||
            (currentStep === 4 && !userProfile.timeCommitment) ||
            (currentStep === 5 && userProfile.preferredLearning.length === 0)
          }
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            (currentStep === 1 && !userProfile.name) ||
            (currentStep === 2 && userProfile.interests.length === 0) ||
            (currentStep === 3 && userProfile.goals.length === 0) ||
            (currentStep === 4 && !userProfile.timeCommitment) ||
            (currentStep === 5 && userProfile.preferredLearning.length === 0)
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isGenerating ? (
            <>
              <FaSpinner className="animate-spin" />
              Generating Roadmap...
            </>
          ) : currentStep === 5 ? (
            <>
              Generate My Roadmap
              <FaRocket />
            </>
          ) : (
            <>
              Next
              <FaArrowRight />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
