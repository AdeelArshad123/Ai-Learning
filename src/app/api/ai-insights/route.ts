import { NextRequest, NextResponse } from 'next/server'
import { AILearningBrain, createAIBrain, createDefaultUserProfile } from '@/lib/ai-brain'

// 🧠 AI Insights API - Provides personalized learning insights
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userProfile, action, data } = body

    // Create or use existing user profile
    const profile = userProfile || createDefaultUserProfile('User')
    const aiBrain = createAIBrain(profile)

    // Generate AI insights
    const insights = aiBrain.generateInsights()
    const recommendations = aiBrain.generateContentRecommendations(5)
    const learningPatterns = aiBrain.analyzeLearningPatterns()

    // Check for new achievements if action provided
    let newAchievements = []
    if (action && data) {
      newAchievements = aiBrain.checkAchievements(action, data)
    }

    // Generate predictive analysis for current goals
    let predictions = []
    if (profile.goals.length > 0) {
      predictions = profile.goals.map(goal => ({
        goal,
        analysis: aiBrain.predictLearningOutcome(goal, '1 month')
      }))
    }

    return NextResponse.json({
      success: true,
      data: {
        insights,
        recommendations,
        learningPatterns,
        newAchievements,
        predictions,
        userLevel: profile.level,
        totalXP: profile.totalXP,
        currentStreak: profile.currentStreak
      },
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Error generating AI insights:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate AI insights',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// 📊 Get user's learning analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const timeframe = searchParams.get('timeframe') || '7days'

    // Mock user profile for demo
    const mockProfile = {
      id: userId || 'demo-user',
      name: 'Demo User',
      learningStyle: 'visual' as const,
      skillLevel: 'intermediate' as const,
      interests: ['JavaScript', 'React', 'Node.js'],
      goals: ['Master React Hooks', 'Build Full-Stack App', 'Learn TypeScript'],
      weakAreas: ['Async Programming', 'Testing'],
      strengths: ['HTML/CSS', 'Basic JavaScript'],
      preferredPace: 'medium' as const,
      optimalLearningTime: ['9:00 AM', '2:00 PM'],
      completedTopics: ['Variables', 'Functions', 'Objects', 'Arrays'],
      currentStreak: 5,
      totalXP: 1250,
      level: 3,
      achievements: [],
      learningPatterns: []
    }

    const aiBrain = createAIBrain(mockProfile)
    
    // Generate comprehensive analytics
    const analytics = {
      overview: {
        totalXP: mockProfile.totalXP,
        currentLevel: mockProfile.level,
        streak: mockProfile.currentStreak,
        completedTopics: mockProfile.completedTopics.length,
        skillLevel: mockProfile.skillLevel
      },
      insights: aiBrain.generateInsights(),
      recommendations: aiBrain.generateContentRecommendations(8),
      predictions: mockProfile.goals.map(goal => ({
        goal,
        analysis: aiBrain.predictLearningOutcome(goal, '1 month')
      })),
      learningPatterns: [
        {
          timeOfDay: '9:00 AM',
          duration: 45,
          topicType: 'Coding Practice',
          successRate: 85,
          engagementLevel: 90,
          completionRate: 88
        },
        {
          timeOfDay: '2:00 PM',
          duration: 30,
          topicType: 'Theory',
          successRate: 78,
          engagementLevel: 75,
          completionRate: 82
        }
      ],
      skillProgress: {
        JavaScript: { level: 75, trend: 'improving' },
        React: { level: 60, trend: 'improving' },
        'Node.js': { level: 45, trend: 'stable' },
        TypeScript: { level: 20, trend: 'new' }
      },
      weeklyStats: {
        timeSpent: 8.5, // hours
        topicsCompleted: 3,
        quizzesTaken: 5,
        projectsStarted: 1,
        averageScore: 82
      },
      nextRecommendations: [
        {
          type: 'urgent',
          title: 'Practice Async/Await',
          reason: 'Identified as weak area',
          estimatedTime: '30 minutes',
          priority: 'high'
        },
        {
          type: 'skill-building',
          title: 'React Hooks Deep Dive',
          reason: 'Aligns with your goals',
          estimatedTime: '45 minutes',
          priority: 'high'
        },
        {
          type: 'project',
          title: 'Build a Todo App with React',
          reason: 'Hands-on practice',
          estimatedTime: '2 hours',
          priority: 'medium'
        }
      ]
    }

    return NextResponse.json({
      success: true,
      data: analytics,
      timeframe,
      generatedAt: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Error fetching AI analytics:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch analytics',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// 🎯 Update user progress and get adaptive recommendations
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, action, data, performanceScore } = body

    // Mock current user profile
    const currentProfile = createDefaultUserProfile('User')
    currentProfile.totalXP = 1250
    currentProfile.level = 3
    currentProfile.currentStreak = 5
    currentProfile.skillLevel = 'intermediate'

    const aiBrain = createAIBrain(currentProfile)

    // Process the action and update profile
    let updatedProfile = { ...currentProfile }
    let adaptiveChanges = {}

    switch (action) {
      case 'topic-completed':
        updatedProfile.completedTopics.push(data.topic)
        updatedProfile.totalXP += data.xpGained || 50
        
        // Adaptive difficulty adjustment
        if (performanceScore) {
          const newDifficulty = aiBrain.adjustDifficulty(data.currentDifficulty, performanceScore)
          adaptiveChanges = {
            recommendedDifficulty: newDifficulty,
            reason: performanceScore >= 90 ? 'Excellent performance - ready for harder challenges' :
                   performanceScore <= 60 ? 'Consider reviewing fundamentals' :
                   'Continue at current level'
          }
        }
        break

      case 'quiz-completed':
        updatedProfile.totalXP += data.score || 25
        if (data.score >= 80) {
          updatedProfile.strengths.push(data.topic)
        } else if (data.score < 60) {
          updatedProfile.weakAreas.push(data.topic)
        }
        break

      case 'daily-login':
        updatedProfile.currentStreak += 1
        updatedProfile.totalXP += 10
        break

      case 'goal-set':
        updatedProfile.goals.push(data.goal)
        break
    }

    // Check for achievements
    const newAchievements = aiBrain.checkAchievements(action, data)
    
    // Generate updated insights
    const updatedBrain = createAIBrain(updatedProfile)
    const insights = updatedBrain.generateInsights()
    const recommendations = updatedBrain.generateContentRecommendations(3)

    return NextResponse.json({
      success: true,
      data: {
        updatedProfile,
        adaptiveChanges,
        newAchievements,
        insights,
        recommendations,
        xpGained: updatedProfile.totalXP - currentProfile.totalXP
      },
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Error updating user progress:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update progress',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
