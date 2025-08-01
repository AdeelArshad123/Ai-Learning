import { NextRequest, NextResponse } from 'next/server'
import { naturalLanguageProgramming, NLPRequest, UserPreferences, CodeContext } from '@/lib/natural-language-programming'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...params } = body

    switch (action) {
      case 'generate-code':
        return await handleGenerateCode(params)
      
      case 'explain-code':
        return await handleExplainCode(params)
      
      case 'translate-code':
        return await handleTranslateCode(params)
      
      case 'optimize-code':
        return await handleOptimizeCode(params)
      
      case 'debug-code':
        return await handleDebugCode(params)
      
      case 'process-conversation':
        return await handleProcessConversation(params)
      
      case 'get-user-analytics':
        return await handleGetUserAnalytics(params)
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Natural Language Programming API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleGenerateCode(params: { 
  input: string; 
  language?: string; 
  context?: CodeContext; 
  preferences?: UserPreferences 
}) {
  const { input, language, context, preferences } = params
  
  if (!input) {
    return NextResponse.json({ error: 'Input description is required' }, { status: 400 })
  }

  const nlpRequest: NLPRequest = {
    id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'code-generation',
    input,
    language: language || 'javascript',
    context,
    preferences,
    timestamp: new Date()
  }

  const response = await naturalLanguageProgramming.generateCode(nlpRequest)
  
  return NextResponse.json({
    success: true,
    response,
    message: 'Code generated successfully'
  })
}

async function handleExplainCode(params: { 
  code: string; 
  language?: string; 
  preferences?: UserPreferences 
}) {
  const { code, language, preferences } = params
  
  if (!code) {
    return NextResponse.json({ error: 'Code is required for explanation' }, { status: 400 })
  }

  const nlpRequest: NLPRequest = {
    id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'code-explanation',
    input: code,
    language: language || 'javascript',
    preferences,
    timestamp: new Date()
  }

  const response = await naturalLanguageProgramming.explainCode(nlpRequest)
  
  return NextResponse.json({
    success: true,
    response,
    message: 'Code explanation generated'
  })
}

async function handleTranslateCode(params: { 
  code: string; 
  fromLanguage: string; 
  toLanguage: string; 
  preferences?: UserPreferences 
}) {
  const { code, fromLanguage, toLanguage, preferences } = params
  
  if (!code || !fromLanguage || !toLanguage) {
    return NextResponse.json({ error: 'Code, source language, and target language are required' }, { status: 400 })
  }

  const nlpRequest: NLPRequest = {
    id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'code-translation',
    input: code,
    language: fromLanguage,
    targetLanguage: toLanguage,
    preferences,
    timestamp: new Date()
  }

  const response = await naturalLanguageProgramming.translateCode(nlpRequest)
  
  return NextResponse.json({
    success: true,
    response,
    message: 'Code translated successfully'
  })
}

async function handleOptimizeCode(params: { 
  code: string; 
  language?: string; 
  context?: CodeContext; 
  preferences?: UserPreferences 
}) {
  const { code, language, context, preferences } = params
  
  if (!code) {
    return NextResponse.json({ error: 'Code is required for optimization' }, { status: 400 })
  }

  const nlpRequest: NLPRequest = {
    id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'code-optimization',
    input: code,
    language: language || 'javascript',
    context,
    preferences,
    timestamp: new Date()
  }

  const response = await naturalLanguageProgramming.optimizeCode(nlpRequest)
  
  return NextResponse.json({
    success: true,
    response,
    message: 'Code optimization completed'
  })
}

async function handleDebugCode(params: { 
  code: string; 
  language?: string; 
  errorMessage?: string; 
  preferences?: UserPreferences 
}) {
  const { code, language, errorMessage, preferences } = params
  
  if (!code) {
    return NextResponse.json({ error: 'Code is required for debugging' }, { status: 400 })
  }

  const input = errorMessage ? `${code}\n\nError: ${errorMessage}` : code

  const nlpRequest: NLPRequest = {
    id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'debugging-help',
    input,
    language: language || 'javascript',
    preferences,
    timestamp: new Date()
  }

  const response = await naturalLanguageProgramming.debugCode(nlpRequest)
  
  return NextResponse.json({
    success: true,
    response,
    message: 'Debugging analysis completed'
  })
}

async function handleProcessConversation(params: { 
  userId: string; 
  message: string; 
  context?: any 
}) {
  const { userId, message, context } = params
  
  if (!userId || !message) {
    return NextResponse.json({ error: 'User ID and message are required' }, { status: 400 })
  }

  const response = await naturalLanguageProgramming.processConversation(userId, message, context)
  
  return NextResponse.json({
    success: true,
    response,
    message: 'Conversation processed'
  })
}

async function handleGetUserAnalytics(params: { userId: string }) {
  const { userId } = params
  
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  const analytics = naturalLanguageProgramming.getUserAnalytics(userId)
  
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
      case 'get-supported-features':
        return NextResponse.json({
          success: true,
          features: {
            codeGeneration: {
              name: 'Code Generation',
              description: 'Generate code from natural language descriptions',
              capabilities: ['Multi-language support', 'Context-aware generation', 'Best practices integration'],
              languages: ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'TypeScript', 'PHP', 'Ruby', 'Swift']
            },
            codeExplanation: {
              name: 'Code Explanation',
              description: 'Understand existing code with detailed explanations',
              capabilities: ['Line-by-line breakdown', 'Concept identification', 'Learning path suggestions']
            },
            codeTranslation: {
              name: 'Code Translation',
              description: 'Convert code between programming languages',
              capabilities: ['Syntax adaptation', 'Idiom translation', 'Best practice conversion']
            },
            codeOptimization: {
              name: 'Code Optimization',
              description: 'Improve code performance and quality',
              capabilities: ['Performance analysis', 'Memory optimization', 'Readability improvements']
            },
            debugging: {
              name: 'Debugging Assistant',
              description: 'Find and fix code issues with AI help',
              capabilities: ['Error detection', 'Fix suggestions', 'Prevention tips']
            },
            conversation: {
              name: 'Interactive Conversation',
              description: 'Natural language programming assistance',
              capabilities: ['Context retention', 'Follow-up questions', 'Learning adaptation']
            }
          }
        })

      case 'get-language-support':
        return NextResponse.json({
          success: true,
          languages: [
            { id: 'javascript', name: 'JavaScript', icon: '🟨', popularity: 95, features: ['Full support', 'Framework integration'] },
            { id: 'python', name: 'Python', icon: '🐍', popularity: 92, features: ['Full support', 'Data science libraries'] },
            { id: 'java', name: 'Java', icon: '☕', popularity: 85, features: ['Full support', 'Enterprise patterns'] },
            { id: 'typescript', name: 'TypeScript', icon: '🔷', popularity: 88, features: ['Full support', 'Type safety'] },
            { id: 'cpp', name: 'C++', icon: '⚡', popularity: 75, features: ['Core support', 'Performance optimization'] },
            { id: 'go', name: 'Go', icon: '🔵', popularity: 78, features: ['Full support', 'Concurrency patterns'] },
            { id: 'rust', name: 'Rust', icon: '🦀', popularity: 72, features: ['Core support', 'Memory safety'] },
            { id: 'php', name: 'PHP', icon: '🐘', popularity: 70, features: ['Web development', 'Framework support'] },
            { id: 'ruby', name: 'Ruby', icon: '💎', popularity: 68, features: ['Web development', 'DSL creation'] },
            { id: 'swift', name: 'Swift', icon: '🍎', popularity: 65, features: ['iOS development', 'Modern syntax'] }
          ]
        })

      case 'get-code-categories':
        return NextResponse.json({
          success: true,
          categories: [
            { id: 'algorithms', name: 'Algorithms', description: 'Sorting, searching, and optimization algorithms' },
            { id: 'data-structures', name: 'Data Structures', description: 'Arrays, trees, graphs, and custom structures' },
            { id: 'web-development', name: 'Web Development', description: 'Frontend and backend web applications' },
            { id: 'api-development', name: 'API Development', description: 'REST APIs, GraphQL, and microservices' },
            { id: 'database', name: 'Database Operations', description: 'SQL queries, ORM, and data modeling' },
            { id: 'machine-learning', name: 'Machine Learning', description: 'ML models, data processing, and AI' },
            { id: 'mobile-development', name: 'Mobile Development', description: 'iOS, Android, and cross-platform apps' },
            { id: 'game-development', name: 'Game Development', description: 'Game logic, graphics, and physics' },
            { id: 'automation', name: 'Automation Scripts', description: 'Task automation and scripting' },
            { id: 'testing', name: 'Testing', description: 'Unit tests, integration tests, and test automation' }
          ]
        })

      case 'get-nlp-stats':
        return NextResponse.json({
          success: true,
          stats: {
            totalRequests: 45680,
            codeGenerated: 28940,
            codeExplained: 12340,
            codeTranslated: 3450,
            codeOptimized: 890,
            bugsFixed: 560,
            activeConversations: 234,
            averageConfidence: 87.5,
            popularLanguages: [
              { language: 'JavaScript', requests: 15680 },
              { language: 'Python', requests: 12340 },
              { language: 'Java', requests: 8920 },
              { language: 'TypeScript', requests: 5670 },
              { language: 'Go', requests: 3070 }
            ],
            requestTypes: {
              'code-generation': 63.4,
              'code-explanation': 27.0,
              'code-translation': 7.6,
              'code-optimization': 1.9,
              'debugging-help': 0.1
            }
          }
        })

      case 'get-conversation-starters':
        return NextResponse.json({
          success: true,
          starters: [
            "Create a function that sorts an array of objects by a specific property",
            "Explain how this recursive function works",
            "Convert this JavaScript code to Python",
            "Optimize this loop for better performance",
            "Help me debug this error message",
            "Generate a REST API endpoint for user authentication",
            "Create a React component for a todo list",
            "Write a SQL query to find duplicate records",
            "Implement a binary search algorithm",
            "Create a responsive CSS layout"
          ]
        })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Natural Language Programming GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
