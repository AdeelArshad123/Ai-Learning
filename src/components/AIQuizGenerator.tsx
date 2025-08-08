'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaBrain,
  FaRocket,
  FaCheck,
  FaTimes,
  FaLightbulb,
  FaSpinner,
  FaTrophy,
  FaChartLine,
  FaRedo,
  FaCog,
  FaUser,
  FaBookOpen,
  FaClock,
  FaTarget,
  FaGraduationCap,
  FaFire,
  FaStar,
  FaHistory,
  FaRobot,
  FaPlay,
  FaPause,
  FaForward,
  FaBackward
} from 'react-icons/fa'
import {
  FiSettings,
  FiZap,
  FiTrendingUp,
  FiAward,
  FiBookOpen,
  FiClock,
  FiTarget,
  FiUser,
  FiBarChart
} from 'react-icons/fi'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  topic: string
}

interface AIQuizGeneratorProps {
  topic: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  questionCount?: number
}

export default function AIQuizGenerator({
  topic,
  difficulty = 'intermediate',
  questionCount = 5
}: AIQuizGeneratorProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [score, setScore] = useState(0)

  // Enhanced automation states
  const [quizMode, setQuizMode] = useState<'practice' | 'timed' | 'adaptive' | 'challenge'>('practice')
  const [timeLimit, setTimeLimit] = useState<number>(0) // 0 = no limit
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [autoAdvance, setAutoAdvance] = useState(false)
  const [showHints, setShowHints] = useState(true)
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(false)
  const [personalizedQuestions, setPersonalizedQuestions] = useState(false)
  const [learningMode, setLearningMode] = useState(false)
  const [streakCount, setStreakCount] = useState(0)
  const [userPerformance, setUserPerformance] = useState<any>(null)
  const [quizHistory, setQuizHistory] = useState<any[]>([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [totalQuizzes, setTotalQuizzes] = useState(0)
  const [averageScore, setAverageScore] = useState(0)
  const [weakAreas, setWeakAreas] = useState<string[]>([])
  const [strongAreas, setStrongAreas] = useState<string[]>([])
  const [recommendedTopics, setRecommendedTopics] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showConfiguration, setShowConfiguration] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState<number>(0)
  const [questionTimes, setQuestionTimes] = useState<number[]>([])
  const [hintsUsed, setHintsUsed] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  // Topic selection states
  const [quizCreationMode, setQuizCreationMode] = useState<'ai' | 'manual'>('ai')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [availableTopics, setAvailableTopics] = useState<string[]>([])
  const [manualTopic, setManualTopic] = useState<string>('')
  const [manualDifficulty, setManualDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')
  const [manualQuestionCount, setManualQuestionCount] = useState<number>(5)

  // Topic categories and data
  const topicCategories = {
    'Frontend': ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'TypeScript', 'Next.js', 'Redux', 'SASS'],
    'Backend': ['Node.js', 'Express', 'Python', 'Django', 'Flask', 'Java', 'Spring', 'PHP', 'Laravel', 'Ruby'],
    'Database': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'GraphQL', 'Database Design'],
    'DevOps': ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Linux', 'Git', 'Jenkins', 'Terraform'],
    'Mobile': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Xamarin', 'Mobile Design'],
    'Data Science': ['Machine Learning', 'Data Analysis', 'Statistics', 'Pandas', 'NumPy', 'Visualization'],
    'Security': ['Web Security', 'Authentication', 'Encryption', 'OWASP', 'Penetration Testing'],
    'General': ['Algorithms', 'Data Structures', 'System Design', 'Software Architecture', 'Testing']
  }

  // Load user performance data
  useEffect(() => {
    loadUserPerformance()
    loadQuizHistory()
  }, [])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerActive, timeRemaining])

  // Auto-advance effect
  useEffect(() => {
    if (autoAdvance && selectedAnswers[currentQuestionIndex] !== undefined) {
      const timer = setTimeout(() => {
        nextQuestion()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [selectedAnswers, currentQuestionIndex, autoAdvance])

  // Smart automation functions
  const loadUserPerformance = () => {
    const stored = localStorage.getItem(`quiz_performance_${topic}`)
    if (stored) {
      const performance = JSON.parse(stored)
      setUserPerformance(performance)
      setBestScore(performance.bestScore || 0)
      setAverageScore(performance.averageScore || 0)
      setCurrentStreak(performance.currentStreak || 0)
      setWeakAreas(performance.weakAreas || [])
      setStrongAreas(performance.strongAreas || [])
    }
  }

  const loadQuizHistory = () => {
    const stored = localStorage.getItem('quiz_history')
    if (stored) {
      const history = JSON.parse(stored)
      setQuizHistory(history)
      setTotalQuizzes(history.length)
      analyzePerformanceTrends(history)
    }
  }

  const analyzePerformanceTrends = (history: any[]) => {
    setIsAnalyzing(true)

    // Analyze performance patterns
    const topicHistory = history.filter(h => h.topic === topic)
    if (topicHistory.length > 0) {
      const avgScore = topicHistory.reduce((sum, h) => sum + h.score, 0) / topicHistory.length
      setAverageScore(Math.round(avgScore))

      // Identify weak areas (questions answered incorrectly frequently)
      const incorrectTopics = topicHistory
        .filter(h => h.score < 70)
        .map(h => h.weakTopics || [])
        .flat()

      const weakTopics = [...new Set(incorrectTopics)]
      setWeakAreas(weakTopics.slice(0, 3))

      // Recommend next topics based on performance
      const recommendations = generateRecommendations(topicHistory)
      setRecommendedTopics(recommendations)
    }

    setTimeout(() => setIsAnalyzing(false), 1000)
  }

  const generateRecommendations = (history: any[]) => {
    const recommendations = []
    const avgScore = history.reduce((sum, h) => sum + h.score, 0) / history.length

    if (avgScore > 80) {
      recommendations.push('Advanced ' + topic, topic + ' Best Practices', topic + ' Performance')
    } else if (avgScore > 60) {
      recommendations.push('Intermediate ' + topic, topic + ' Patterns', topic + ' Deep Dive')
    } else {
      recommendations.push('Basic ' + topic, topic + ' Fundamentals', topic + ' Basics')
    }

    return recommendations.slice(0, 3)
  }

  const handleTimeUp = () => {
    setIsTimerActive(false)
    if (learningMode) {
      // In learning mode, show explanation and continue
      setShowExplanation(true)
    } else {
      // In other modes, auto-submit current answer or mark as incorrect
      if (selectedAnswers[currentQuestionIndex] === undefined) {
        const newAnswers = [...selectedAnswers]
        newAnswers[currentQuestionIndex] = -1 // Mark as unanswered
        setSelectedAnswers(newAnswers)
      }
      nextQuestion()
    }
  }

  const startTimer = (seconds: number) => {
    setTimeRemaining(seconds)
    setIsTimerActive(true)
    setQuestionStartTime(Date.now())
  }

  const saveQuizResult = (finalScore: number) => {
    const result = {
      topic,
      difficulty,
      score: finalScore,
      totalQuestions: questions.length,
      timestamp: Date.now(),
      timeSpent: questionTimes.reduce((sum, time) => sum + time, 0),
      hintsUsed: hintsUsed.length,
      mode: quizMode,
      weakTopics: questions
        .filter((q, i) => selectedAnswers[i] !== q.correctAnswer)
        .map(q => q.topic)
    }

    // Save to history
    const history = [...quizHistory, result]
    setQuizHistory(history)
    localStorage.setItem('quiz_history', JSON.stringify(history))

    // Update performance stats
    const performance = {
      bestScore: Math.max(bestScore, finalScore),
      averageScore: Math.round((averageScore * totalQuizzes + finalScore) / (totalQuizzes + 1)),
      currentStreak: finalScore >= 70 ? currentStreak + 1 : 0,
      totalQuizzes: totalQuizzes + 1,
      lastQuizDate: new Date().toISOString(),
      weakAreas: result.weakTopics
    }

    setUserPerformance(performance)
    localStorage.setItem(`quiz_performance_${topic}`, JSON.stringify(performance))
  }

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setAvailableTopics(topicCategories[category as keyof typeof topicCategories] || [])
    setManualTopic('')
  }

  // Handle manual quiz creation
  const startManualQuiz = () => {
    if (!manualTopic) return

    setQuizStarted(true)
    setIsGenerating(true)

    // Use the manual settings
    generateQuizQuestions(manualTopic, manualDifficulty)
      .then(generatedQuestions => {
        const limitedQuestions = generatedQuestions.slice(0, manualQuestionCount)
        setQuestions(limitedQuestions)
        setIsGenerating(false)

        if (quizMode === 'timed') {
          startTimer(30) // 30 seconds per question
        }
      })
      .catch(error => {
        console.error('Error generating quiz:', error)
        setIsGenerating(false)
      })
  }

  // AI-generated quiz questions based on topic
  const generateQuizQuestions = async (topic: string, difficulty: string): Promise<QuizQuestion[]> => {
    setIsGenerating(true)
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Pre-generated questions for different topics and difficulties
    const questionBank: Record<string, Record<string, QuizQuestion[]>> = {
      'JavaScript': {
        'beginner': [
          {
            id: '1',
            question: 'What is the correct way to declare a variable in JavaScript?',
            options: ['var myVar = 5;', 'variable myVar = 5;', 'v myVar = 5;', 'declare myVar = 5;'],
            correctAnswer: 0,
            explanation: 'In JavaScript, you can declare variables using var, let, or const keywords. "var" is the traditional way, though "let" and "const" are preferred in modern JavaScript.',
            difficulty: 'beginner',
            topic: 'JavaScript'
          },
          {
            id: '2',
            question: 'Which method is used to add an element to the end of an array?',
            options: ['append()', 'push()', 'add()', 'insert()'],
            correctAnswer: 1,
            explanation: 'The push() method adds one or more elements to the end of an array and returns the new length of the array.',
            difficulty: 'beginner',
            topic: 'JavaScript'
          },
          {
            id: '3',
            question: 'What does "=== " operator do in JavaScript?',
            options: ['Assignment', 'Equality without type checking', 'Strict equality with type checking', 'Not equal'],
            correctAnswer: 2,
            explanation: 'The === operator checks for strict equality, meaning both value and type must be the same. It does not perform type coercion.',
            difficulty: 'beginner',
            topic: 'JavaScript'
          }
        ],
        'intermediate': [
          {
            id: '4',
            question: 'What is a closure in JavaScript?',
            options: [
              'A way to close browser windows',
              'A function that has access to variables in its outer scope',
              'A method to end loops',
              'A type of error handling'
            ],
            correctAnswer: 1,
            explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. This is a powerful feature in JavaScript.',
            difficulty: 'intermediate',
            topic: 'JavaScript'
          },
          {
            id: '5',
            question: 'What is the purpose of the "async" keyword?',
            options: [
              'To make functions run faster',
              'To declare a function that returns a Promise',
              'To handle errors',
              'To create loops'
            ],
            correctAnswer: 1,
            explanation: 'The async keyword is used to declare an asynchronous function that returns a Promise. It allows you to use await inside the function.',
            difficulty: 'intermediate',
            topic: 'JavaScript'
          }
        ]
      },
      'React': {
        'beginner': [
          {
            id: '6',
            question: 'What is JSX in React?',
            options: [
              'A JavaScript library',
              'A syntax extension for JavaScript',
              'A CSS framework',
              'A database'
            ],
            correctAnswer: 1,
            explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It makes React components more readable and easier to write.',
            difficulty: 'beginner',
            topic: 'React'
          },
          {
            id: '7',
            question: 'How do you pass data from parent to child component in React?',
            options: ['Through state', 'Through props', 'Through context', 'Through refs'],
            correctAnswer: 1,
            explanation: 'Props (properties) are used to pass data from parent components to child components in React. They are read-only and help make components reusable.',
            difficulty: 'beginner',
            topic: 'React'
          }
        ],
        'intermediate': [
          {
            id: '8',
            question: 'What is the purpose of useEffect hook?',
            options: [
              'To manage component state',
              'To perform side effects in functional components',
              'To create new components',
              'To handle user input'
            ],
            correctAnswer: 1,
            explanation: 'useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM. It replaces lifecycle methods from class components.',
            difficulty: 'intermediate',
            topic: 'React'
          }
        ]
      },
      'Python': {
        'beginner': [
          {
            id: '9',
            question: 'Which of the following is the correct way to create a list in Python?',
            options: ['list = (1, 2, 3)', 'list = [1, 2, 3]', 'list = {1, 2, 3}', 'list = <1, 2, 3>'],
            correctAnswer: 1,
            explanation: 'In Python, lists are created using square brackets []. Lists are ordered, mutable collections that can contain different data types.',
            difficulty: 'beginner',
            topic: 'Python'
          },
          {
            id: '10',
            question: 'What is the output of print(type(5.0))?',
            options: ['<class "int">', '<class "float">', '<class "number">', '<class "decimal">'],
            correctAnswer: 1,
            explanation: 'In Python, 5.0 is a floating-point number, so type(5.0) returns <class "float">. The decimal point makes it a float even though the value is a whole number.',
            difficulty: 'beginner',
            topic: 'Python'
          }
        ]
      }
    }

    // Get questions for the topic and difficulty
    const topicQuestions = questionBank[topic]?.[difficulty] || questionBank['JavaScript']['beginner']
    
    // Return requested number of questions (no random shuffling to avoid hydration issues)
    return topicQuestions.slice(0, Math.min(questionCount, topicQuestions.length))
  }

  const startQuiz = async () => {
    const generatedQuestions = await generateQuizQuestions(topic, difficulty)
    setQuestions(generatedQuestions)
    setQuizStarted(true)
    setIsGenerating(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setShowResults(false)
    setScore(0)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      calculateScore()
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    setScore(correctAnswers)
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setShowResults(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setScore(0)
    setQuestions([])
  }

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return 'text-green-500'
    if (percentage >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return "Outstanding! You're a master! 🏆"
    if (percentage >= 80) return "Excellent work! Keep it up! 🌟"
    if (percentage >= 70) return "Good job! You're on the right track! 👍"
    if (percentage >= 60) return "Not bad! Keep practicing! 📚"
    return "Keep learning! Practice makes perfect! 💪"
  }

  if (!quizStarted) {
    return (
      <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 rounded-3xl p-8 shadow-2xl border border-purple-200 dark:border-purple-700 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative inline-block mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                <FaBrain className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
            >
              Ultimate Quiz Generator
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto"
            >
              Choose your learning style: AI-powered adaptive quizzes or manual topic selection
            </motion.p>

            {/* Mode Selection */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-4 mb-8"
            >
              <button
                onClick={() => setQuizCreationMode('ai')}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                  quizCreationMode === 'ai'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                }`}
              >
                <div className={`p-2 rounded-xl ${
                  quizCreationMode === 'ai' ? 'bg-purple-500' : 'bg-gray-400'
                }`}>
                  <FaRobot className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className={`font-bold text-lg ${
                    quizCreationMode === 'ai' ? 'text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    AI Mode
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Smart, adaptive learning
                  </div>
                </div>
              </button>

              <button
                onClick={() => setQuizCreationMode('manual')}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                  quizCreationMode === 'manual'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                }`}
              >
                <div className={`p-2 rounded-xl ${
                  quizCreationMode === 'manual' ? 'bg-blue-500' : 'bg-gray-400'
                }`}>
                  <FiBookOpen className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className={`font-bold text-lg ${
                    quizCreationMode === 'manual' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    Manual Mode
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Choose your topics
                  </div>
                </div>
              </button>
            </motion.div>
          </div>

          {/* Performance Dashboard - Only for AI Mode */}
          {quizCreationMode === 'ai' && userPerformance && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 mb-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiBarChart className="text-purple-600" />
                  <h4 className="font-bold text-gray-900 dark:text-white">Your Performance</h4>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{bestScore}%</div>
                    <div className="text-xs text-gray-500">Best</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">{averageScore}%</div>
                    <div className="text-xs text-gray-500">Avg</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{currentStreak}</div>
                    <div className="text-xs text-gray-500">Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{totalQuizzes}</div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Manual Mode Configuration */}
          {quizCreationMode === 'manual' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <FiBookOpen className="text-blue-600" />
                <h4 className="font-bold text-gray-900 dark:text-white">Manual Quiz Builder</h4>
              </div>

              {/* Category Selection */}
              <div className="mb-6">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">Select Category</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.keys(topicCategories).map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        selectedCategory === category
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                      }`}
                    >
                      <div className={`font-medium text-sm ${
                        selectedCategory === category ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {category}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Selection */}
              {selectedCategory && (
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">Select Topic</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                    {availableTopics.map((topicOption) => (
                      <button
                        key={topicOption}
                        onClick={() => setManualTopic(topicOption)}
                        className={`p-2 rounded-lg border text-sm transition-all ${
                          manualTopic === topicOption
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {topicOption}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual Settings */}
              {manualTopic && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={manualDifficulty}
                      onChange={(e) => setManualDifficulty(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Questions
                    </label>
                    <select
                      value={manualQuestionCount}
                      onChange={(e) => setManualQuestionCount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value={3}>3 Questions</option>
                      <option value={5}>5 Questions</option>
                      <option value={10}>10 Questions</option>
                      <option value={15}>15 Questions</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={startManualQuiz}
                      disabled={!manualTopic || isGenerating}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isGenerating ? 'Creating...' : 'Create Quiz'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* AI Mode Configuration */}
          {quizCreationMode === 'ai' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FaRobot className="text-purple-600" />
                  <h4 className="font-bold text-gray-900 dark:text-white">AI Quiz Settings</h4>
                </div>
                <button
                  onClick={() => setShowConfiguration(!showConfiguration)}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                >
                  {showConfiguration ? 'Hide' : 'Customize'}
                </button>
              </div>

              {/* AI Mode Basic Info */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg">
                  <FiBookOpen className="text-purple-600" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">{topic}</div>
                    <div className="text-xs text-gray-500">AI Topic</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
                  <FiTarget className="text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm capitalize">{difficulty}</div>
                    <div className="text-xs text-gray-500">AI Difficulty</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
                  <FiAward className="text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">{questionCount}</div>
                    <div className="text-xs text-gray-500">Questions</div>
                  </div>
                </div>
              </div>

            {/* Compact Advanced Configuration */}
            <AnimatePresence>
              {showConfiguration && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  {/* Horizontal Quiz Mode Selection */}
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Quiz Mode</h5>
                    <div className="flex gap-2 overflow-x-auto">
                      {[
                        { id: 'practice', name: 'Practice', icon: FaBookOpen },
                        { id: 'timed', name: 'Timed', icon: FaClock },
                        { id: 'adaptive', name: 'Adaptive', icon: FaBrain },
                        { id: 'challenge', name: 'Challenge', icon: FaTrophy }
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => setQuizMode(mode.id as any)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all whitespace-nowrap ${
                            quizMode === mode.id
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                              : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <mode.icon className={`text-sm ${
                            quizMode === mode.id ? 'text-purple-600' : 'text-gray-500'
                          }`} />
                          {mode.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Horizontal Smart Features */}
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Smart Features</h5>
                    <div className="flex flex-wrap gap-3">
                      <label className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <input
                          type="checkbox"
                          checked={adaptiveDifficulty}
                          onChange={(e) => setAdaptiveDifficulty(e.target.checked)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-900 dark:text-white">Adaptive Difficulty</span>
                      </label>
                      <label className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <input
                          type="checkbox"
                          checked={personalizedQuestions}
                          onChange={(e) => setPersonalizedQuestions(e.target.checked)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-900 dark:text-white">Personalized</span>
                      </label>
                      <label className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <input
                          type="checkbox"
                          checked={showHints}
                          onChange={(e) => setShowHints(e.target.checked)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-900 dark:text-white">Smart Hints</span>
                      </label>
                      <label className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <input
                          type="checkbox"
                          checked={autoAdvance}
                          onChange={(e) => setAutoAdvance(e.target.checked)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-900 dark:text-white">Auto-Advance</span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </motion.div>
          )}

          {/* AI Mode Start Button */}
          {quizCreationMode === 'ai' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={startQuiz}
                disabled={isGenerating}
                className="relative inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Button Content */}
                <div className="relative flex items-center gap-4">
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="p-2 bg-white/20 rounded-full"
                      >
                        <FaSpinner className="text-2xl" />
                      </motion.div>
                      <span>Generating AI Quiz...</span>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        className="p-3 bg-white/20 rounded-full"
                      >
                        <FaRocket className="text-2xl" />
                      </motion.div>
                      <span>Start AI Quiz</span>
                      <span className="text-3xl">🧠</span>
                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <FaPlay className="text-xl" />
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-4 text-gray-600 dark:text-gray-400"
              >
                🎯 AI will adapt to your learning style and track your progress
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTrophy className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz Complete!
          </h3>

          <div className={`text-6xl font-black mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {getScoreMessage()}
          </p>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{score}</div>
                <div className="text-sm text-gray-500">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{questions.length - score}</div>
                <div className="text-sm text-gray-500">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {Math.round((score / questions.length) * 100)}%
                </div>
                <div className="text-sm text-gray-500">Score</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 hover:scale-105"
            >
              <FaRedo className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 hover:scale-105"
            >
              <FaBrain className="w-4 h-4" />
              New Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                selectedAnswers[currentQuestionIndex] === index
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300 dark:border-gray-500'
                }`}>
                  {selectedAnswers[currentQuestionIndex] === index && (
                    <FaCheck className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={nextQuestion}
          disabled={selectedAnswers[currentQuestionIndex] === undefined}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex === questions.length - 1 ? (
            <>
              <FaTrophy className="w-4 h-4" />
              Finish Quiz
            </>
          ) : (
            <>
              Next Question
              <FaRocket className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
