import { NextRequest, NextResponse } from 'next/server'
import { createAIBrain, createDefaultUserProfile } from '@/lib/ai-brain'

interface AdaptiveQuestion {
  id: string
  question: string
  type: 'multiple-choice' | 'code-completion' | 'true-false' | 'short-answer'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  options?: string[]
  correctAnswer: string | number
  explanation: string
  topic: string
  timeLimit: number
  points: number
  hints?: string[]
}

interface AssessmentSession {
  id: string
  userId: string
  topic: string
  startTime: string
  currentQuestionIndex: number
  questions: AdaptiveQuestion[]
  answers: any[]
  currentDifficulty: string
  adaptiveScore: number
  timeSpent: number
  completed: boolean
}

// Mock assessment sessions storage
const assessmentSessions = new Map<string, AssessmentSession>()

// 🎯 Adaptive Assessment API - Real-time difficulty adjustment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, sessionId, userId, topic, answer, userProfile } = body

    switch (action) {
      case 'start-assessment':
        return await startAdaptiveAssessment(userId, topic, userProfile)
      
      case 'submit-answer':
        return await submitAnswer(sessionId, answer)
      
      case 'get-next-question':
        return await getNextQuestion(sessionId)
      
      case 'complete-assessment':
        return await completeAssessment(sessionId)
      
      case 'get-results':
        return await getAssessmentResults(sessionId)
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error: any) {
    console.error('Error in adaptive assessment:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Assessment failed',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

async function startAdaptiveAssessment(userId: string, topic: string, userProfile?: any) {
  const profile = userProfile || createDefaultUserProfile(userId)
  const aiBrain = createAIBrain(profile)
  
  const sessionId = `assessment_${Date.now()}_${userId}`
  
  // Generate initial questions based on user's skill level
  const initialQuestions = generateAdaptiveQuestions(topic, profile.skillLevel, 3)
  
  const session: AssessmentSession = {
    id: sessionId,
    userId,
    topic,
    startTime: new Date().toISOString(),
    currentQuestionIndex: 0,
    questions: initialQuestions,
    answers: [],
    currentDifficulty: profile.skillLevel,
    adaptiveScore: 0,
    timeSpent: 0,
    completed: false
  }
  
  assessmentSessions.set(sessionId, session)
  
  return NextResponse.json({
    success: true,
    sessionId,
    currentQuestion: session.questions[0],
    totalQuestions: session.questions.length,
    currentDifficulty: session.currentDifficulty,
    estimatedDuration: calculateEstimatedDuration(session.questions)
  })
}

async function submitAnswer(sessionId: string, answer: any) {
  const session = assessmentSessions.get(sessionId)
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }
  
  const currentQuestion = session.questions[session.currentQuestionIndex]
  const isCorrect = evaluateAnswer(currentQuestion, answer)
  
  // Record the answer
  session.answers.push({
    questionId: currentQuestion.id,
    userAnswer: answer,
    correctAnswer: currentQuestion.correctAnswer,
    isCorrect,
    timeSpent: answer.timeSpent || 0,
    timestamp: new Date().toISOString()
  })
  
  // Update adaptive score
  session.adaptiveScore = calculateAdaptiveScore(session.answers)
  
  // Determine if difficulty should be adjusted
  const shouldAdjustDifficulty = shouldAdjustDifficultyLevel(session.answers.slice(-3))
  let newDifficulty = session.currentDifficulty
  
  if (shouldAdjustDifficulty.adjust) {
    newDifficulty = shouldAdjustDifficulty.newLevel
    session.currentDifficulty = newDifficulty
    
    // Generate new questions with adjusted difficulty
    const additionalQuestions = generateAdaptiveQuestions(session.topic, newDifficulty, 2)
    session.questions.push(...additionalQuestions)
  }
  
  return NextResponse.json({
    success: true,
    isCorrect,
    explanation: currentQuestion.explanation,
    currentScore: session.adaptiveScore,
    difficultyAdjusted: shouldAdjustDifficulty.adjust,
    newDifficulty: shouldAdjustDifficulty.adjust ? newDifficulty : null,
    feedback: generatePersonalizedFeedback(isCorrect, currentQuestion.difficulty, session.adaptiveScore)
  })
}

async function getNextQuestion(sessionId: string) {
  const session = assessmentSessions.get(sessionId)
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }
  
  session.currentQuestionIndex++
  
  if (session.currentQuestionIndex >= session.questions.length) {
    // Assessment completed
    session.completed = true
    return NextResponse.json({
      success: true,
      completed: true,
      message: 'Assessment completed'
    })
  }
  
  const nextQuestion = session.questions[session.currentQuestionIndex]
  
  return NextResponse.json({
    success: true,
    question: nextQuestion,
    questionNumber: session.currentQuestionIndex + 1,
    totalQuestions: session.questions.length,
    currentDifficulty: session.currentDifficulty,
    progress: Math.round(((session.currentQuestionIndex + 1) / session.questions.length) * 100)
  })
}

async function completeAssessment(sessionId: string) {
  const session = assessmentSessions.get(sessionId)
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }
  
  session.completed = true
  session.timeSpent = Date.now() - new Date(session.startTime).getTime()
  
  const results = generateAssessmentResults(session)
  
  return NextResponse.json({
    success: true,
    results,
    sessionId
  })
}

async function getAssessmentResults(sessionId: string) {
  const session = assessmentSessions.get(sessionId)
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }
  
  if (!session.completed) {
    return NextResponse.json({ error: 'Assessment not completed' }, { status: 400 })
  }
  
  const results = generateAssessmentResults(session)
  
  return NextResponse.json({
    success: true,
    results
  })
}

// Helper functions
function generateAdaptiveQuestions(topic: string, difficulty: string, count: number): AdaptiveQuestion[] {
  const questions: AdaptiveQuestion[] = []
  
  for (let i = 0; i < count; i++) {
    const question: AdaptiveQuestion = {
      id: `q_${Date.now()}_${i}`,
      question: `${difficulty} level question about ${topic} - Question ${i + 1}`,
      type: 'multiple-choice',
      difficulty: difficulty as 'beginner' | 'intermediate' | 'advanced',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      explanation: `This is the explanation for the ${difficulty} ${topic} question`,
      topic,
      timeLimit: difficulty === 'beginner' ? 60 : difficulty === 'intermediate' ? 90 : 120,
      points: difficulty === 'beginner' ? 10 : difficulty === 'intermediate' ? 15 : 20,
      hints: [`Hint for ${topic} question`, `Consider the ${difficulty} level concepts`]
    }
    questions.push(question)
  }
  
  return questions
}

function evaluateAnswer(question: AdaptiveQuestion, answer: any): boolean {
  if (question.type === 'multiple-choice') {
    return answer.selectedOption === question.correctAnswer
  }
  // Add other question type evaluations
  return false
}

function calculateAdaptiveScore(answers: any[]): number {
  if (answers.length === 0) return 0
  
  const totalPoints = answers.reduce((sum, answer) => {
    return sum + (answer.isCorrect ? 10 : 0)
  }, 0)
  
  const maxPoints = answers.length * 10
  return Math.round((totalPoints / maxPoints) * 100)
}

function shouldAdjustDifficultyLevel(recentAnswers: any[]): { adjust: boolean, newLevel?: string } {
  if (recentAnswers.length < 3) return { adjust: false }
  
  const correctCount = recentAnswers.filter(a => a.isCorrect).length
  const accuracy = correctCount / recentAnswers.length
  
  if (accuracy >= 0.8) {
    return { adjust: true, newLevel: 'advanced' }
  } else if (accuracy <= 0.4) {
    return { adjust: true, newLevel: 'beginner' }
  }
  
  return { adjust: false }
}

function generatePersonalizedFeedback(isCorrect: boolean, difficulty: string, currentScore: number): string {
  if (isCorrect) {
    if (currentScore > 80) {
      return "Excellent! You're mastering this topic. Ready for more challenging questions?"
    } else {
      return "Good job! Keep up the steady progress."
    }
  } else {
    if (currentScore < 40) {
      return "Don't worry! Let's review the fundamentals and try some easier questions."
    } else {
      return "Close! Review the explanation and try to understand the concept better."
    }
  }
}

function calculateEstimatedDuration(questions: AdaptiveQuestion[]): number {
  return questions.reduce((total, q) => total + q.timeLimit, 0)
}

function generateAssessmentResults(session: AssessmentSession) {
  const correctAnswers = session.answers.filter(a => a.isCorrect).length
  const totalQuestions = session.answers.length
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0
  
  const difficultyProgression = analyzeDifficultyProgression(session.answers)
  const topicMastery = analyzeTopicMastery(session.answers, session.topic)
  const recommendations = generateRecommendations(accuracy, session.currentDifficulty, session.topic)
  
  return {
    sessionId: session.id,
    topic: session.topic,
    totalQuestions,
    correctAnswers,
    accuracy: Math.round(accuracy),
    finalDifficulty: session.currentDifficulty,
    timeSpent: Math.round(session.timeSpent / 1000 / 60), // minutes
    difficultyProgression,
    topicMastery,
    recommendations,
    completedAt: new Date().toISOString()
  }
}

function analyzeDifficultyProgression(answers: any[]) {
  return {
    startedAt: 'beginner',
    endedAt: 'intermediate',
    adjustments: 2,
    trend: 'improving'
  }
}

function analyzeTopicMastery(answers: any[], topic: string) {
  return {
    topic,
    masteryLevel: 'intermediate',
    strongAreas: ['Basic concepts', 'Syntax'],
    weakAreas: ['Advanced patterns', 'Best practices'],
    readyForNext: true
  }
}

function generateRecommendations(accuracy: number, difficulty: string, topic: string) {
  const recommendations = []
  
  if (accuracy < 60) {
    recommendations.push(`Review ${topic} fundamentals`)
    recommendations.push('Practice with easier exercises')
  } else if (accuracy > 85) {
    recommendations.push(`Try advanced ${topic} challenges`)
    recommendations.push('Consider learning related topics')
  } else {
    recommendations.push(`Continue practicing ${topic}`)
    recommendations.push('Focus on weak areas identified')
  }
  
  return recommendations
}

// GET endpoint for assessment info
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('sessionId')
  
  if (sessionId) {
    const session = assessmentSessions.get(sessionId)
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        topic: session.topic,
        progress: Math.round(((session.currentQuestionIndex + 1) / session.questions.length) * 100),
        currentDifficulty: session.currentDifficulty,
        score: session.adaptiveScore,
        completed: session.completed
      }
    })
  }
  
  return NextResponse.json({
    success: true,
    description: 'Adaptive Assessment API',
    features: [
      'Real-time difficulty adjustment',
      'Personalized feedback',
      'Comprehensive results analysis',
      'Topic mastery evaluation'
    ]
  })
}
