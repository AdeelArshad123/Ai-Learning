import { NextRequest, NextResponse } from 'next/server'
import {
  generateMainApplicationFile,
  generateModelFile,
  generateRouteFile,
  generateAuthMiddleware,
  generateConfigFiles,
  generateTestFiles,
  generateAPIDocumentation,
  generateUsageExamples,
  generateDeploymentInstructions
} from '@/lib/ai-code-generator'
import { validateGeneratedCode } from '@/lib/code-validator'

// 🚀 AI API Generator - Main Route Handler
// Generates complete API implementations in multiple programming languages

interface APIGenerationRequest {
  description: string
  languages: string[]
  authType: 'jwt' | 'oauth' | 'apikey' | 'basic' | 'none'
  database?: 'mongodb' | 'postgresql' | 'mysql' | 'sqlite' | 'none'
  features?: string[]
  complexity: 'simple' | 'moderate' | 'complex'
  includeTests?: boolean
  includeDocs?: boolean
}

interface GeneratedAPI {
  language: string
  framework: string
  files: GeneratedFile[]
  documentation: string
  examples: string[]
  deploymentInstructions: string
}

interface GeneratedFile {
  path: string
  content: string
  type: 'code' | 'config' | 'documentation' | 'test'
}

// 🎯 Main API Handler
export async function POST(request: NextRequest) {
  try {
    const body: APIGenerationRequest = await request.json()
    const { description, languages, authType, database, features, complexity, includeTests, includeDocs } = body

    // Validate input
    if (!description || !languages || languages.length === 0) {
      return NextResponse.json(
        { error: 'Description and at least one language are required' },
        { status: 400 }
      )
    }

    // Step 1: Analyze requirements
    const requirements = await analyzeRequirements(description, features || [])
    
    // Step 2: Generate API architecture
    const architecture = await generateAPIArchitecture(requirements, authType, database)
    
    // Step 3: Generate code for each language
    const generatedAPIs: GeneratedAPI[] = []

    for (const language of languages) {
      const api = await generateAPIForLanguage(
        language,
        architecture,
        requirements,
        {
          authType,
          database,
          complexity,
          includeTests: includeTests || false,
          includeDocs: includeDocs || true
        }
      )

      // Step 3.1: Validate generated code
      const validation = await validateGeneratedCode(api.files, language, api.framework)

      // Add validation results to the API object
      ;(api as any).validation = validation

      generatedAPIs.push(api)
    }

    // Step 4: Generate comprehensive documentation
    const documentation = await generateComprehensiveDocumentation(
      requirements,
      architecture,
      generatedAPIs
    )

    // Step 5: Create downloadable package
    const packageInfo = await createDownloadablePackage(generatedAPIs, documentation)

    return NextResponse.json({
      success: true,
      data: {
        requirements,
        architecture,
        generatedAPIs,
        documentation,
        packageInfo,
        generationTime: new Date().toISOString()
      }
    })

  } catch (error: any) {
    console.error('Error in AI API Generator:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate API',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// 🧠 Analyze natural language requirements
async function analyzeRequirements(description: string, features: string[]) {
  const prompt = `
Analyze the following API requirements and extract structured information:

Description: "${description}"
Additional Features: ${features.join(', ')}

Please provide a JSON response with:
1. entities: List of data models/entities
2. endpoints: List of API endpoints with HTTP methods
3. relationships: How entities relate to each other
4. businessLogic: Key business rules and logic
5. securityRequirements: Security considerations
6. performanceRequirements: Performance needs

Format as valid JSON only.
`

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-coder',
        messages: [
          {
            role: 'system',
            content: 'You are an expert API architect. Analyze requirements and return structured JSON data.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    try {
      return JSON.parse(content)
    } catch (parseError) {
      // Fallback to manual parsing if JSON is malformed
      return parseRequirementsManually(description, features)
    }

  } catch (error) {
    console.error('Error analyzing requirements:', error)
    return parseRequirementsManually(description, features)
  }
}

// 🏗️ Generate API architecture
async function generateAPIArchitecture(requirements: any, authType: string, database?: string) {
  return {
    entities: requirements.entities || [],
    endpoints: requirements.endpoints || [],
    authentication: {
      type: authType,
      implementation: getAuthImplementation(authType)
    },
    database: {
      type: database || 'none',
      schema: generateDatabaseSchema(requirements.entities || [])
    },
    middleware: [
      'cors',
      'bodyParser',
      'errorHandler',
      'logger',
      ...(authType !== 'none' ? ['authentication'] : [])
    ],
    structure: {
      routes: true,
      models: true,
      middleware: true,
      controllers: true,
      services: true,
      tests: true,
      config: true
    }
  }
}

// 🔧 Helper functions
function parseRequirementsManually(description: string, features: string[]) {
  // Fallback manual parsing logic
  const entities = extractEntities(description)
  const endpoints = generateBasicEndpoints(entities)
  
  return {
    entities,
    endpoints,
    relationships: [],
    businessLogic: [`Handle ${entities.join(', ')} operations`],
    securityRequirements: ['Input validation', 'Authentication'],
    performanceRequirements: ['Efficient database queries', 'Response caching']
  }
}

function extractEntities(description: string): string[] {
  const commonEntities = ['user', 'todo', 'task', 'item', 'product', 'order', 'post', 'comment', 'category']
  const found = commonEntities.filter(entity => 
    description.toLowerCase().includes(entity)
  )
  return found.length > 0 ? found : ['item']
}

function generateBasicEndpoints(entities: string[]) {
  const endpoints = []
  for (const entity of entities) {
    endpoints.push(
      { method: 'GET', path: `/${entity}s`, description: `Get all ${entity}s` },
      { method: 'GET', path: `/${entity}s/:id`, description: `Get ${entity} by ID` },
      { method: 'POST', path: `/${entity}s`, description: `Create new ${entity}` },
      { method: 'PUT', path: `/${entity}s/:id`, description: `Update ${entity}` },
      { method: 'DELETE', path: `/${entity}s/:id`, description: `Delete ${entity}` }
    )
  }
  return endpoints
}

function getAuthImplementation(authType: string) {
  const implementations = {
    jwt: 'JSON Web Token with refresh token support',
    oauth: 'OAuth 2.0 with PKCE flow',
    apikey: 'API Key authentication with rate limiting',
    basic: 'Basic HTTP authentication',
    none: 'No authentication required'
  }
  return implementations[authType as keyof typeof implementations] || implementations.none
}

function generateDatabaseSchema(entities: string[]) {
  return entities.map(entity => ({
    name: entity,
    fields: [
      { name: 'id', type: 'string', primary: true },
      { name: 'createdAt', type: 'datetime' },
      { name: 'updatedAt', type: 'datetime' }
    ]
  }))
}

// 🚀 Generate API for specific language
async function generateAPIForLanguage(
  language: string,
  architecture: any,
  requirements: any,
  options: any
): Promise<GeneratedAPI> {
  const framework = getPreferredFramework(language)
  const files: GeneratedFile[] = []

  // Generate main application file
  const mainFile = await generateMainApplicationFile(language, framework, architecture, options)
  files.push(mainFile)

  // Generate models/entities
  for (const entity of architecture.entities) {
    const modelFile = await generateModelFile(language, framework, entity, options)
    files.push(modelFile)
  }

  // Generate routes/controllers
  for (const endpoint of architecture.endpoints) {
    const routeFile = await generateRouteFile(language, framework, endpoint, options)
    files.push(routeFile)
  }

  // Generate middleware
  if (options.authType !== 'none') {
    const authFile = await generateAuthMiddleware(language, framework, options.authType)
    files.push(authFile)
  }

  // Generate configuration files
  const configFiles = await generateConfigFiles(language, framework, options)
  files.push(...configFiles)

  // Generate tests if requested
  if (options.includeTests) {
    const testFiles = await generateTestFiles(language, framework, architecture, options)
    files.push(...testFiles)
  }

  // Generate documentation
  const documentation = await generateAPIDocumentation(language, framework, architecture, requirements)

  // Generate examples
  const examples = await generateUsageExamples(language, framework, architecture.endpoints)

  // Generate deployment instructions
  const deploymentInstructions = await generateDeploymentInstructions(language, framework, options)

  return {
    language,
    framework,
    files,
    documentation,
    examples,
    deploymentInstructions
  }
}

// 🏗️ Generate comprehensive documentation
async function generateComprehensiveDocumentation(
  requirements: any,
  architecture: any,
  generatedAPIs: GeneratedAPI[]
) {
  const prompt = `
Generate comprehensive API documentation for the following:

Requirements: ${JSON.stringify(requirements, null, 2)}
Architecture: ${JSON.stringify(architecture, null, 2)}
Generated Languages: ${generatedAPIs.map(api => api.language).join(', ')}

Create documentation including:
1. API Overview
2. Authentication Guide
3. Endpoint Documentation
4. Data Models
5. Error Handling
6. Rate Limiting
7. Examples for each language
8. Deployment Guide

Format as Markdown.
`

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-coder',
        messages: [
          {
            role: 'system',
            content: 'You are a technical writer specializing in API documentation. Create clear, comprehensive documentation.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 3000
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || 'Documentation generation failed'

  } catch (error) {
    console.error('Error generating documentation:', error)
    return generateFallbackDocumentation(requirements, architecture, generatedAPIs)
  }
}

// 📦 Create downloadable package
async function createDownloadablePackage(generatedAPIs: GeneratedAPI[], documentation: string) {
  const packageStructure = {
    name: `generated-api-${Date.now()}`,
    version: '1.0.0',
    description: 'AI-generated API implementation',
    structure: {} as any
  }

  // Organize files by language
  for (const api of generatedAPIs) {
    packageStructure.structure[`${api.language}-${api.framework}`] = {
      files: api.files.map(f => ({ path: f.path, type: f.type })),
      documentation: api.documentation,
      examples: api.examples,
      deployment: api.deploymentInstructions
    }
  }

  // Add global documentation
  packageStructure.structure['documentation'] = {
    'README.md': documentation,
    'API-SPEC.md': 'Generated API specification',
    'DEPLOYMENT.md': 'Deployment instructions for all languages'
  }

  return packageStructure
}

// 🔧 Helper functions for code generation
function getPreferredFramework(language: string): string {
  const frameworks = {
    python: 'fastapi',
    javascript: 'express',
    typescript: 'express',
    java: 'spring-boot',
    csharp: 'aspnet-core',
    go: 'gin',
    ruby: 'rails',
    php: 'laravel',
    rust: 'actix-web'
  }
  return frameworks[language as keyof typeof frameworks] || 'express'
}

function generateFallbackDocumentation(requirements: any, architecture: any, generatedAPIs: GeneratedAPI[]) {
  return `
# Generated API Documentation

## Overview
This API was generated based on your requirements and includes implementations in ${generatedAPIs.map(api => api.language).join(', ')}.

## Entities
${architecture.entities.map((entity: string) => `- ${entity}`).join('\n')}

## Endpoints
${architecture.endpoints.map((endpoint: any) => `- ${endpoint.method} ${endpoint.path}: ${endpoint.description}`).join('\n')}

## Authentication
Type: ${architecture.authentication.type}
Implementation: ${architecture.authentication.implementation}

## Getting Started
1. Choose your preferred language implementation
2. Follow the setup instructions in the respective README
3. Configure your database connection
4. Run the application

## Support
For questions or issues, please refer to the individual language documentation.
`
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'AI API Generator is ready',
    supportedLanguages: [
      'python',
      'javascript',
      'typescript',
      'java',
      'csharp',
      'go',
      'ruby',
      'php',
      'rust'
    ],
    supportedAuth: ['jwt', 'oauth', 'apikey', 'basic', 'none'],
    supportedDatabases: ['mongodb', 'postgresql', 'mysql', 'sqlite', 'none']
  })
}
