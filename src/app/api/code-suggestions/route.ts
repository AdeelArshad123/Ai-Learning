import { NextRequest, NextResponse } from 'next/server'

interface CodeContext {
  code: string
  language: string
  cursorPosition: number
  userLevel: 'beginner' | 'intermediate' | 'advanced'
}

interface Suggestion {
  id: string
  type: 'completion' | 'improvement' | 'fix' | 'optimization'
  title: string
  description: string
  code: string
  confidence: number
  reasoning: string
  learnMore?: string
}

// AI-powered code analysis and suggestions
async function generateCodeSuggestions(context: CodeContext): Promise<Suggestion[]> {
  const suggestions: Suggestion[] = []

  // Analyze code patterns and common issues
  const codeLines = context.code.split('\n')
  const currentLine = codeLines[Math.floor(context.cursorPosition / 50)] || ''

  // JavaScript/TypeScript specific suggestions
  if (context.language.toLowerCase().includes('javascript') || context.language.toLowerCase().includes('typescript')) {
    
    // Suggest async/await for Promise chains
    if (context.code.includes('.then(') && !context.code.includes('async')) {
      suggestions.push({
        id: 'async-await-suggestion',
        type: 'improvement',
        title: 'Convert to async/await',
        description: 'Modern async/await syntax is more readable than Promise chains',
        code: `// Instead of:\n// promise.then(result => { ... })\n\n// Use:\nasync function handleAsync() {\n  try {\n    const result = await promise;\n    // handle result\n  } catch (error) {\n    // handle error\n  }\n}`,
        confidence: 0.9,
        reasoning: 'Async/await provides better error handling and readability',
        learnMore: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function'
      })
    }

    // Suggest const/let instead of var
    if (context.code.includes('var ')) {
      suggestions.push({
        id: 'const-let-suggestion',
        type: 'improvement',
        title: 'Use const/let instead of var',
        description: 'Modern variable declarations with block scope',
        code: `// Instead of: var name = 'value'\n// Use: const name = 'value' (if not reassigned)\n// Or: let name = 'value' (if reassigned)`,
        confidence: 0.95,
        reasoning: 'const/let have block scope and prevent hoisting issues',
        learnMore: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let'
      })
    }

    // Suggest error handling
    if (context.code.includes('fetch(') && !context.code.includes('catch')) {
      suggestions.push({
        id: 'error-handling-suggestion',
        type: 'improvement',
        title: 'Add error handling',
        description: 'Always handle potential errors in async operations',
        code: `try {\n  const response = await fetch(url);\n  if (!response.ok) {\n    throw new Error(\`HTTP error! status: \${response.status}\`);\n  }\n  const data = await response.json();\n  return data;\n} catch (error) {\n  console.error('Fetch error:', error);\n  throw error;\n}`,
        confidence: 0.85,
        reasoning: 'Proper error handling prevents silent failures',
        learnMore: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch'
      })
    }
  }

  // Python specific suggestions
  if (context.language.toLowerCase() === 'python') {
    
    // Suggest list comprehensions
    if (context.code.includes('for ') && context.code.includes('append(')) {
      suggestions.push({
        id: 'list-comprehension-suggestion',
        type: 'optimization',
        title: 'Use list comprehension',
        description: 'More Pythonic and efficient way to create lists',
        code: `# Instead of:\n# result = []\n# for item in items:\n#     result.append(transform(item))\n\n# Use:\nresult = [transform(item) for item in items]`,
        confidence: 0.8,
        reasoning: 'List comprehensions are more readable and often faster',
        learnMore: 'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions'
      })
    }

    // Suggest f-strings
    if (context.code.includes('.format(') || context.code.includes('% ')) {
      suggestions.push({
        id: 'f-string-suggestion',
        type: 'improvement',
        title: 'Use f-strings for formatting',
        description: 'Modern string formatting syntax (Python 3.6+)',
        code: `# Instead of: "Hello {}".format(name)\n# Or: "Hello %s" % name\n\n# Use: f"Hello {name}"`,
        confidence: 0.9,
        reasoning: 'f-strings are more readable and performant',
        learnMore: 'https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals'
      })
    }
  }

  // React specific suggestions
  if (context.code.includes('React') || context.code.includes('useState')) {
    
    // Suggest useCallback for functions
    if (context.code.includes('const handle') && !context.code.includes('useCallback')) {
      suggestions.push({
        id: 'usecallback-suggestion',
        type: 'optimization',
        title: 'Consider useCallback for event handlers',
        description: 'Optimize performance by memoizing event handlers',
        code: `import { useCallback } from 'react';\n\nconst handleClick = useCallback(() => {\n  // handler logic\n}, [dependencies]);`,
        confidence: 0.7,
        reasoning: 'useCallback prevents unnecessary re-renders of child components',
        learnMore: 'https://react.dev/reference/react/useCallback'
      })
    }

    // Suggest proper dependency arrays
    if (context.code.includes('useEffect(') && !context.code.includes(', [')) {
      suggestions.push({
        id: 'useeffect-deps-suggestion',
        type: 'fix',
        title: 'Add dependency array to useEffect',
        description: 'Prevent infinite re-renders and control when effect runs',
        code: `useEffect(() => {\n  // effect logic\n}, [dependency1, dependency2]); // Add dependencies here`,
        confidence: 0.95,
        reasoning: 'Missing dependency array causes effect to run on every render',
        learnMore: 'https://react.dev/reference/react/useEffect'
      })
    }
  }

  // General code quality suggestions
  
  // Suggest meaningful variable names
  if (context.code.match(/\b(a|b|c|x|y|z|temp|data)\b/)) {
    suggestions.push({
      id: 'meaningful-names-suggestion',
      type: 'improvement',
      title: 'Use meaningful variable names',
      description: 'Descriptive names make code more readable and maintainable',
      code: `// Instead of: const a = getUserData()\n// Use: const userData = getUserData()\n\n// Instead of: const x = items.filter(i => i.active)\n// Use: const activeItems = items.filter(item => item.active)`,
      confidence: 0.6,
      reasoning: 'Clear variable names improve code readability and maintainability',
      learnMore: 'https://clean-code-developer.com/grades/grade-1-red/#Meaningful_Names'
    })
  }

  // Sort by confidence and return top suggestions
  return suggestions
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5)
}

export async function POST(request: NextRequest) {
  try {
    const context: CodeContext = await request.json()

    if (!context.code || !context.language) {
      return NextResponse.json(
        { error: 'Code and language are required' },
        { status: 400 }
      )
    }

    console.log('Generating code suggestions for:', context.language)

    const suggestions = await generateCodeSuggestions(context)

    return NextResponse.json({
      suggestions,
      generated_at: new Date().toISOString(),
      context: {
        language: context.language,
        codeLength: context.code.length,
        userLevel: context.userLevel
      }
    })

  } catch (error: any) {
    console.error('Error generating code suggestions:', error)
    
    // Fallback suggestions
    const fallbackSuggestions: Suggestion[] = [
      {
        id: 'fallback-1',
        type: 'improvement',
        title: 'Add comments to your code',
        description: 'Comments help explain complex logic',
        code: '// Add meaningful comments to explain your code',
        confidence: 0.5,
        reasoning: 'Well-commented code is easier to understand and maintain'
      }
    ]

    return NextResponse.json({
      suggestions: fallbackSuggestions,
      generated_at: new Date().toISOString(),
      fallback: true,
      error: 'Using fallback suggestions'
    })
  }
}

export async function GET() {
  // Return sample suggestions for testing
  const sampleSuggestions: Suggestion[] = [
    {
      id: 'sample-1',
      type: 'improvement',
      title: 'Use async/await',
      description: 'Modern asynchronous JavaScript syntax',
      code: 'async function fetchData() {\n  const response = await fetch(url);\n  return response.json();\n}',
      confidence: 0.9,
      reasoning: 'Async/await is more readable than Promise chains'
    },
    {
      id: 'sample-2',
      type: 'optimization',
      title: 'Use const for immutable values',
      description: 'Prevent accidental reassignment',
      code: 'const API_URL = "https://api.example.com";',
      confidence: 0.8,
      reasoning: 'const prevents accidental reassignment of constants'
    }
  ]

  return NextResponse.json({
    suggestions: sampleSuggestions,
    sample: true,
    generated_at: new Date().toISOString()
  })
}
