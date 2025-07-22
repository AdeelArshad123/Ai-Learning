interface QuizResult {
  score: number
  totalQuestions: number
  topic: string
  language: string
  timestamp: number
  quizType?: string
  timeSpent?: number
  streakCount?: number
  difficulty?: string
}

interface PerformanceStats {
  totalQuizzes: number
  averageScore: number
  bestScore: number
  currentDifficulty: 'beginner' | 'intermediate' | 'advanced'
  totalTimeSpent: number
  averageTimePerQuestion: number
  streakHistory: number[]
  improvementRate: number
  weakAreas: string[]
  strongAreas: string[]
  learningPath: string[]
  lastQuizDate: string
  consistencyScore: number
}

const STORAGE_KEY = 'quiz_performance_history'
const MAX_HISTORY = 50 // Keep last 50 quiz results for better analytics

export const quizTracker = {
  // Save quiz result to local storage
  saveResult: (result: QuizResult) => {
    try {
      const history = quizTracker.getHistory()
      history.push(result)
      
      // Keep only the last MAX_HISTORY results
      if (history.length > MAX_HISTORY) {
        history.splice(0, history.length - MAX_HISTORY)
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    } catch (error) {
      console.error('Failed to save quiz result:', error)
    }
  },

  // Get quiz history from local storage
  getHistory: (): QuizResult[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to get quiz history:', error)
      return []
    }
  },

  // Estimate difficulty based on recent performance
  estimateDifficulty: (topic: string, language: string): 'beginner' | 'intermediate' | 'advanced' => {
    const history = quizTracker.getHistory()
    
    // Filter for recent results (last 30 days) for this topic/language
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
    const recentResults = history.filter(result => 
      result.topic === topic && 
      result.language === language && 
      result.timestamp > thirtyDaysAgo
    )

    if (recentResults.length === 0) {
      return 'beginner' // Default for new topics
    }

    // Calculate average score percentage
    const totalScore = recentResults.reduce((sum, result) => sum + result.score, 0)
    const totalQuestions = recentResults.reduce((sum, result) => sum + result.totalQuestions, 0)
    const averageScorePercentage = totalScore / totalQuestions

    // Determine difficulty based on performance
    if (averageScorePercentage >= 0.8) {
      return 'advanced'
    } else if (averageScorePercentage >= 0.6) {
      return 'intermediate'
    } else {
      return 'beginner'
    }
  },

  // Get comprehensive performance statistics
  getPerformanceStats: (topic: string, language: string): PerformanceStats => {
    const history = quizTracker.getHistory()
    const topicResults = history.filter(result => 
      result.topic === topic && result.language === language
    )

    if (topicResults.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        currentDifficulty: 'beginner',
        totalTimeSpent: 0,
        averageTimePerQuestion: 0,
        streakHistory: [],
        improvementRate: 0,
        weakAreas: [],
        strongAreas: [],
        learningPath: [],
        lastQuizDate: '',
        consistencyScore: 0
      }
    }

    // Basic stats
    const totalScore = topicResults.reduce((sum, result) => sum + result.score, 0)
    const totalQuestions = topicResults.reduce((sum, result) => sum + result.totalQuestions, 0)
    const averageScore = totalScore / totalQuestions
    const bestScore = Math.max(...topicResults.map(result => result.score / result.totalQuestions))

    // Time analysis
    const timeResults = topicResults.filter(result => result.timeSpent)
    const totalTimeSpent = timeResults.reduce((sum, result) => sum + (result.timeSpent || 0), 0)
    const averageTimePerQuestion = totalTimeSpent / totalQuestions

    // Streak analysis
    const streakHistory = topicResults
      .filter(result => result.streakCount)
      .map(result => result.streakCount || 0)

    // Improvement rate calculation
    const sortedResults = topicResults.sort((a, b) => a.timestamp - b.timestamp)
    const firstHalf = sortedResults.slice(0, Math.ceil(sortedResults.length / 2))
    const secondHalf = sortedResults.slice(Math.ceil(sortedResults.length / 2))
    
    const firstHalfAvg = firstHalf.length > 0 
      ? firstHalf.reduce((sum, result) => sum + result.score / result.totalQuestions, 0) / firstHalf.length 
      : 0
    const secondHalfAvg = secondHalf.length > 0 
      ? secondHalf.reduce((sum, result) => sum + result.score / result.totalQuestions, 0) / secondHalf.length 
      : 0
    
    const improvementRate = firstHalfAvg > 0 ? ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100 : 0

    // Learning path analysis
    const learningPath = quizTracker.generateLearningPath(topic, language, topicResults)

    // Consistency score (based on regular quiz taking)
    const consistencyScore = quizTracker.calculateConsistencyScore(topicResults)

    // Last quiz date
    const lastQuiz = topicResults.sort((a, b) => b.timestamp - a.timestamp)[0]
    const lastQuizDate = lastQuiz ? new Date(lastQuiz.timestamp).toLocaleDateString() : ''

    return {
      totalQuizzes: topicResults.length,
      averageScore: averageScore,
      bestScore: bestScore,
      currentDifficulty: quizTracker.estimateDifficulty(topic, language),
      totalTimeSpent,
      averageTimePerQuestion,
      streakHistory,
      improvementRate,
      weakAreas: quizTracker.identifyWeakAreas(topicResults),
      strongAreas: quizTracker.identifyStrongAreas(topicResults),
      learningPath,
      lastQuizDate,
      consistencyScore
    }
  },

  // Generate personalized learning path
  generateLearningPath: (topic: string, language: string, results: QuizResult[]): string[] => {
    const path: string[] = []
    
    // Analyze performance patterns
    const recentResults = results.slice(-5) // Last 5 quizzes
    const avgScore = recentResults.reduce((sum, result) => sum + result.score / result.totalQuestions, 0) / recentResults.length

    if (avgScore < 0.6) {
      path.push('Review fundamental concepts')
      path.push('Practice basic syntax')
      path.push('Take beginner-level quizzes')
    } else if (avgScore < 0.8) {
      path.push('Practice intermediate concepts')
      path.push('Work on problem-solving')
      path.push('Try scenario-based questions')
    } else {
      path.push('Advanced topics exploration')
      path.push('Real-world applications')
      path.push('Teach others (peer learning)')
    }

    // Add specific recommendations based on quiz types
    const quizTypes = results.map(r => r.quizType).filter(Boolean)
    if (quizTypes.length > 0) {
      const mostUsedType = quizTypes.sort((a, b) => 
        quizTypes.filter(v => v === a).length - quizTypes.filter(v => v === b).length
      ).pop()
      
      if (mostUsedType === 'multiple-choice') {
        path.push('Try code completion questions')
      } else if (mostUsedType === 'code-completion') {
        path.push('Practice scenario-based questions')
      }
    }

    return path
  },

  // Calculate consistency score
  calculateConsistencyScore: (results: QuizResult[]): number => {
    if (results.length < 2) return 0

    const sortedResults = results.sort((a, b) => a.timestamp - b.timestamp)
    const timeGaps = []
    
    for (let i = 1; i < sortedResults.length; i++) {
      const gap = sortedResults[i].timestamp - sortedResults[i-1].timestamp
      timeGaps.push(gap)
    }

    const avgGap = timeGaps.reduce((sum, gap) => sum + gap, 0) / timeGaps.length
    const consistencyScore = Math.max(0, 100 - (avgGap / (24 * 60 * 60 * 1000))) // Days between quizzes

    return Math.min(100, consistencyScore)
  },

  // Identify weak areas based on performance
  identifyWeakAreas: (results: QuizResult[]): string[] => {
    const weakAreas: string[] = []
    
    // Analyze recent performance
    const recentResults = results.slice(-3)
    const avgScore = recentResults.reduce((sum, result) => sum + result.score / result.totalQuestions, 0) / recentResults.length

    if (avgScore < 0.5) {
      weakAreas.push('Basic concepts')
      weakAreas.push('Fundamental syntax')
    }
    
    if (avgScore < 0.7) {
      weakAreas.push('Problem-solving skills')
    }

    // Analyze time spent
    const timeResults = results.filter(r => r.timeSpent)
    if (timeResults.length > 0) {
      const avgTime = timeResults.reduce((sum, r) => sum + (r.timeSpent || 0), 0) / timeResults.length
      if (avgTime > 120) { // More than 2 minutes per question
        weakAreas.push('Speed and efficiency')
      }
    }

    return weakAreas
  },

  // Identify strong areas based on performance
  identifyStrongAreas: (results: QuizResult[]): string[] => {
    const strongAreas: string[] = []
    
    const recentResults = results.slice(-3)
    const avgScore = recentResults.reduce((sum, result) => sum + result.score / result.totalQuestions, 0) / recentResults.length

    if (avgScore > 0.8) {
      strongAreas.push('Conceptual understanding')
      strongAreas.push('Problem-solving')
    }

    // Analyze streaks
    const streakResults = results.filter(r => r.streakCount && r.streakCount > 2)
    if (streakResults.length > 0) {
      strongAreas.push('Consistent performance')
    }

    // Analyze time efficiency
    const timeResults = results.filter(r => r.timeSpent)
    if (timeResults.length > 0) {
      const avgTime = timeResults.reduce((sum, r) => sum + (r.timeSpent || 0), 0) / timeResults.length
      if (avgTime < 60) { // Less than 1 minute per question
        strongAreas.push('Quick thinking')
      }
    }

    return strongAreas
  },

  // Get global statistics across all topics
  getGlobalStats: () => {
    const history = quizTracker.getHistory()
    
    if (history.length === 0) {
      return {
        totalQuizzes: 0,
        totalQuestions: 0,
        averageScore: 0,
        totalTimeSpent: 0,
        favoriteLanguage: '',
        favoriteTopic: '',
        totalStreak: 0
      }
    }

    const totalQuizzes = history.length
    const totalQuestions = history.reduce((sum, result) => sum + result.totalQuestions, 0)
    const totalScore = history.reduce((sum, result) => sum + result.score, 0)
    const averageScore = totalScore / totalQuestions
    const totalTimeSpent = history.reduce((sum, result) => sum + (result.timeSpent || 0), 0)

    // Find favorite language and topic
    const languageCounts: { [key: string]: number } = {}
    const topicCounts: { [key: string]: number } = {}
    
    history.forEach(result => {
      languageCounts[result.language] = (languageCounts[result.language] || 0) + 1
      topicCounts[result.topic] = (topicCounts[result.topic] || 0) + 1
    })

    const favoriteLanguage = Object.entries(languageCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || ''
    
    const favoriteTopic = Object.entries(topicCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || ''

    // Calculate total streak
    const totalStreak = history
      .filter(result => result.streakCount)
      .reduce((max, result) => Math.max(max, result.streakCount || 0), 0)

    return {
      totalQuizzes,
      totalQuestions,
      averageScore,
      totalTimeSpent,
      favoriteLanguage,
      favoriteTopic,
      totalStreak
    }
  },

  // Clear all quiz history
  clearHistory: () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear quiz history:', error)
    }
  },

  // Export quiz data
  exportData: () => {
    try {
      const history = quizTracker.getHistory()
      const data = {
        history,
        globalStats: quizTracker.getGlobalStats(),
        exportDate: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `quiz_data_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export quiz data:', error)
    }
  }
} 