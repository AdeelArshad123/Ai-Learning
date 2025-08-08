import { NextRequest, NextResponse } from 'next/server'
import { aiContentGenerator } from '@/lib/ai-content-generator'

// 🚀 AI Content Generation API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, technology, targetAudience, count } = body

    switch (action) {
      case 'scan-trends':
        const trends = await aiContentGenerator.scanTrendingTechnologies()
        return NextResponse.json({
          success: true,
          data: trends,
          timestamp: new Date().toISOString()
        })

      case 'generate-content':
        if (!technology) {
          return NextResponse.json(
            { error: 'Technology parameter is required' },
            { status: 400 }
          )
        }
        
        const content = await aiContentGenerator.generateLearningContent(
          technology,
          targetAudience || 'intermediate'
        )
        
        return NextResponse.json({
          success: true,
          data: content,
          timestamp: new Date().toISOString()
        })

      case 'weekly-update':
        const weeklyContent = await aiContentGenerator.generateWeeklyContentUpdate()
        return NextResponse.json({
          success: true,
          data: weeklyContent,
          count: weeklyContent.length,
          timestamp: new Date().toISOString()
        })

      case 'batch-generate':
        const batchCount = Math.min(count || 5, 10) // Limit to 10 for performance
        const trends = await aiContentGenerator.scanTrendingTechnologies()
        const topTrends = trends.slice(0, batchCount)
        
        const batchContent = await Promise.all(
          topTrends.map(tech => 
            aiContentGenerator.generateLearningContent(tech, targetAudience || 'intermediate')
          )
        )
        
        return NextResponse.json({
          success: true,
          data: batchContent,
          count: batchContent.length,
          timestamp: new Date().toISOString()
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: scan-trends, generate-content, weekly-update, or batch-generate' },
          { status: 400 }
        )
    }
  } catch (error: any) {
    console.error('Error in content generation:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Content generation failed',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// 📊 Get content generation capabilities and status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const info = searchParams.get('info')

    if (info === 'capabilities') {
      return NextResponse.json({
        success: true,
        capabilities: {
          trendScanning: {
            description: 'Scan trending technologies from GitHub, Stack Overflow, and Hacker News',
            sources: ['GitHub', 'Stack Overflow', 'Hacker News'],
            updateFrequency: 'Daily',
            maxResults: 20
          },
          contentGeneration: {
            description: 'Generate comprehensive learning content with exercises and quizzes',
            supportedAudiences: ['beginner', 'intermediate', 'advanced'],
            contentTypes: ['lessons', 'exercises', 'quizzes'],
            languages: ['JavaScript', 'Python', 'TypeScript', 'React', 'Node.js', 'Docker', 'Kubernetes']
          },
          automation: {
            description: 'Automated weekly content updates and batch generation',
            weeklyUpdates: true,
            batchGeneration: true,
            maxBatchSize: 10
          }
        },
        availableActions: [
          'scan-trends',
          'generate-content', 
          'weekly-update',
          'batch-generate'
        ]
      })
    }

    if (info === 'status') {
      // Check system status
      const trends = await aiContentGenerator.scanTrendingTechnologies()
      return NextResponse.json({
        success: true,
        status: {
          systemHealth: 'healthy',
          trendsAvailable: trends.length,
          lastUpdate: new Date().toISOString(),
          apiConnections: {
            openai: !!process.env.OPENAI_API_KEY,
            github: true, // Public API
            stackoverflow: true, // Public API
            hackernews: true // Public API
          }
        }
      })
    }

    // Default: Return usage information
    return NextResponse.json({
      success: true,
      message: 'AI Content Generation API',
      usage: {
        POST: {
          description: 'Generate content or scan trends',
          actions: [
            {
              action: 'scan-trends',
              description: 'Get trending technologies from multiple sources'
            },
            {
              action: 'generate-content',
              description: 'Generate learning content for a specific technology',
              parameters: ['technology', 'targetAudience']
            },
            {
              action: 'weekly-update',
              description: 'Generate content for top 5 trending technologies'
            },
            {
              action: 'batch-generate',
              description: 'Generate content for multiple technologies',
              parameters: ['count', 'targetAudience']
            }
          ]
        },
        GET: {
          description: 'Get API information and status',
          parameters: [
            '?info=capabilities - Get API capabilities',
            '?info=status - Get system status'
          ]
        }
      },
      examples: {
        scanTrends: {
          method: 'POST',
          body: { action: 'scan-trends' }
        },
        generateContent: {
          method: 'POST',
          body: {
            action: 'generate-content',
            technology: {
              name: 'React',
              category: 'Frontend',
              description: 'JavaScript library for building user interfaces'
            },
            targetAudience: 'intermediate'
          }
        },
        weeklyUpdate: {
          method: 'POST',
          body: { action: 'weekly-update' }
        },
        batchGenerate: {
          method: 'POST',
          body: {
            action: 'batch-generate',
            count: 5,
            targetAudience: 'beginner'
          }
        }
      }
    })

  } catch (error: any) {
    console.error('Error in content generation GET:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get content generation info',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
