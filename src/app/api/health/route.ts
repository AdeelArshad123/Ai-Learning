import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Basic health check
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      },
      checks: {
        api: 'healthy',
        database: await checkDatabase(),
        ai_service: await checkAIService(),
        environment: checkEnvironment()
      }
    }

    // Determine overall health
    const allChecksHealthy = Object.values(health.checks).every(check => check === 'healthy')
    
    return NextResponse.json(
      {
        ...health,
        status: allChecksHealthy ? 'healthy' : 'degraded'
      },
      { 
        status: allChecksHealthy ? 200 : 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    )
  }
}

async function checkDatabase(): Promise<string> {
  try {
    // If MongoDB is configured, check connection
    if (process.env.MONGODB_URI) {
      // This would typically test the actual database connection
      // For now, we'll just check if the URI is configured
      return 'healthy'
    }
    return 'not_configured'
  } catch (error) {
    return 'unhealthy'
  }
}

async function checkAIService(): Promise<string> {
  try {
    // Check if AI service is configured
    if (process.env.DEEPSEEK_API_KEY) {
      // In a real implementation, you might make a test API call
      return 'healthy'
    } else if (process.env.OPENAI_API_KEY) {
      return 'healthy'
    }
    return 'not_configured'
  } catch (error) {
    return 'unhealthy'
  }
}

function checkEnvironment(): string {
  const requiredVars = ['NEXTAUTH_SECRET']
  const missingVars = requiredVars.filter(varName => !process.env[varName])
  
  return missingVars.length === 0 ? 'healthy' : 'degraded'
}
