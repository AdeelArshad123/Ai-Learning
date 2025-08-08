import { NextRequest, NextResponse } from 'next/server'
import { aiCodeReviewer } from '@/lib/ai-code-reviewer'

interface CodeReviewRequest {
  code: string
  language: string
  context?: string
  reviewType: 'security' | 'performance' | 'style' | 'comprehensive'
}

interface ReviewIssue {
  id: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: 'security' | 'performance' | 'style' | 'logic' | 'maintainability'
  title: string
  description: string
  line?: number
  suggestion: string
  example?: string
  resources?: string[]
}

interface CodeReviewResult {
  overallScore: number
  issues: ReviewIssue[]
  strengths: string[]
  recommendations: string[]
  metrics: {
    complexity: number
    maintainability: number
    security: number
    performance: number
  }
}

// Automated code review engine
async function performCodeReview(request: CodeReviewRequest): Promise<CodeReviewResult> {
  const issues: ReviewIssue[] = []
  const strengths: string[] = []
  const recommendations: string[] = []

  const { code, language, reviewType } = request
  const lines = code.split('\n')

  // Security Analysis
  if (reviewType === 'security' || reviewType === 'comprehensive') {
    
    // Check for SQL injection vulnerabilities
    if (code.includes('SELECT') && code.includes('+')) {
      issues.push({
        id: 'sql-injection-risk',
        severity: 'critical',
        category: 'security',
        title: 'Potential SQL Injection Vulnerability',
        description: 'String concatenation in SQL queries can lead to SQL injection attacks',
        suggestion: 'Use parameterized queries or prepared statements',
        example: '// Use: db.query("SELECT * FROM users WHERE id = ?", [userId])\n// Instead of: db.query("SELECT * FROM users WHERE id = " + userId)',
        resources: ['https://owasp.org/www-community/attacks/SQL_Injection']
      })
    }

    // Check for XSS vulnerabilities
    if (code.includes('innerHTML') && !code.includes('sanitize')) {
      issues.push({
        id: 'xss-risk',
        severity: 'high',
        category: 'security',
        title: 'Potential XSS Vulnerability',
        description: 'Using innerHTML with unsanitized data can lead to XSS attacks',
        suggestion: 'Sanitize user input or use textContent instead',
        example: '// Safe: element.textContent = userInput\n// Or: element.innerHTML = sanitizeHTML(userInput)',
        resources: ['https://owasp.org/www-community/attacks/xss/']
      })
    }

    // Check for hardcoded secrets
    const secretPatterns = [/password\s*=\s*["'][^"']+["']/i, /api[_-]?key\s*=\s*["'][^"']+["']/i, /secret\s*=\s*["'][^"']+["']/i]
    secretPatterns.forEach(pattern => {
      if (pattern.test(code)) {
        issues.push({
          id: 'hardcoded-secret',
          severity: 'critical',
          category: 'security',
          title: 'Hardcoded Secret Detected',
          description: 'Secrets should not be hardcoded in source code',
          suggestion: 'Use environment variables or secure secret management',
          example: '// Use: const apiKey = process.env.API_KEY\n// Instead of: const apiKey = "sk-1234567890"',
          resources: ['https://12factor.net/config']
        })
      }
    })
  }

  // Performance Analysis
  if (reviewType === 'performance' || reviewType === 'comprehensive') {
    
    // Check for inefficient loops
    if (code.includes('for') && code.includes('indexOf')) {
      issues.push({
        id: 'inefficient-search',
        severity: 'medium',
        category: 'performance',
        title: 'Inefficient Array Search',
        description: 'Using indexOf in loops can be inefficient for large datasets',
        suggestion: 'Consider using Set for O(1) lookups or more efficient algorithms',
        example: '// Efficient: const itemSet = new Set(items)\n// if (itemSet.has(searchItem)) { ... }',
        resources: ['https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set']
      })
    }

    // Check for memory leaks in React
    if (language.toLowerCase().includes('react') && code.includes('useEffect') && !code.includes('return')) {
      issues.push({
        id: 'missing-cleanup',
        severity: 'medium',
        category: 'performance',
        title: 'Missing Effect Cleanup',
        description: 'useEffect should clean up subscriptions to prevent memory leaks',
        suggestion: 'Return a cleanup function from useEffect',
        example: 'useEffect(() => {\n  const subscription = subscribe();\n  return () => subscription.unsubscribe();\n}, []);',
        resources: ['https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development']
      })
    }

    // Check for unnecessary re-renders
    if (code.includes('useState') && code.includes('{}') && !code.includes('useMemo')) {
      issues.push({
        id: 'object-recreation',
        severity: 'low',
        category: 'performance',
        title: 'Object Recreation on Every Render',
        description: 'Creating new objects in render can cause unnecessary re-renders',
        suggestion: 'Use useMemo for expensive object creation',
        example: 'const expensiveObject = useMemo(() => ({ key: value }), [dependency]);',
        resources: ['https://react.dev/reference/react/useMemo']
      })
    }
  }

  // Style and Maintainability Analysis
  if (reviewType === 'style' || reviewType === 'comprehensive') {
    
    // Check function length
    const longFunctions = lines.filter(line => line.includes('function') || line.includes('=>')).length
    if (code.split('function').length > 3 && code.length > 1000) {
      issues.push({
        id: 'long-function',
        severity: 'medium',
        category: 'maintainability',
        title: 'Function Too Long',
        description: 'Long functions are harder to understand and maintain',
        suggestion: 'Break down into smaller, focused functions',
        example: '// Break this into smaller functions:\n// - validateInput()\n// - processData()\n// - handleResponse()',
        resources: ['https://refactoring.guru/smells/long-method']
      })
    }

    // Check for magic numbers
    const magicNumbers = code.match(/\b\d{2,}\b/g)
    if (magicNumbers && magicNumbers.length > 2) {
      issues.push({
        id: 'magic-numbers',
        severity: 'low',
        category: 'style',
        title: 'Magic Numbers Detected',
        description: 'Numeric literals should be replaced with named constants',
        suggestion: 'Define constants with meaningful names',
        example: '// Instead of: if (age > 18)\n// Use: const LEGAL_AGE = 18; if (age > LEGAL_AGE)',
        resources: ['https://refactoring.guru/smells/magic-number']
      })
    }

    // Check for consistent naming
    const variableNames = code.match(/(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g)
    if (variableNames) {
      const camelCaseCount = variableNames.filter(name => /[a-z][A-Z]/.test(name)).length
      const snake_caseCount = variableNames.filter(name => /_/.test(name)).length
      
      if (camelCaseCount > 0 && snake_caseCount > 0) {
        issues.push({
          id: 'inconsistent-naming',
          severity: 'low',
          category: 'style',
          title: 'Inconsistent Naming Convention',
          description: 'Mix of camelCase and snake_case naming conventions',
          suggestion: 'Use consistent naming convention throughout the codebase',
          example: '// Choose one: camelCase OR snake_case\n// const userName = "john"; // camelCase\n// const user_name = "john"; // snake_case',
          resources: ['https://google.github.io/styleguide/jsguide.html#naming']
        })
      }
    }
  }

  // Identify strengths
  if (code.includes('try') && code.includes('catch')) {
    strengths.push('Good error handling with try-catch blocks')
  }
  if (code.includes('const ') && !code.includes('var ')) {
    strengths.push('Uses modern variable declarations (const/let)')
  }
  if (code.includes('async') && code.includes('await')) {
    strengths.push('Uses modern async/await syntax')
  }
  if (code.includes('//') || code.includes('/*')) {
    strengths.push('Code includes comments for documentation')
  }

  // Generate recommendations
  if (issues.length === 0) {
    recommendations.push('Great job! No major issues found in your code.')
  } else {
    recommendations.push('Focus on addressing critical and high severity issues first')
    if (issues.some(i => i.category === 'security')) {
      recommendations.push('Security issues should be your top priority')
    }
    if (issues.some(i => i.category === 'performance')) {
      recommendations.push('Consider performance optimizations for better user experience')
    }
  }

  // Calculate metrics
  const criticalIssues = issues.filter(i => i.severity === 'critical').length
  const highIssues = issues.filter(i => i.severity === 'high').length
  const mediumIssues = issues.filter(i => i.severity === 'medium').length
  const lowIssues = issues.filter(i => i.severity === 'low').length

  const totalIssues = criticalIssues + highIssues + mediumIssues + lowIssues
  const overallScore = Math.max(0, 100 - (criticalIssues * 25 + highIssues * 15 + mediumIssues * 10 + lowIssues * 5))

  const metrics = {
    complexity: Math.max(0, 100 - (code.split('\n').length > 50 ? 20 : 0) - (longFunctions * 10)),
    maintainability: Math.max(0, 100 - (issues.filter(i => i.category === 'maintainability').length * 15)),
    security: Math.max(0, 100 - (issues.filter(i => i.category === 'security').length * 30)),
    performance: Math.max(0, 100 - (issues.filter(i => i.category === 'performance').length * 20))
  }

  return {
    overallScore,
    issues,
    strengths,
    recommendations,
    metrics
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, code, language, context, reviewType, userLevel, issueTypes } = body

    // Handle new AI-powered actions
    switch (action) {
      case 'ai-review':
        if (!code || !language) {
          return NextResponse.json(
            { error: 'Code and language are required' },
            { status: 400 }
          )
        }

        const aiReviewRequest = {
          code,
          language,
          context,
          reviewType: reviewType || 'comprehensive',
          userLevel: userLevel || 'intermediate'
        }

        const aiReviewResult = await aiCodeReviewer.reviewCode(aiReviewRequest)

        return NextResponse.json({
          success: true,
          data: aiReviewResult,
          timestamp: new Date().toISOString()
        })

      case 'realtime-analysis':
        if (!code || !language) {
          return NextResponse.json(
            { error: 'Code and language are required' },
            { status: 400 }
          )
        }

        const realtimeResult = await aiCodeReviewer.analyzeCodeRealtime(code, language)

        return NextResponse.json({
          success: true,
          data: realtimeResult,
          timestamp: new Date().toISOString()
        })

      case 'auto-fix':
        if (!code || !language) {
          return NextResponse.json(
            { error: 'Code and language are required' },
            { status: 400 }
          )
        }

        const fixResult = await aiCodeReviewer.autoFixCode(
          code,
          language,
          issueTypes || []
        )

        return NextResponse.json({
          success: true,
          data: fixResult,
          timestamp: new Date().toISOString()
        })

      case 'generate-learning':
        if (!body.issues || !Array.isArray(body.issues)) {
          return NextResponse.json(
            { error: 'Issues array is required' },
            { status: 400 }
          )
        }

        const learningResources = await aiCodeReviewer.generateLearningResources(body.issues)

        return NextResponse.json({
          success: true,
          data: learningResources,
          count: learningResources.length,
          timestamp: new Date().toISOString()
        })

      default:
        // Fallback to existing rule-based review for backward compatibility
        const reviewRequest: CodeReviewRequest = {
          code: code || body.code,
          language: language || body.language,
          context: context || body.context,
          reviewType: reviewType || body.reviewType || 'comprehensive'
        }

        if (!reviewRequest.code || !reviewRequest.language) {
          return NextResponse.json(
            { error: 'Code and language are required' },
            { status: 400 }
          )
        }

        console.log('Performing rule-based code review for:', reviewRequest.language, reviewRequest.reviewType)

        const reviewResult = await performCodeReview(reviewRequest)

        return NextResponse.json({
          ...reviewResult,
          generated_at: new Date().toISOString(),
          review_type: reviewRequest.reviewType,
          language: reviewRequest.language,
          method: 'rule-based'
        })
    }

  } catch (error: any) {
    console.error('Error performing code review:', error)

    return NextResponse.json({
      overallScore: 50,
      issues: [],
      strengths: ['Code review service temporarily unavailable'],
      recommendations: ['Please try again later'],
      metrics: { complexity: 50, maintainability: 50, security: 50, performance: 50 },
      generated_at: new Date().toISOString(),
      error: 'Code review service error'
    })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const info = searchParams.get('info')

    if (info === 'capabilities') {
      return NextResponse.json({
        success: true,
        capabilities: {
          aiReview: {
            description: 'AI-powered comprehensive code analysis',
            features: ['Advanced pattern recognition', 'Context-aware suggestions', 'Learning-based improvements'],
            supportedLanguages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP', 'Ruby'],
            reviewTypes: ['basic', 'comprehensive', 'security', 'performance', 'style'],
            userLevels: ['beginner', 'intermediate', 'advanced']
          },
          ruleBasedReview: {
            description: 'Fast rule-based code analysis',
            features: ['Security vulnerability detection', 'Performance issue identification', 'Style consistency checks'],
            categories: ['security', 'performance', 'style', 'maintainability'],
            responseTime: '< 1 second'
          },
          realtimeAnalysis: {
            description: 'Live code analysis for immediate feedback',
            features: ['Instant issue detection', 'Quick suggestions', 'Real-time scoring'],
            updateFrequency: 'On keystroke'
          },
          autoFix: {
            description: 'Automatic code correction',
            capabilities: ['Syntax fixes', 'Style improvements', 'Common pattern corrections'],
            limitations: ['Cannot fix complex logic errors', 'Requires human review']
          },
          learningGeneration: {
            description: 'Educational content from code issues',
            features: ['Concept explanations', 'Practice exercises', 'Resource recommendations']
          }
        },
        availableActions: [
          'ai-review',
          'realtime-analysis',
          'auto-fix',
          'generate-learning',
          'default (rule-based)'
        ],
        examples: {
          aiReview: {
            action: 'ai-review',
            code: 'function add(a, b) { return a + b; }',
            language: 'javascript',
            reviewType: 'comprehensive',
            userLevel: 'intermediate'
          },
          realtimeAnalysis: {
            action: 'realtime-analysis',
            code: 'var x = 1; if (x == 1) console.log("hello");',
            language: 'javascript'
          },
          autoFix: {
            action: 'auto-fix',
            code: 'var x = 1; if (x == 1) console.log("hello");',
            language: 'javascript',
            issueTypes: ['var-usage', 'strict-equality']
          },
          ruleBasedReview: {
            code: 'function test() { return "SELECT * FROM users WHERE id = " + userId; }',
            language: 'javascript',
            reviewType: 'security'
          }
        }
      })
    }

    // Default: Return sample review for testing
    const sampleReview: CodeReviewResult = {
      overallScore: 85,
      issues: [
        {
          id: 'sample-issue',
          severity: 'medium',
          category: 'performance',
          title: 'Consider using const for immutable values',
          description: 'Variables that are not reassigned should use const',
          suggestion: 'Replace let with const where appropriate',
          example: 'const API_URL = "https://api.example.com";'
        }
      ],
      strengths: ['Good error handling', 'Clear variable names', 'Proper async/await usage'],
      recommendations: ['Address performance issues', 'Add more comments'],
      metrics: {
        complexity: 80,
        maintainability: 85,
        security: 90,
        performance: 75
      }
    }

    return NextResponse.json({
      ...sampleReview,
      sample: true,
      generated_at: new Date().toISOString(),
      message: 'Enhanced AI Code Review API - Use ?info=capabilities for detailed information'
    })

  } catch (error: any) {
    console.error('Error in code review GET:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get code review info',
        message: error.message
      },
      { status: 500 }
    )
  }
}
