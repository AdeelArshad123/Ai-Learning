import { NextRequest, NextResponse } from 'next/server'
import { aiUserJourneyEngine } from '@/lib/ai-user-journey'

// 🛤️ AI User Journey Automation API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, userId, userProfile, data } = body

    switch (action) {
      case 'analyze-github':
        if (!data?.githubUsername) {
          return NextResponse.json(
            { error: 'GitHub username is required' },
            { status: 400 }
          )
        }
        
        const githubAnalysis = await aiUserJourneyEngine.analyzeGitHubProfile(data.githubUsername)
        return NextResponse.json({
          success: true,
          data: githubAnalysis,
          timestamp: new Date().toISOString()
        })

      case 'generate-path':
        if (!userProfile || !data?.goal) {
          return NextResponse.json(
            { error: 'User profile and goal are required' },
            { status: 400 }
          )
        }
        
        const learningPath = await aiUserJourneyEngine.generatePersonalizedPath(
          userProfile,
          data.goal
        )
        
        return NextResponse.json({
          success: true,
          data: learningPath,
          timestamp: new Date().toISOString()
        })

      case 'adjust-difficulty':
        if (!userId || !data?.moduleId || !data?.performance) {
          return NextResponse.json(
            { error: 'User ID, module ID, and performance data are required' },
            { status: 400 }
          )
        }
        
        const difficultyAdjustment = await aiUserJourneyEngine.adjustDifficultyBasedOnPerformance(
          userId,
          data.moduleId,
          data.performance
        )
        
        return NextResponse.json({
          success: true,
          data: difficultyAdjustment,
          timestamp: new Date().toISOString()
        })

      case 'get-recommendations':
        if (!userProfile) {
          return NextResponse.json(
            { error: 'User profile is required' },
            { status: 400 }
          )
        }
        
        const recommendations = await aiUserJourneyEngine.generatePredictiveRecommendations(userProfile)
        
        return NextResponse.json({
          success: true,
          data: recommendations,
          count: recommendations.length,
          timestamp: new Date().toISOString()
        })

      case 'onboard-user':
        // Complete onboarding flow
        let onboardingData: any = {
          profile: userProfile || {},
          recommendations: [],
          suggestedPaths: []
        }

        // Analyze GitHub if provided
        if (data?.githubUsername) {
          const githubData = await aiUserJourneyEngine.analyzeGitHubProfile(data.githubUsername)
          onboardingData.profile = { ...onboardingData.profile, ...githubData }
        }

        // Generate initial recommendations
        if (onboardingData.profile.interests?.length > 0) {
          onboardingData.recommendations = await aiUserJourneyEngine.generatePredictiveRecommendations(
            onboardingData.profile
          )
        }

        // Generate suggested learning paths
        if (data?.goals?.length > 0) {
          const pathPromises = data.goals.slice(0, 3).map((goal: string) =>
            aiUserJourneyEngine.generatePersonalizedPath(onboardingData.profile, goal)
          )
          onboardingData.suggestedPaths = await Promise.all(pathPromises)
        }

        return NextResponse.json({
          success: true,
          data: onboardingData,
          message: 'User onboarding completed successfully',
          timestamp: new Date().toISOString()
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: analyze-github, generate-path, adjust-difficulty, get-recommendations, or onboard-user' },
          { status: 400 }
        )
    }
  } catch (error: any) {
    console.error('Error in user journey automation:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'User journey automation failed',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// 📊 Get user journey capabilities and analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const info = searchParams.get('info')
    const userId = searchParams.get('userId')

    if (info === 'capabilities') {
      return NextResponse.json({
        success: true,
        capabilities: {
          githubAnalysis: {
            description: 'Analyze GitHub profile to assess skills and experience',
            features: ['Language detection', 'Skill level assessment', 'Technology identification', 'Activity analysis'],
            dataPoints: ['Repository count', 'Star count', 'Language usage', 'Recent activity']
          },
          pathGeneration: {
            description: 'Generate personalized learning paths based on user profile and goals',
            features: ['Adaptive modules', 'Difficulty adjustment', 'Time estimation', 'Prerequisites mapping'],
            customization: ['Skill level', 'Learning style', 'Available time', 'Interests']
          },
          difficultyAdjustment: {
            description: 'Automatically adjust content difficulty based on performance',
            metrics: ['Score analysis', 'Time tracking', 'Attempt counting', 'Struggle identification'],
            adjustments: ['Content difficulty', 'Pacing', 'Additional resources', 'Alternative approaches']
          },
          recommendations: {
            description: 'AI-powered predictive recommendations for learning and career growth',
            types: ['Content recommendations', 'Skill gap analysis', 'Career opportunities', 'Project suggestions'],
            factors: ['Market trends', 'User progress', 'Industry demand', 'Personal interests']
          },
          onboarding: {
            description: 'Complete automated onboarding with skill assessment and path suggestions',
            features: ['GitHub integration', 'Skill assessment', 'Goal setting', 'Path recommendations'],
            outputs: ['User profile', 'Recommended paths', 'Initial content', 'Progress tracking']
          }
        },
        availableActions: [
          'analyze-github',
          'generate-path',
          'adjust-difficulty',
          'get-recommendations',
          'onboard-user'
        ]
      })
    }

    if (info === 'analytics' && userId) {
      // Return user journey analytics
      return NextResponse.json({
        success: true,
        analytics: {
          userId,
          journeyMetrics: {
            totalPaths: 0, // Would fetch from database
            completedModules: 0,
            averageScore: 0,
            learningVelocity: 0,
            engagementLevel: 'medium',
            difficultyProgression: 'steady'
          },
          adaptiveChanges: {
            difficultyAdjustments: 0,
            pathModifications: 0,
            contentRecommendations: 0,
            lastAdjustment: null
          },
          predictions: {
            nextMilestone: 'Complete React Fundamentals',
            estimatedCompletion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            skillGrowthRate: 'above average',
            careerReadiness: 75
          }
        },
        timestamp: new Date().toISOString()
      })
    }

    // Default: Return usage information
    return NextResponse.json({
      success: true,
      message: 'AI User Journey Automation API',
      usage: {
        POST: {
          description: 'Execute user journey automation actions',
          actions: [
            {
              action: 'analyze-github',
              description: 'Analyze GitHub profile for skill assessment',
              parameters: ['githubUsername']
            },
            {
              action: 'generate-path',
              description: 'Generate personalized learning path',
              parameters: ['userProfile', 'goal']
            },
            {
              action: 'adjust-difficulty',
              description: 'Adjust content difficulty based on performance',
              parameters: ['userId', 'moduleId', 'performance']
            },
            {
              action: 'get-recommendations',
              description: 'Get AI-powered learning recommendations',
              parameters: ['userProfile']
            },
            {
              action: 'onboard-user',
              description: 'Complete user onboarding with AI assistance',
              parameters: ['userProfile', 'githubUsername', 'goals']
            }
          ]
        },
        GET: {
          description: 'Get API information and user analytics',
          parameters: [
            '?info=capabilities - Get API capabilities',
            '?info=analytics&userId=<id> - Get user journey analytics'
          ]
        }
      },
      examples: {
        analyzeGithub: {
          method: 'POST',
          body: {
            action: 'analyze-github',
            data: { githubUsername: 'octocat' }
          }
        },
        generatePath: {
          method: 'POST',
          body: {
            action: 'generate-path',
            userProfile: {
              skillLevel: 'intermediate',
              interests: ['React', 'Node.js'],
              learningStyle: 'visual',
              availableTime: 60
            },
            data: { goal: 'Full Stack Development' }
          }
        },
        adjustDifficulty: {
          method: 'POST',
          body: {
            action: 'adjust-difficulty',
            userId: 'user123',
            data: {
              moduleId: 'module456',
              performance: {
                score: 65,
                timeSpent: 45,
                attemptsCount: 3,
                struggledAreas: ['async/await', 'promises']
              }
            }
          }
        },
        getRecommendations: {
          method: 'POST',
          body: {
            action: 'get-recommendations',
            userProfile: {
              skillLevel: 'intermediate',
              interests: ['React', 'TypeScript'],
              completedTopics: ['JavaScript Basics', 'React Hooks'],
              weakAreas: ['Testing', 'Performance']
            }
          }
        },
        onboardUser: {
          method: 'POST',
          body: {
            action: 'onboard-user',
            userProfile: {
              name: 'John Doe',
              skillLevel: 'beginner',
              interests: ['Web Development']
            },
            data: {
              githubUsername: 'johndoe',
              goals: ['Learn React', 'Build Portfolio', 'Get Job Ready']
            }
          }
        }
      }
    })

  } catch (error: any) {
    console.error('Error in user journey GET:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get user journey info',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
