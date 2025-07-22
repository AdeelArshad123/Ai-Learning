import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock analytics data - replace with your actual database
let analyticsData = new Map()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.user.email
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'week' // week, month, year

    const userAnalytics = analyticsData.get(userEmail) || {
      learningTime: {
        daily: [],
        weekly: [],
        monthly: []
      },
      quizPerformance: {
        scores: [],
        topics: [],
        trends: []
      },
      topicProgress: {
        completed: [],
        inProgress: [],
        planned: []
      },
      engagement: {
        sessions: [],
        pageViews: [],
        interactions: []
      }
    }

    // Generate mock data for demonstration
    const mockData = generateMockAnalytics(period, userAnalytics)

    return NextResponse.json(mockData)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.user.email
    const body = await request.json()
    const { type, data } = body

    const currentAnalytics = analyticsData.get(userEmail) || {
      learningTime: { daily: [], weekly: [], monthly: [] },
      quizPerformance: { scores: [], topics: [], trends: [] },
      topicProgress: { completed: [], inProgress: [], planned: [] },
      engagement: { sessions: [], pageViews: [], interactions: [] }
    }

    // Update analytics based on type
    switch (type) {
      case 'learning_time':
        currentAnalytics.learningTime.daily.push({
          date: new Date().toISOString(),
          minutes: data.minutes,
          topic: data.topic
        })
        break
      
      case 'quiz_result':
        currentAnalytics.quizPerformance.scores.push({
          date: new Date().toISOString(),
          score: data.score,
          topic: data.topic,
          totalQuestions: data.totalQuestions
        })
        break
      
      case 'topic_progress':
        if (data.status === 'completed') {
          currentAnalytics.topicProgress.completed.push({
            topic: data.topic,
            completedAt: new Date().toISOString()
          })
        } else if (data.status === 'started') {
          currentAnalytics.topicProgress.inProgress.push({
            topic: data.topic,
            startedAt: new Date().toISOString(),
            progress: data.progress || 0
          })
        }
        break
      
      case 'engagement':
        currentAnalytics.engagement.sessions.push({
          startTime: new Date().toISOString(),
          duration: data.duration,
          pages: data.pages || []
        })
        break
    }

    analyticsData.set(userEmail, currentAnalytics)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateMockAnalytics(period: string, userAnalytics: any) {
  const now = new Date()
  const days = period === 'week' ? 7 : period === 'month' ? 30 : 365

  // Generate learning time data
  const learningTimeData = Array.from({ length: days }, (_, i) => {
    const date = new Date(now.getTime() - (days - i - 1) * 24 * 60 * 60 * 1000)
    return {
      date: date.toISOString().split('T')[0],
      minutes: Math.floor(Math.random() * 120) + 10,
      topics: ['JavaScript', 'React', 'Python', 'AI/ML'][Math.floor(Math.random() * 4)]
    }
  })

  // Generate quiz performance data
  const quizData = Array.from({ length: days }, (_, i) => {
    const date = new Date(now.getTime() - (days - i - 1) * 24 * 60 * 60 * 1000)
    return {
      date: date.toISOString().split('T')[0],
      score: Math.floor(Math.random() * 40) + 60, // 60-100
      quizzesTaken: Math.floor(Math.random() * 3) + 1
    }
  })

  // Generate topic progress
  const topics = ['JavaScript Fundamentals', 'React Basics', 'Python Programming', 'AI Introduction']
  const topicProgress = topics.map(topic => ({
    topic,
    progress: Math.floor(Math.random() * 100),
    status: Math.random() > 0.5 ? 'completed' : 'in-progress'
  }))

  // Generate engagement metrics
  const engagementData = {
    totalSessions: Math.floor(Math.random() * 50) + 20,
    averageSessionTime: Math.floor(Math.random() * 30) + 15,
    totalPageViews: Math.floor(Math.random() * 200) + 100,
    favoriteTopics: ['JavaScript', 'React', 'Python'],
    learningStreak: Math.floor(Math.random() * 10) + 1
  }

  return {
    learningTime: {
      data: learningTimeData,
      total: learningTimeData.reduce((sum, day) => sum + day.minutes, 0),
      average: Math.floor(learningTimeData.reduce((sum, day) => sum + day.minutes, 0) / days)
    },
    quizPerformance: {
      data: quizData,
      averageScore: Math.floor(quizData.reduce((sum, day) => sum + day.score, 0) / days),
      totalQuizzes: quizData.reduce((sum, day) => sum + day.quizzesTaken, 0)
    },
    topicProgress: {
      data: topicProgress,
      completed: topicProgress.filter(t => t.status === 'completed').length,
      inProgress: topicProgress.filter(t => t.status === 'in-progress').length
    },
    engagement: engagementData,
    insights: generateInsights(learningTimeData, quizData, topicProgress)
  }
}

function generateInsights(learningTime: any[], quizData: any[], topicProgress: any[]) {
  const insights = []
  
  // Learning time insights
  const avgLearningTime = learningTime.reduce((sum, day) => sum + day.minutes, 0) / learningTime.length
  if (avgLearningTime > 60) {
    insights.push('Great job! You\'re spending over an hour learning daily.')
  } else if (avgLearningTime < 30) {
    insights.push('Try to increase your daily learning time to see better progress.')
  }

  // Quiz performance insights
  const avgScore = quizData.reduce((sum, day) => sum + day.score, 0) / quizData.length
  if (avgScore > 85) {
    insights.push('Excellent quiz performance! Keep up the great work.')
  } else if (avgScore < 70) {
    insights.push('Consider reviewing previous topics to improve your quiz scores.')
  }

  // Topic progress insights
  const completedTopics = topicProgress.filter(t => t.status === 'completed').length
  if (completedTopics >= 3) {
    insights.push('You\'ve completed multiple topics! Consider exploring advanced concepts.')
  }

  return insights
} 