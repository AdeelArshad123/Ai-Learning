import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock database - replace with your actual database
let userProgress = new Map()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.user.email
    const progress = userProgress.get(userEmail) || {
      quizScores: [],
      completedTopics: [],
      totalScore: 0,
      level: 'Beginner',
      streak: 0,
      lastActivity: null
    }

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error fetching user progress:', error)
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
    const { quizScore, topic, score } = body

    const currentProgress = userProgress.get(userEmail) || {
      quizScores: [],
      completedTopics: [],
      totalScore: 0,
      level: 'Beginner',
      streak: 0,
      lastActivity: null
    }

    // Update quiz scores
    if (quizScore) {
      currentProgress.quizScores.push({
        ...quizScore,
        timestamp: new Date().toISOString()
      })
    }

    // Update completed topics
    if (topic && !currentProgress.completedTopics.includes(topic)) {
      currentProgress.completedTopics.push(topic)
    }

    // Update total score
    if (score) {
      currentProgress.totalScore += score
    }

    // Update level based on total score
    if (currentProgress.totalScore >= 1000) {
      currentProgress.level = 'Advanced'
    } else if (currentProgress.totalScore >= 500) {
      currentProgress.level = 'Intermediate'
    }

    // Update streak
    const today = new Date().toDateString()
    const lastActivity = currentProgress.lastActivity ? new Date(currentProgress.lastActivity).toDateString() : null
    
    if (lastActivity === today) {
      // Already logged activity today
    } else if (lastActivity === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()) {
      // Consecutive day
      currentProgress.streak += 1
    } else {
      // Break in streak
      currentProgress.streak = 1
    }

    currentProgress.lastActivity = new Date().toISOString()

    userProgress.set(userEmail, currentProgress)

    return NextResponse.json(currentProgress)
  } catch (error) {
    console.error('Error updating user progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 