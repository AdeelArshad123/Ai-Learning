// 🔍 Code Validation System
// Validates generated code for syntax, structure, and best practices

interface ValidationResult {
  isValid: boolean
  score: number // 0-100
  issues: ValidationIssue[]
  suggestions: string[]
}

interface ValidationIssue {
  type: 'error' | 'warning' | 'info'
  message: string
  line?: number
  severity: 'high' | 'medium' | 'low'
}

interface GeneratedFile {
  path: string
  content: string
  type: 'code' | 'config' | 'documentation' | 'test'
}

// 🎯 Main validation function
export async function validateGeneratedCode(
  files: GeneratedFile[],
  language: string,
  framework: string
): Promise<ValidationResult> {
  const issues: ValidationIssue[] = []
  const suggestions: string[] = []
  let totalScore = 0
  let fileCount = 0

  for (const file of files) {
    if (file.type === 'code') {
      const fileValidation = await validateFile(file, language, framework)
      issues.push(...fileValidation.issues)
      suggestions.push(...fileValidation.suggestions)
      totalScore += fileValidation.score
      fileCount++
    }
  }

  // Validate overall structure
  const structureValidation = validateProjectStructure(files, language, framework)
  issues.push(...structureValidation.issues)
  suggestions.push(...structureValidation.suggestions)

  const averageScore = fileCount > 0 ? Math.round(totalScore / fileCount) : 0
  const finalScore = Math.max(0, averageScore - (issues.filter(i => i.severity === 'high').length * 10))

  return {
    isValid: issues.filter(i => i.type === 'error').length === 0,
    score: finalScore,
    issues,
    suggestions
  }
}

// 📄 Validate individual file
async function validateFile(
  file: GeneratedFile,
  language: string,
  framework: string
): Promise<ValidationResult> {
  const issues: ValidationIssue[] = []
  const suggestions: string[] = []
  let score = 100

  // Basic syntax validation
  const syntaxValidation = validateSyntax(file.content, language)
  issues.push(...syntaxValidation.issues)
  score -= syntaxValidation.issues.filter(i => i.severity === 'high').length * 15

  // Code structure validation
  const structureValidation = validateCodeStructure(file.content, language, framework)
  issues.push(...structureValidation.issues)
  score -= structureValidation.issues.filter(i => i.severity === 'medium').length * 5

  // Best practices validation
  const practicesValidation = validateBestPractices(file.content, language)
  issues.push(...practicesValidation.issues)
  suggestions.push(...practicesValidation.suggestions)

  // Security validation
  const securityValidation = validateSecurity(file.content, language)
  issues.push(...securityValidation.issues)
  score -= securityValidation.issues.filter(i => i.severity === 'high').length * 20

  return {
    isValid: issues.filter(i => i.type === 'error').length === 0,
    score: Math.max(0, score),
    issues,
    suggestions
  }
}

// 🔤 Basic syntax validation
function validateSyntax(content: string, language: string): ValidationResult {
  const issues: ValidationIssue[] = []
  const suggestions: string[] = []

  try {
    switch (language) {
      case 'javascript':
      case 'typescript':
        validateJavaScriptSyntax(content, issues)
        break
      case 'python':
        validatePythonSyntax(content, issues)
        break
      case 'java':
        validateJavaSyntax(content, issues)
        break
      default:
        // Basic validation for other languages
        validateBasicSyntax(content, issues)
    }
  } catch (error) {
    issues.push({
      type: 'error',
      message: `Syntax validation failed: ${error}`,
      severity: 'high'
    })
  }

  return { isValid: issues.length === 0, score: 100, issues, suggestions }
}

// 🏗️ Code structure validation
function validateCodeStructure(content: string, language: string, framework: string): ValidationResult {
  const issues: ValidationIssue[] = []
  const suggestions: string[] = []

  // Check for proper imports/requires
  if (!hasProperImports(content, language, framework)) {
    issues.push({
      type: 'warning',
      message: 'Missing or incomplete import statements',
      severity: 'medium'
    })
    suggestions.push('Add proper import/require statements for dependencies')
  }

  // Check for error handling
  if (!hasErrorHandling(content, language)) {
    issues.push({
      type: 'warning',
      message: 'Limited error handling detected',
      severity: 'medium'
    })
    suggestions.push('Add try-catch blocks and proper error responses')
  }

  // Check for proper function/method structure
  if (!hasProperFunctionStructure(content, language)) {
    issues.push({
      type: 'warning',
      message: 'Functions may lack proper structure or documentation',
      severity: 'low'
    })
    suggestions.push('Add function documentation and proper parameter validation')
  }

  return { isValid: true, score: 100, issues, suggestions }
}

// 🛡️ Security validation
function validateSecurity(content: string, language: string): ValidationResult {
  const issues: ValidationIssue[] = []
  const suggestions: string[] = []

  // Check for hardcoded secrets
  const secretPatterns = [
    /password\s*=\s*["'][^"']+["']/i,
    /api[_-]?key\s*=\s*["'][^"']+["']/i,
    /secret\s*=\s*["'][^"']+["']/i,
    /token\s*=\s*["'][^"']+["']/i
  ]

  secretPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      issues.push({
        type: 'error',
        message: 'Potential hardcoded secret detected',
        severity: 'high'
      })
      suggestions.push('Use environment variables for sensitive data')
    }
  })

  // Check for SQL injection vulnerabilities
  if (content.includes('SELECT') && content.includes('+')) {
    issues.push({
      type: 'warning',
      message: 'Potential SQL injection vulnerability',
      severity: 'high'
    })
    suggestions.push('Use parameterized queries or ORM methods')
  }

  // Check for proper input validation
  if (!hasInputValidation(content, language)) {
    issues.push({
      type: 'warning',
      message: 'Limited input validation detected',
      severity: 'medium'
    })
    suggestions.push('Add input validation and sanitization')
  }

  return { isValid: true, score: 100, issues, suggestions }
}

// 📋 Best practices validation
function validateBestPractices(content: string, language: string): ValidationResult {
  const issues: ValidationIssue[] = []
  const suggestions: string[] = []

  // Check for proper naming conventions
  if (!hasProperNaming(content, language)) {
    issues.push({
      type: 'info',
      message: 'Consider improving variable/function naming',
      severity: 'low'
    })
    suggestions.push('Use descriptive names following language conventions')
  }

  // Check for code comments
  if (!hasAdequateComments(content)) {
    issues.push({
      type: 'info',
      message: 'Code could benefit from more comments',
      severity: 'low'
    })
    suggestions.push('Add comments explaining complex logic')
  }

  // Check for proper logging
  if (!hasLogging(content, language)) {
    suggestions.push('Consider adding logging for debugging and monitoring')
  }

  return { isValid: true, score: 100, issues, suggestions }
}

// 🏢 Project structure validation
function validateProjectStructure(files: GeneratedFile[], language: string, framework: string): ValidationResult {
  const issues: ValidationIssue[] = []
  const suggestions: string[] = []

  const filePaths = files.map(f => f.path)
  
  // Check for main application file
  const mainFiles = ['main.py', 'server.js', 'server.ts', 'app.js', 'index.js', 'Application.java']
  if (!mainFiles.some(main => filePaths.some(path => path.includes(main)))) {
    issues.push({
      type: 'warning',
      message: 'Main application file not clearly identified',
      severity: 'medium'
    })
  }

  // Check for configuration files
  const hasConfig = filePaths.some(path => 
    path.includes('config') || 
    path.includes('.env') || 
    path.includes('package.json') || 
    path.includes('requirements.txt')
  )
  
  if (!hasConfig) {
    issues.push({
      type: 'warning',
      message: 'Missing configuration files',
      severity: 'medium'
    })
    suggestions.push('Add configuration files for dependencies and environment')
  }

  // Check for proper directory structure
  const hasModels = filePaths.some(path => path.includes('model'))
  const hasRoutes = filePaths.some(path => path.includes('route') || path.includes('controller'))
  
  if (!hasModels && !hasRoutes) {
    suggestions.push('Consider organizing code into models, routes, and controllers')
  }

  return { isValid: true, score: 100, issues, suggestions }
}

// Helper functions for specific language validations
function validateJavaScriptSyntax(content: string, issues: ValidationIssue[]) {
  // Basic JavaScript syntax checks
  const braceCount = (content.match(/\{/g) || []).length - (content.match(/\}/g) || []).length
  if (braceCount !== 0) {
    issues.push({
      type: 'error',
      message: 'Mismatched braces detected',
      severity: 'high'
    })
  }

  const parenCount = (content.match(/\(/g) || []).length - (content.match(/\)/g) || []).length
  if (parenCount !== 0) {
    issues.push({
      type: 'error',
      message: 'Mismatched parentheses detected',
      severity: 'high'
    })
  }
}

function validatePythonSyntax(content: string, issues: ValidationIssue[]) {
  // Basic Python syntax checks
  const lines = content.split('\n')
  let indentLevel = 0
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.trim().endsWith(':')) {
      indentLevel++
    }
    // Basic indentation check (simplified)
    const leadingSpaces = line.length - line.trimStart().length
    if (line.trim() && leadingSpaces % 4 !== 0 && leadingSpaces > 0) {
      issues.push({
        type: 'warning',
        message: `Inconsistent indentation at line ${i + 1}`,
        line: i + 1,
        severity: 'medium'
      })
    }
  }
}

function validateJavaSyntax(content: string, issues: ValidationIssue[]) {
  // Basic Java syntax checks
  if (!content.includes('public class') && !content.includes('interface')) {
    issues.push({
      type: 'warning',
      message: 'No public class or interface found',
      severity: 'medium'
    })
  }
}

function validateBasicSyntax(content: string, issues: ValidationIssue[]) {
  // Basic syntax validation for other languages
  const braceCount = (content.match(/\{/g) || []).length - (content.match(/\}/g) || []).length
  if (Math.abs(braceCount) > 2) {
    issues.push({
      type: 'warning',
      message: 'Potential brace mismatch detected',
      severity: 'medium'
    })
  }
}

// Helper validation functions
function hasProperImports(content: string, language: string, framework: string): boolean {
  const importPatterns = {
    javascript: /(?:import|require)\s+/,
    python: /(?:import|from)\s+/,
    java: /import\s+/,
    csharp: /using\s+/
  }
  
  const pattern = importPatterns[language as keyof typeof importPatterns]
  return pattern ? pattern.test(content) : true
}

function hasErrorHandling(content: string, language: string): boolean {
  const errorPatterns = {
    javascript: /(?:try\s*\{|catch\s*\()/,
    python: /(?:try:|except\s+)/,
    java: /(?:try\s*\{|catch\s*\()/,
    csharp: /(?:try\s*\{|catch\s*\()/
  }
  
  const pattern = errorPatterns[language as keyof typeof errorPatterns]
  return pattern ? pattern.test(content) : false
}

function hasProperFunctionStructure(content: string, language: string): boolean {
  const functionPatterns = {
    javascript: /function\s+\w+\s*\(|const\s+\w+\s*=\s*\(/,
    python: /def\s+\w+\s*\(/,
    java: /(?:public|private|protected)\s+\w+\s+\w+\s*\(/
  }
  
  const pattern = functionPatterns[language as keyof typeof functionPatterns]
  return pattern ? pattern.test(content) : true
}

function hasInputValidation(content: string, language: string): boolean {
  const validationKeywords = ['validate', 'check', 'verify', 'sanitize', 'filter']
  return validationKeywords.some(keyword => content.toLowerCase().includes(keyword))
}

function hasProperNaming(content: string, language: string): boolean {
  // Simple check for descriptive naming (not single letters)
  const variablePattern = /(?:var|let|const|def)\s+[a-zA-Z_][a-zA-Z0-9_]{2,}/
  return variablePattern.test(content)
}

function hasAdequateComments(content: string): boolean {
  const commentLines = content.split('\n').filter(line => 
    line.trim().startsWith('//') || 
    line.trim().startsWith('#') || 
    line.trim().startsWith('/*')
  ).length
  
  const totalLines = content.split('\n').length
  return commentLines / totalLines > 0.1 // At least 10% comments
}

function hasLogging(content: string, language: string): boolean {
  const loggingKeywords = ['console.log', 'print(', 'logger', 'log.', 'System.out']
  return loggingKeywords.some(keyword => content.includes(keyword))
}
