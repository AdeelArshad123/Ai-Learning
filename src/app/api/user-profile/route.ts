import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock database - replace with your actual database
let userProfiles = new Map()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.user.email
    const profile = userProfiles.get(userEmail) || {
      email: userEmail,
      name: session.user.name || 'User',
      avatar: session.user.image || null,
      preferences: {
        theme: 'system',
        notifications: true,
        emailUpdates: false,
        difficulty: 'Beginner',
        learningGoals: [],
        timezone: 'UTC'
      },
      stats: {
        totalTimeSpent: 0,
        quizzesTaken: 0,
        topicsCompleted: 0,
        averageScore: 0,
        joinDate: new Date().toISOString()
      },
      achievements: [],
      badges: []
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.user.email
    const body = await request.json()
    const { name, preferences, stats, achievements } = body

    const currentProfile = userProfiles.get(userEmail) || {
      email: userEmail,
      name: session.user.name || 'User',
      avatar: session.user.image || null,
      preferences: {
        theme: 'system',
        notifications: true,
        emailUpdates: false,
        difficulty: 'Beginner',
        learningGoals: [],
        timezone: 'UTC'
      },
      stats: {
        totalTimeSpent: 0,
        quizzesTaken: 0,
        topicsCompleted: 0,
        averageScore: 0,
        joinDate: new Date().toISOString()
      },
      achievements: [],
      badges: []
    }

    // Update profile fields
    if (name) currentProfile.name = name
    if (preferences) currentProfile.preferences = { ...currentProfile.preferences, ...preferences }
    if (stats) currentProfile.stats = { ...currentProfile.stats, ...stats }
    if (achievements) currentProfile.achievements = achievements

    // Update badges based on achievements
    if (currentProfile.stats.quizzesTaken >= 10) {
      if (!currentProfile.badges.includes('Quiz Master')) {
        currentProfile.badges.push('Quiz Master')
      }
    }

    if (currentProfile.stats.topicsCompleted >= 5) {
      if (!currentProfile.badges.includes('Topic Explorer')) {
        currentProfile.badges.push('Topic Explorer')
      }
    }

    if (currentProfile.stats.averageScore >= 85) {
      if (!currentProfile.badges.includes('High Achiever')) {
        currentProfile.badges.push('High Achiever')
      }
    }

    userProfiles.set(userEmail, currentProfile)

    return NextResponse.json(currentProfile)
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.user.email
    userProfiles.delete(userEmail)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 