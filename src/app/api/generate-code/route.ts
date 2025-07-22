import { NextRequest, NextResponse } from 'next/server'
import { DeepSeekAPI, DeepSeekError } from '@/lib/deepseek'

export async function POST(request: Request) {
  try {
    // Debug environment variables
    console.log('Environment check:', {
      hasDeepSeekKey: !!process.env.DEEPSEEK_API_KEY,
      keyLength: process.env.DEEPSEEK_API_KEY?.length || 0,
      keyPrefix: process.env.DEEPSEEK_API_KEY?.substring(0, 10) || 'none'
    })
    
    // Check if DeepSeek API key is configured
    if (!process.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY.trim() === '') {
      console.error('DeepSeek API key not configured or empty')
      return NextResponse.json({ 
        success: false, 
        error: 'DeepSeek API key not configured. Please check your environment variables.' 
      }, { status: 500 })
    }

    const { topic, language, difficulty, includeExplanation, includeComments, codeQuality, codeStyle, framework, customInstructions } = await request.json()

    if (!topic || !language || !difficulty) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const systemPrompt = `You are an expert programming tutor and code generator. Generate high-quality, educational code examples.

${includeComments ? 'Include detailed comments explaining each part of the code.' : 'Write clean code without comments.'}

${codeQuality === 'educational' ? 'Focus on educational value with clear explanations and best practices.' : 
  codeQuality === 'production' ? 'Write production-ready code with proper error handling and best practices.' :
  'Write simple, basic examples that are easy to understand.'}

${codeStyle === 'functional' ? 'Use functional programming principles with pure functions and immutability.' :
  codeStyle === 'oop' ? 'Use object-oriented programming with classes, inheritance, and encapsulation.' :
  'Use procedural programming with clear step-by-step logic.'}

${framework ? `Use ${framework} framework/library conventions and best practices.` : 'Use standard language features.'}

${customInstructions ? `Additional requirements: ${customInstructions}` : ''}

Guidelines:
- Use descriptive variable and function names
- Include proper error handling where appropriate
- Follow language-specific best practices
- Make the code educational and easy to understand
- Provide clear explanations for complex concepts
- Use modern syntax and features when appropriate
- ${framework ? `Follow ${framework} conventions and patterns` : ''}

Generate code for: ${topic} in ${language} (${difficulty} level)`

    const userPrompt = `Please generate a ${difficulty}-level ${language} code example for: ${topic}

${includeExplanation ? 'Include a detailed explanation of the code and key learning points.' : 'Focus on the code implementation.'}

${codeQuality === 'educational' ? 'Make it educational with clear explanations.' : 
  codeQuality === 'production' ? 'Make it production-ready with proper error handling.' :
  'Keep it simple and basic for learning.'}

${codeStyle === 'functional' ? 'Use functional programming style.' :
  codeStyle === 'oop' ? 'Use object-oriented programming style.' :
  'Use procedural programming style.'}

${framework ? `Implement using ${framework} framework/library.` : ''}

${customInstructions ? `Custom requirements: ${customInstructions}` : ''}`

    console.log('Generating code with parameters:', { topic, language, difficulty, includeExplanation, includeComments, codeQuality, codeStyle, framework })

    // Create DeepSeek instance with the API key
    const deepseek = new DeepSeekAPI(process.env.DEEPSEEK_API_KEY)
    const generatedCode = await deepseek.generateCode(userPrompt, systemPrompt, 3000)

    if (!generatedCode) {
      return NextResponse.json({ success: false, error: 'Failed to generate code' }, { status: 500 })
    }

    console.log('Generated code length:', generatedCode.length)

    // Parse the generated code to extract code, explanation, and key points
    const codeMatch = generatedCode.match(/```(?:javascript|js|typescript|ts|python|py|java|cpp|c\+\+|php|rust)?\n([\s\S]*?)```/)
    const code = codeMatch ? codeMatch[1].trim() : generatedCode

    // Extract explanation and key points if they exist
    const explanationMatch = generatedCode.match(/Explanation:([\s\S]*?)(?=Key Points:|$)/i)
    const explanation = explanationMatch ? explanationMatch[1].trim() : ''

    const keyPointsMatch = generatedCode.match(/Key Points:([\s\S]*?)(?=```|$)/i)
    const keyPoints = keyPointsMatch 
      ? keyPointsMatch[1].split('\n').filter(point => point.trim().startsWith('-') || point.trim().startsWith('•')).map(point => point.replace(/^[-•]\s*/, '').trim()).filter(Boolean)
      : []

    const result = {
      code,
      explanation,
      keyPoints,
      difficulty,
      language,
      topic,
      codeStyle,
      framework,
      comments: includeComments ? 'Code includes detailed comments for learning' : undefined
    }

    console.log('Successfully generated code for:', topic)
    return NextResponse.json({ success: true, data: result })
  } catch (error: any) {
    console.error('Error generating code:', error)
    
    // Handle specific DeepSeek errors
    if (error instanceof DeepSeekError) {
      if (error.status === 401) {
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid DeepSeek API key. Please check your configuration.' 
        }, { status: 500 })
      } else if (error.status === 429) {
        return NextResponse.json({ 
          success: false, 
          error: 'Rate limit exceeded. Please try again later.' 
        }, { status: 429 })
      } else if (error.status === 500) {
        return NextResponse.json({ 
          success: false, 
          error: 'DeepSeek service error. Please try again.' 
        }, { status: 500 })
      }
    }
    
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    }, { status: 500 })
  }
}

// GET endpoint for getting available languages and topics
export async function GET() {
  const languages = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 
    'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart',
    'Scala', 'Haskell', 'Clojure', 'Elixir', 'F#', 'OCaml',
    'Perl', 'Lua', 'R', 'MATLAB', 'Julia', 'Erlang', 'Nim',
    'Crystal', 'Zig', 'V', 'Assembly', 'COBOL', 'Fortran',
    'Pascal', 'Delphi', 'VB.NET', 'PowerShell', 'Bash', 'Zsh'
  ]

  const topics = [
    'Variables and Data Types',
    'Control Structures (if/else, loops)',
    'Functions and Methods',
    'Object-Oriented Programming',
    'Error Handling',
    'Async Programming',
    'File I/O Operations',
    'Database Operations',
    'API Integration',
    'Testing',
    'Design Patterns',
    'Data Structures',
    'Algorithms',
    'Web Development',
    'Mobile Development',
    'Machine Learning',
    'DevOps and Deployment',
    'React Hooks',
    'State Management',
    'Component Lifecycle',
    'Event Handling',
    'Form Validation',
    'Data Fetching',
    'Authentication',
    'Authorization',
    'Database Design',
    'API Design',
    'Microservices',
    'Containerization',
    'CI/CD Pipelines',
    'Performance Optimization',
    'Security Best Practices',
    'Code Testing',
    'Debugging Techniques',
    'Code Review',
    'Version Control',
    'Documentation'
  ]

  const difficulties = ['beginner', 'intermediate', 'advanced']

  return NextResponse.json({
    languages,
    topics,
    difficulties
  })
} 