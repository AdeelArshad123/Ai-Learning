import { NextRequest, NextResponse } from 'next/server'
import { aiCodePlayground, CodePlaygroundConfig, AIAssistanceRequest } from '@/lib/ai-code-playground'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...params } = body

    switch (action) {
      case 'create-session':
        return await handleCreateSession(params)
      
      case 'update-code':
        return await handleUpdateCode(params)
      
      case 'execute-code':
        return await handleExecuteCode(params)
      
      case 'get-ai-assistance':
        return await handleGetAIAssistance(params)
      
      case 'get-templates':
        return await handleGetTemplates(params)
      
      case 'get-exercises':
        return await handleGetExercises(params)
      
      case 'enable-collaboration':
        return await handleEnableCollaboration(params)
      
      case 'get-analytics':
        return await handleGetAnalytics(params)
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('AI Playground API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleCreateSession(params: { userId: string; config: CodePlaygroundConfig }) {
  const { userId, config } = params
  
  if (!userId || !config) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  const session = await aiCodePlayground.createSession(userId, config)
  
  return NextResponse.json({
    success: true,
    session,
    message: 'Playground session created successfully'
  })
}

async function handleUpdateCode(params: { sessionId: string; code: string }) {
  const { sessionId, code } = params
  
  if (!sessionId || code === undefined) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  await aiCodePlayground.updateCode(sessionId, code)
  
  return NextResponse.json({
    success: true,
    message: 'Code updated successfully'
  })
}

async function handleExecuteCode(params: { sessionId: string; input?: string }) {
  const { sessionId, input } = params
  
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 })
  }

  const execution = await aiCodePlayground.executeCode(sessionId, input)
  
  return NextResponse.json({
    success: true,
    execution,
    message: 'Code execution started'
  })
}

async function handleGetAIAssistance(params: { sessionId: string; request: AIAssistanceRequest }) {
  const { sessionId, request: aiRequest } = params
  
  if (!sessionId || !aiRequest) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  const response = await aiCodePlayground.getAIAssistance(sessionId, aiRequest)
  
  return NextResponse.json({
    success: true,
    response,
    message: 'AI assistance generated'
  })
}

async function handleGetTemplates(params: { language?: string; category?: string }) {
  const { language, category } = params
  
  const templates = aiCodePlayground.getTemplates(language, category)
  
  return NextResponse.json({
    success: true,
    templates,
    count: templates.length
  })
}

async function handleGetExercises(params: { language: string; difficulty?: string }) {
  const { language, difficulty } = params
  
  if (!language) {
    return NextResponse.json({ error: 'Language is required' }, { status: 400 })
  }

  const exercises = aiCodePlayground.getExercises(language, difficulty)
  
  return NextResponse.json({
    success: true,
    exercises,
    count: exercises.length
  })
}

async function handleEnableCollaboration(params: { sessionId: string; collaboratorId: string }) {
  const { sessionId, collaboratorId } = params
  
  if (!sessionId || !collaboratorId) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  await aiCodePlayground.enableCollaboration(sessionId, collaboratorId)
  
  return NextResponse.json({
    success: true,
    message: 'Collaboration enabled successfully'
  })
}

async function handleGetAnalytics(params: { sessionId: string }) {
  const { sessionId } = params
  
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 })
  }

  const analytics = aiCodePlayground.getSessionAnalytics(sessionId)
  
  return NextResponse.json({
    success: true,
    analytics
  })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  try {
    switch (action) {
      case 'get-supported-languages':
        return NextResponse.json({
          success: true,
          languages: [
            { id: 'javascript', name: 'JavaScript', icon: '🟨' },
            { id: 'python', name: 'Python', icon: '🐍' },
            { id: 'java', name: 'Java', icon: '☕' },
            { id: 'cpp', name: 'C++', icon: '⚡' },
            { id: 'go', name: 'Go', icon: '🔵' },
            { id: 'rust', name: 'Rust', icon: '🦀' },
            { id: 'typescript', name: 'TypeScript', icon: '🔷' },
            { id: 'php', name: 'PHP', icon: '🐘' },
            { id: 'ruby', name: 'Ruby', icon: '💎' },
            { id: 'swift', name: 'Swift', icon: '🍎' }
          ]
        })

      case 'get-playground-features':
        return NextResponse.json({
          success: true,
          features: {
            aiAssistance: {
              name: 'AI Code Assistance',
              description: 'Real-time AI-powered code completion and suggestions',
              capabilities: ['Auto-completion', 'Code explanation', 'Bug detection', 'Optimization tips']
            },
            multiLanguage: {
              name: 'Multi-Language Support',
              description: 'Support for 10+ programming languages',
              languages: ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'TypeScript', 'PHP', 'Ruby', 'Swift']
            },
            collaboration: {
              name: 'Real-time Collaboration',
              description: 'Code together with others in real-time',
              features: ['Live cursor tracking', 'Shared execution', 'Chat integration']
            },
            execution: {
              name: 'Secure Code Execution',
              description: 'Run code safely in sandboxed environment',
              features: ['Memory monitoring', 'Execution time tracking', 'Error handling']
            },
            templates: {
              name: 'Code Templates & Exercises',
              description: 'Pre-built templates and coding challenges',
              categories: ['Algorithms', 'Data Structures', 'Web Development', 'Machine Learning']
            }
          }
        })

      case 'get-playground-stats':
        return NextResponse.json({
          success: true,
          stats: {
            totalSessions: 1250,
            activeUsers: 89,
            codeExecutions: 15420,
            aiInteractions: 8930,
            templatesUsed: 340,
            collaborativeSessions: 156,
            averageSessionTime: '24 minutes',
            popularLanguages: [
              { language: 'JavaScript', usage: 35 },
              { language: 'Python', usage: 28 },
              { language: 'Java', usage: 15 },
              { language: 'TypeScript', usage: 12 },
              { language: 'Go', usage: 10 }
            ]
          }
        })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('AI Playground GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
