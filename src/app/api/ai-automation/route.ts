import { NextRequest, NextResponse } from 'next/server'
import { aiAutomation } from '@/lib/ai-automation'
import { createAIBrain, createDefaultUserProfile } from '@/lib/ai-brain'

// 🤖 AI Automation API - Advanced Learning Automation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, userId, userProfile, data } = body

    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      )
    }

    const profile = userProfile || createDefaultUserProfile(userId || 'demo-user')
    let result

    switch (action) {
      case 'generate-exercises':
        result = await aiAutomation.generateAdvancedExercises(
          data.topic,
          data.userLevel || profile.skillLevel,
          data.learningStyle || profile.learningStyle,
          data.count || 5
        )
        break

      case 'plan-study-session':
        result = await aiAutomation.planOptimalStudySession(
          profile,
          data.availableTime || 60,
          data.goals || profile.goals
        )
        break

      case 'generate-analytics':
        result = await aiAutomation.generateProgressAnalytics(
          userId || 'demo-user',
          data.timeframe || '30days'
        )
        break

      case 'find-study-partners':
        result = await aiAutomation.findStudyPartners(
          profile,
          data.preferences || {}
        )
        break

      case 'generate-smart-goals':
        result = await aiAutomation.generateSmartGoals(
          profile,
          data.interests || profile.interests,
          data.timeframe || '3months'
        )
        break

      case 'schedule-notifications':
        result = await aiAutomation.scheduleSmartNotifications(
          userId || 'demo-user',
          data.learningPattern || { peakHours: ['9:00', '14:00', '19:00'] }
        )
        break

      case 'adjust-difficulty':
        result = await aiAutomation.adjustDifficulty(
          userId || 'demo-user',
          data.currentPerformance || 75
        )
        break

      case 'generate-study-summary':
        result = await aiAutomation.generateStudySummary(
          data.completedTopics || profile.completedTopics,
          data.timeSpent || 120
        )
        break

      case 'curate-content':
        result = await aiAutomation.curateContent(
          data.userInterests || profile.interests,
          data.skillLevel || profile.skillLevel
        )
        break

      case 'track-progress':
        result = await aiAutomation.trackProgress(
          userId || 'demo-user',
          data.activity || { type: 'quiz_completed', duration: 30, score: 85 }
        )
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      action,
      data: result,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Error in AI automation:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'AI automation failed',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// GET endpoint for automation capabilities and status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'capabilities') {
      return NextResponse.json({
        success: true,
        capabilities: {
          exerciseGeneration: {
            description: 'Generate personalized exercises based on learning style and skill level',
            supportedStyles: ['visual', 'kinesthetic', 'auditory', 'reading'],
            supportedLevels: ['beginner', 'intermediate', 'advanced'],
            maxExercises: 10
          },
          studyPlanning: {
            description: 'Create optimal study sessions with breaks and activities',
            minDuration: 15,
            maxDuration: 240,
            includesBreaks: true,
            adaptiveStructure: true
          },
          progressAnalytics: {
            description: 'Comprehensive learning analytics with predictions',
            timeframes: ['7days', '30days', '90days', '1year'],
            includesPredictions: true,
            includesRecommendations: true
          },
          peerMatching: {
            description: 'Find compatible study partners',
            matchingCriteria: ['interests', 'skill-level', 'schedule', 'learning-style'],
            maxMatches: 5
          },
          goalGeneration: {
            description: 'Create SMART learning goals with milestones',
            supportedTimeframes: ['1month', '3months', '6months', '1year'],
            includesMilestones: true,
            trackingMetrics: true
          },
          smartNotifications: {
            description: 'Intelligent notification scheduling based on learning patterns',
            personalizedTiming: true,
            adaptiveFrequency: true,
            contextAware: true
          }
        }
      })
    }

    if (action === 'status') {
      return NextResponse.json({
        success: true,
        status: {
          systemHealth: 'operational',
          activeAutomations: 6,
          lastUpdated: new Date().toISOString(),
          features: {
            exerciseGeneration: 'active',
            studyPlanning: 'active',
            progressAnalytics: 'active',
            peerMatching: 'active',
            goalGeneration: 'active',
            smartNotifications: 'active'
          }
        }
      })
    }

    // Default: Return available actions
    return NextResponse.json({
      success: true,
      availableActions: [
        'generate-exercises',
        'plan-study-session',
        'generate-analytics',
        'find-study-partners',
        'generate-smart-goals',
        'schedule-notifications',
        'adjust-difficulty',
        'generate-study-summary',
        'curate-content',
        'track-progress'
      ],
      description: 'AI Automation API for advanced learning features',
      usage: 'POST with action and relevant data parameters'
    })

  } catch (error: any) {
    console.error('Error in AI automation GET:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get automation info',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// PUT endpoint for updating automation settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, settings } = body

    if (!userId || !settings) {
      return NextResponse.json(
        { error: 'User ID and settings are required' },
        { status: 400 }
      )
    }

    // Mock settings update - in production, save to database
    const updatedSettings = {
      userId,
      automationEnabled: settings.automationEnabled ?? true,
      notificationFrequency: settings.notificationFrequency || 'moderate',
      difficultyAdjustment: settings.difficultyAdjustment || 'automatic',
      contentCuration: settings.contentCuration || 'personalized',
      studyReminders: settings.studyReminders ?? true,
      progressReports: settings.progressReports || 'weekly',
      peerMatching: settings.peerMatching ?? false,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      message: 'Automation settings updated successfully',
      settings: updatedSettings
    })

  } catch (error: any) {
    console.error('Error updating automation settings:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update settings',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// DELETE endpoint for disabling specific automations
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const automation = searchParams.get('automation')

    if (!userId || !automation) {
      return NextResponse.json(
        { error: 'User ID and automation type are required' },
        { status: 400 }
      )
    }

    // Mock disable automation - in production, update database
    return NextResponse.json({
      success: true,
      message: `${automation} automation disabled for user ${userId}`,
      disabledAt: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Error disabling automation:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to disable automation',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
