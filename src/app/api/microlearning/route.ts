import { NextRequest, NextResponse } from 'next/server'
import { aiMicrolearningEngine } from '@/lib/ai-microlearning-engine'

// 🧩 AI Microlearning Engine API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, userId, topic, userProfile, chunkId, performance, learningStyle } = body

    switch (action) {
      case 'create-chunks':
        if (!topic) {
          return NextResponse.json(
            { error: 'Topic is required' },
            { status: 400 }
          )
        }

        const complexity = body.complexity || 'intermediate'
        const targetChunkCount = body.targetChunkCount || 8

        const chunks = await aiMicrolearningEngine.createMicrolearningChunks(
          topic,
          complexity,
          targetChunkCount
        )

        return NextResponse.json({
          success: true,
          data: chunks,
          count: chunks.length,
          topic,
          complexity,
          timestamp: new Date().toISOString()
        })

      case 'update-spaced-repetition':
        if (!userId || !chunkId || !performance) {
          return NextResponse.json(
            { error: 'User ID, chunk ID, and performance data are required' },
            { status: 400 }
          )
        }

        const spacedRepetitionUpdate = await aiMicrolearningEngine.updateSpacedRepetition(
          userId,
          chunkId,
          performance
        )

        return NextResponse.json({
          success: true,
          data: spacedRepetitionUpdate,
          timestamp: new Date().toISOString()
        })

      case 'generate-path':
        if (!userId || !topic || !userProfile) {
          return NextResponse.json(
            { error: 'User ID, topic, and user profile are required' },
            { status: 400 }
          )
        }

        const learningPath = await aiMicrolearningEngine.generatePersonalizedPath(
          userId,
          topic,
          userProfile
        )

        return NextResponse.json({
          success: true,
          data: learningPath,
          timestamp: new Date().toISOString()
        })

      case 'get-due-chunks':
        if (!userId) {
          return NextResponse.json(
            { error: 'User ID is required' },
            { status: 400 }
          )
        }

        const dueChunks = await aiMicrolearningEngine.getChunksDueForReview(userId)

        return NextResponse.json({
          success: true,
          data: dueChunks,
          count: dueChunks.length,
          timestamp: new Date().toISOString()
        })

      case 'adapt-content':
        if (!body.chunk || !learningStyle) {
          return NextResponse.json(
            { error: 'Chunk data and learning style are required' },
            { status: 400 }
          )
        }

        const adaptedChunk = await aiMicrolearningEngine.adaptContentForLearningStyle(
          body.chunk,
          learningStyle
        )

        return NextResponse.json({
          success: true,
          data: adaptedChunk,
          adaptedFor: learningStyle,
          timestamp: new Date().toISOString()
        })

      case 'batch-create':
        if (!body.topics || !Array.isArray(body.topics)) {
          return NextResponse.json(
            { error: 'Topics array is required' },
            { status: 400 }
          )
        }

        const batchResults = await Promise.all(
          body.topics.map(async (topicData: any) => {
            const chunks = await aiMicrolearningEngine.createMicrolearningChunks(
              topicData.topic,
              topicData.complexity || 'intermediate',
              topicData.targetChunkCount || 6
            )
            return {
              topic: topicData.topic,
              chunks,
              count: chunks.length
            }
          })
        )

        return NextResponse.json({
          success: true,
          data: batchResults,
          totalTopics: batchResults.length,
          totalChunks: batchResults.reduce((sum, result) => sum + result.count, 0),
          timestamp: new Date().toISOString()
        })

      case 'get-analytics':
        if (!userId) {
          return NextResponse.json(
            { error: 'User ID is required' },
            { status: 400 }
          )
        }

        // This would typically fetch from database
        const analytics = {
          userId,
          totalChunksCompleted: 0,
          totalTimeSpent: 0,
          averageScore: 0,
          masteryDistribution: {
            novice: 0,
            developing: 0,
            proficient: 0,
            expert: 0
          },
          learningVelocity: 0,
          retentionRate: 0,
          strugglingTopics: [],
          strongTopics: [],
          upcomingReviews: 0,
          streakDays: 0
        }

        return NextResponse.json({
          success: true,
          data: analytics,
          timestamp: new Date().toISOString()
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: create-chunks, update-spaced-repetition, generate-path, get-due-chunks, adapt-content, batch-create, or get-analytics' },
          { status: 400 }
        )
    }
  } catch (error: any) {
    console.error('Error in microlearning engine:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Microlearning operation failed',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// 📊 Get microlearning capabilities and information
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const info = searchParams.get('info')

    if (info === 'capabilities') {
      return NextResponse.json({
        success: true,
        capabilities: {
          chunkCreation: {
            description: 'Break complex topics into digestible microlearning chunks',
            features: [
              'AI-powered content chunking',
              'Difficulty-based adaptation',
              'Interactive exercises generation',
              'Assessment question creation',
              'Prerequisite mapping'
            ],
            chunkSizes: '5-15 minutes each',
            supportedComplexity: ['beginner', 'intermediate', 'advanced'],
            maxChunksPerTopic: 20
          },
          spacedRepetition: {
            description: 'Adaptive spaced repetition using SM-2 algorithm',
            features: [
              'Performance-based scheduling',
              'Mastery level tracking',
              'Difficulty adjustment',
              'Retention optimization'
            ],
            algorithm: 'SM-2 with adaptive modifications',
            masteryLevels: ['novice', 'developing', 'proficient', 'expert']
          },
          personalizedPaths: {
            description: 'Generate customized learning paths based on user profile',
            factors: [
              'Skill level assessment',
              'Learning style preferences',
              'Available time constraints',
              'Weak area prioritization',
              'Goal alignment'
            ],
            adaptiveFeatures: [
              'Pace adjustment',
              'Difficulty preference',
              'Session length optimization',
              'Content style adaptation'
            ]
          },
          contentAdaptation: {
            description: 'Adapt content for different learning styles',
            learningStyles: ['visual', 'auditory', 'kinesthetic', 'reading'],
            adaptations: {
              visual: 'Diagrams, flowcharts, code visualizations',
              auditory: 'Audio explanations, verbal mnemonics',
              kinesthetic: 'Hands-on exercises, interactive elements',
              reading: 'Detailed text, comprehensive documentation'
            }
          },
          analytics: {
            description: 'Comprehensive learning analytics and insights',
            metrics: [
              'Completion rates',
              'Time spent tracking',
              'Score analysis',
              'Mastery progression',
              'Retention rates',
              'Learning velocity'
            ],
            insights: [
              'Struggling topic identification',
              'Strength area recognition',
              'Optimal review scheduling',
              'Performance predictions'
            ]
          }
        },
        availableActions: [
          'create-chunks',
          'update-spaced-repetition',
          'generate-path',
          'get-due-chunks',
          'adapt-content',
          'batch-create',
          'get-analytics'
        ]
      })
    }

    if (info === 'learning-styles') {
      return NextResponse.json({
        success: true,
        learningStyles: {
          visual: {
            description: 'Learn through seeing and visualizing',
            characteristics: ['Prefer diagrams and charts', 'Remember faces better than names', 'Like colorful displays'],
            adaptations: ['Infographics', 'Code visualizations', 'Flowcharts', 'Mind maps']
          },
          auditory: {
            description: 'Learn through hearing and speaking',
            characteristics: ['Prefer verbal instructions', 'Remember names better than faces', 'Like discussions'],
            adaptations: ['Audio explanations', 'Verbal mnemonics', 'Discussion prompts', 'Sound cues']
          },
          kinesthetic: {
            description: 'Learn through doing and touching',
            characteristics: ['Prefer hands-on activities', 'Learn by trial and error', 'Like physical movement'],
            adaptations: ['Interactive exercises', 'Coding challenges', 'Physical analogies', 'Step-by-step practice']
          },
          reading: {
            description: 'Learn through reading and writing',
            characteristics: ['Prefer written instructions', 'Like taking notes', 'Enjoy reading documentation'],
            adaptations: ['Detailed text', 'Written examples', 'Documentation', 'Note-taking exercises']
          }
        }
      })
    }

    // Default: Return usage information
    return NextResponse.json({
      success: true,
      message: 'AI Microlearning Engine API',
      description: 'Break complex topics into digestible chunks with adaptive spaced repetition',
      usage: {
        POST: {
          description: 'Execute microlearning operations',
          actions: [
            {
              action: 'create-chunks',
              description: 'Break a topic into microlearning chunks',
              parameters: ['topic', 'complexity?', 'targetChunkCount?']
            },
            {
              action: 'update-spaced-repetition',
              description: 'Update spaced repetition schedule based on performance',
              parameters: ['userId', 'chunkId', 'performance']
            },
            {
              action: 'generate-path',
              description: 'Generate personalized learning path',
              parameters: ['userId', 'topic', 'userProfile']
            },
            {
              action: 'get-due-chunks',
              description: 'Get chunks due for review',
              parameters: ['userId']
            },
            {
              action: 'adapt-content',
              description: 'Adapt content for specific learning style',
              parameters: ['chunk', 'learningStyle']
            },
            {
              action: 'batch-create',
              description: 'Create chunks for multiple topics',
              parameters: ['topics']
            },
            {
              action: 'get-analytics',
              description: 'Get learning analytics for user',
              parameters: ['userId']
            }
          ]
        },
        GET: {
          description: 'Get API information and capabilities',
          parameters: [
            '?info=capabilities - Get detailed capabilities',
            '?info=learning-styles - Get learning style information'
          ]
        }
      },
      examples: {
        createChunks: {
          action: 'create-chunks',
          topic: 'React Hooks',
          complexity: 'intermediate',
          targetChunkCount: 6
        },
        updateSpacedRepetition: {
          action: 'update-spaced-repetition',
          userId: 'user123',
          chunkId: 'chunk456',
          performance: {
            score: 85,
            timeSpent: 12,
            difficulty: 'medium'
          }
        },
        generatePath: {
          action: 'generate-path',
          userId: 'user123',
          topic: 'Full Stack Development',
          userProfile: {
            skillLevel: 'intermediate',
            learningStyle: 'visual',
            availableTime: 45,
            goals: ['Build web applications'],
            weakAreas: ['databases'],
            strongAreas: ['frontend']
          }
        },
        adaptContent: {
          action: 'adapt-content',
          chunk: { /* chunk object */ },
          learningStyle: 'visual'
        }
      }
    })

  } catch (error: any) {
    console.error('Error in microlearning GET:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get microlearning info',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
