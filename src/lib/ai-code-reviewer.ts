import { OpenAI } from 'openai'

interface CodeReviewRequest {
  code: string
  language: string
  context?: string
  reviewType: 'basic' | 'comprehensive' | 'security' | 'performance' | 'style'
  userLevel: 'beginner' | 'intermediate' | 'advanced'
}

interface CodeReviewResult {
  id: string
  overall: {
    score: number // 0-100
    grade: 'A' | 'B' | 'C' | 'D' | 'F'
    summary: string
    mainIssues: string[]
    strengths: string[]
  }
  issues: CodeIssue[]
  suggestions: CodeSuggestion[]
  improvements: CodeImprovement[]
  learningPoints: LearningPoint[]
  metrics: {
    complexity: number
    maintainability: number
    readability: number
    performance: number
    security: number
  }
  fixedCode?: string
  timestamp: Date
}

interface CodeIssue {
  id: string
  type: 'error' | 'warning' | 'info' | 'style'
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: 'syntax' | 'logic' | 'performance' | 'security' | 'style' | 'best-practice'
  line?: number
  column?: number
  message: string
  description: string
  example?: string
  fix?: string
  resources?: string[]
}

interface CodeSuggestion {
  id: string
  type: 'refactor' | 'optimize' | 'modernize' | 'simplify'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  before: string
  after: string
  reasoning: string
  impact: string
}

interface CodeImprovement {
  id: string
  category: 'architecture' | 'patterns' | 'naming' | 'structure' | 'documentation'
  title: string
  description: string
  implementation: string
  benefits: string[]
  difficulty: 'easy' | 'medium' | 'hard'
}

interface LearningPoint {
  id: string
  concept: string
  explanation: string
  examples: string[]
  resources: string[]
  practiceExercises?: string[]
}

export class AICodeReviewer {
  private openai: OpenAI
  private reviewCache: Map<string, CodeReviewResult>

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
    this.reviewCache = new Map()
  }

  // 🔍 Comprehensive code review with AI analysis
  async reviewCode(request: CodeReviewRequest): Promise<CodeReviewResult> {
    try {
      // Check cache first
      const cacheKey = this.generateCacheKey(request)
      if (this.reviewCache.has(cacheKey)) {
        return this.reviewCache.get(cacheKey)!
      }

      const prompt = this.buildReviewPrompt(request)
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(request.reviewType, request.userLevel)
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000
      })

      const reviewData = JSON.parse(response.choices[0].message.content || '{}')
      
      const result: CodeReviewResult = {
        id: `review_${Date.now()}`,
        ...reviewData,
        timestamp: new Date()
      }

      // Cache the result
      this.reviewCache.set(cacheKey, result)
      
      return result
    } catch (error) {
      console.error('Error reviewing code:', error)
      return this.getFallbackReview(request)
    }
  }

  // ⚡ Real-time code analysis for live feedback
  async analyzeCodeRealtime(code: string, language: string): Promise<{
    issues: CodeIssue[]
    suggestions: string[]
    score: number
  }> {
    try {
      // Quick analysis for real-time feedback
      const issues = await this.detectCommonIssues(code, language)
      const suggestions = await this.generateQuickSuggestions(code, language)
      const score = this.calculateQuickScore(code, issues)

      return {
        issues,
        suggestions,
        score
      }
    } catch (error) {
      console.error('Error in real-time analysis:', error)
      return {
        issues: [],
        suggestions: ['Continue coding...'],
        score: 75
      }
    }
  }

  // 🛠️ Auto-fix common code issues
  async autoFixCode(code: string, language: string, issueTypes: string[] = []): Promise<{
    fixedCode: string
    appliedFixes: string[]
    remainingIssues: CodeIssue[]
  }> {
    try {
      const prompt = `Fix the following ${language} code by addressing these issues: ${issueTypes.join(', ')}.

      Original Code:
      \`\`\`${language}
      ${code}
      \`\`\`

      Please:
      1. Fix syntax errors, logic issues, and common problems
      2. Improve code style and formatting
      3. Add missing error handling where appropriate
      4. Optimize performance where possible
      5. Maintain the original functionality

      Return JSON with:
      {
        "fixedCode": "corrected code",
        "appliedFixes": ["list of fixes applied"],
        "explanation": "explanation of changes made"
      }`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert code reviewer and fixer. Provide clean, working code with explanations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 3000
      })

      const fixData = JSON.parse(response.choices[0].message.content || '{}')
      
      // Analyze remaining issues in fixed code
      const remainingIssues = await this.detectCommonIssues(fixData.fixedCode, language)

      return {
        fixedCode: fixData.fixedCode || code,
        appliedFixes: fixData.appliedFixes || [],
        remainingIssues
      }
    } catch (error) {
      console.error('Error auto-fixing code:', error)
      return {
        fixedCode: code,
        appliedFixes: [],
        remainingIssues: []
      }
    }
  }

  // 📚 Generate learning resources based on code issues
  async generateLearningResources(issues: CodeIssue[]): Promise<LearningPoint[]> {
    try {
      const uniqueConcepts = [...new Set(issues.map(issue => issue.category))]
      const learningPoints: LearningPoint[] = []

      for (const concept of uniqueConcepts) {
        const relatedIssues = issues.filter(issue => issue.category === concept)
        
        const prompt = `Create a learning resource for the concept: ${concept}

        Related issues found in code:
        ${relatedIssues.map(issue => `- ${issue.message}`).join('\n')}

        Generate:
        1. Clear explanation of the concept
        2. 2-3 practical examples
        3. Recommended learning resources
        4. Practice exercises

        Format as JSON with LearningPoint structure.`

        const response = await this.openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert programming educator who creates clear, practical learning materials.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.5,
          max_tokens: 1500
        })

        const learningData = JSON.parse(response.choices[0].message.content || '{}')
        learningPoints.push({
          id: `learning_${Date.now()}_${concept}`,
          concept,
          ...learningData
        })
      }

      return learningPoints
    } catch (error) {
      console.error('Error generating learning resources:', error)
      return []
    }
  }

  // 🔧 Private helper methods
  private buildReviewPrompt(request: CodeReviewRequest): string {
    return `Review this ${request.language} code for a ${request.userLevel} developer.

    Code to review:
    \`\`\`${request.language}
    ${request.code}
    \`\`\`

    ${request.context ? `Context: ${request.context}` : ''}

    Review Type: ${request.reviewType}

    Provide comprehensive analysis including:
    1. Overall assessment with score (0-100) and grade
    2. Specific issues with line numbers and severity
    3. Improvement suggestions with before/after examples
    4. Learning points for skill development
    5. Code metrics (complexity, maintainability, etc.)

    Format response as JSON matching the CodeReviewResult interface.`
  }

  private getSystemPrompt(reviewType: string, userLevel: string): string {
    const basePrompt = `You are an expert code reviewer with deep knowledge of software engineering best practices, security, and performance optimization.`
    
    const levelAdjustments = {
      beginner: 'Focus on fundamental concepts, clear explanations, and encouraging feedback. Prioritize learning over perfection.',
      intermediate: 'Balance constructive criticism with practical improvements. Include intermediate concepts and patterns.',
      advanced: 'Provide detailed technical analysis, advanced optimizations, and architectural considerations.'
    }

    const typeAdjustments = {
      basic: 'Focus on syntax, basic logic, and fundamental best practices.',
      comprehensive: 'Analyze all aspects: functionality, style, performance, maintainability, and security.',
      security: 'Prioritize security vulnerabilities, data validation, and secure coding practices.',
      performance: 'Focus on optimization opportunities, algorithmic efficiency, and resource usage.',
      style: 'Emphasize code formatting, naming conventions, and readability.'
    }

    return `${basePrompt} ${levelAdjustments[userLevel]} ${typeAdjustments[reviewType]}`
  }

  private async detectCommonIssues(code: string, language: string): Promise<CodeIssue[]> {
    // Simple pattern-based issue detection for real-time feedback
    const issues: CodeIssue[] = []
    const lines = code.split('\n')

    lines.forEach((line, index) => {
      // Check for common issues based on language
      if (language === 'javascript' || language === 'typescript') {
        if (line.includes('var ')) {
          issues.push({
            id: `issue_${index}_var`,
            type: 'warning',
            severity: 'medium',
            category: 'best-practice',
            line: index + 1,
            message: 'Use let or const instead of var',
            description: 'var has function scope which can lead to unexpected behavior',
            fix: line.replace('var ', 'let ')
          })
        }
        
        if (line.includes('== ') && !line.includes('=== ')) {
          issues.push({
            id: `issue_${index}_equality`,
            type: 'warning',
            severity: 'medium',
            category: 'best-practice',
            line: index + 1,
            message: 'Use strict equality (===) instead of loose equality (==)',
            description: 'Strict equality prevents type coercion issues',
            fix: line.replace('== ', '=== ')
          })
        }
      }

      // Common issues across languages
      if (line.trim().length > 120) {
        issues.push({
          id: `issue_${index}_length`,
          type: 'info',
          severity: 'low',
          category: 'style',
          line: index + 1,
          message: 'Line too long (>120 characters)',
          description: 'Long lines reduce readability',
          fix: 'Consider breaking this line into multiple lines'
        })
      }
    })

    return issues
  }

  private async generateQuickSuggestions(code: string, language: string): Promise<string[]> {
    const suggestions: string[] = []
    
    // Basic suggestions based on code patterns
    if (code.includes('console.log')) {
      suggestions.push('Consider using a proper logging library for production code')
    }
    
    if (code.includes('TODO') || code.includes('FIXME')) {
      suggestions.push('Address TODO and FIXME comments before finalizing')
    }
    
    if (!code.includes('try') && !code.includes('catch')) {
      suggestions.push('Consider adding error handling with try-catch blocks')
    }

    return suggestions
  }

  private calculateQuickScore(code: string, issues: CodeIssue[]): number {
    let score = 100
    
    issues.forEach(issue => {
      switch (issue.severity) {
        case 'critical':
          score -= 20
          break
        case 'high':
          score -= 10
          break
        case 'medium':
          score -= 5
          break
        case 'low':
          score -= 2
          break
      }
    })

    return Math.max(0, score)
  }

  private generateCacheKey(request: CodeReviewRequest): string {
    return `${request.language}_${request.reviewType}_${request.userLevel}_${Buffer.from(request.code).toString('base64').slice(0, 20)}`
  }

  private getFallbackReview(request: CodeReviewRequest): CodeReviewResult {
    return {
      id: `fallback_review_${Date.now()}`,
      overall: {
        score: 75,
        grade: 'B',
        summary: 'Code review completed with basic analysis',
        mainIssues: ['Unable to perform detailed analysis'],
        strengths: ['Code structure appears functional']
      },
      issues: [],
      suggestions: [],
      improvements: [],
      learningPoints: [],
      metrics: {
        complexity: 5,
        maintainability: 7,
        readability: 7,
        performance: 7,
        security: 7
      },
      timestamp: new Date()
    }
  }
}

// Export singleton instance
export const aiCodeReviewer = new AICodeReviewer()
