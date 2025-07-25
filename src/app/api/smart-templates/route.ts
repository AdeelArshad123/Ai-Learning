import { NextRequest, NextResponse } from 'next/server'

interface TemplateRequest {
  pattern: string
  language: string
  framework?: string
  useCase: string
  complexity: 'simple' | 'intermediate' | 'advanced'
  features?: string[]
}

interface SmartTemplate {
  id: string
  name: string
  description: string
  code: string
  explanation: string
  dependencies?: string[]
  setup?: string[]
  usage: string
  variations?: { name: string; code: string; description: string }[]
  relatedPatterns?: string[]
  bestPractices?: string[]
}

// AI-powered template generation
async function generateSmartTemplate(request: TemplateRequest): Promise<SmartTemplate> {
  const { pattern, language, framework, useCase, complexity, features = [] } = request

  // Template generators for different patterns
  const templateGenerators = {
    'api-endpoint': generateAPIEndpointTemplate,
    'crud-operations': generateCRUDTemplate,
    'authentication': generateAuthTemplate,
    'state-management': generateStateTemplate,
    'data-fetching': generateDataFetchingTemplate,
    'form-handling': generateFormTemplate,
    'error-handling': generateErrorHandlingTemplate,
    'testing': generateTestingTemplate,
    'deployment': generateDeploymentTemplate,
    'database-connection': generateDatabaseTemplate
  }

  const generator = templateGenerators[pattern as keyof typeof templateGenerators]
  if (generator) {
    return generator(request)
  }

  // Fallback generic template
  return generateGenericTemplate(request)
}

function generateAPIEndpointTemplate(request: TemplateRequest): SmartTemplate {
  const { language, framework, complexity } = request

  if (language === 'JavaScript' && framework === 'Next.js') {
    const code = complexity === 'simple' 
      ? `// Simple Next.js API endpoint
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    const data = { message: 'Hello World', timestamp: new Date().toISOString() }
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Process the request
    const result = { success: true, data: body }
    
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Bad Request' },
      { status: 400 }
    )
  }
}`
      : `// Advanced Next.js API endpoint with validation and middleware
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import rateLimit from '@/lib/rate-limit'
import { authenticate } from '@/lib/auth'

// Request validation schema
const requestSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  data: z.object({}).optional()
})

// Rate limiting
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    await limiter.check(request, 10, 'CACHE_TOKEN')
    
    // Authentication (optional)
    const user = await authenticate(request)
    
    // Your business logic
    const data = {
      message: 'Success',
      user: user?.id,
      timestamp: new Date().toISOString()
    }
    
    return NextResponse.json(data)
  } catch (error: any) {
    if (error.message === 'Rate limit exceeded') {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }
    
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    await limiter.check(request, 5, 'CACHE_TOKEN')
    
    // Parse and validate request
    const body = await request.json()
    const validatedData = requestSchema.parse(body)
    
    // Authentication required for POST
    const user = await authenticate(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Process the request
    const result = {
      success: true,
      data: validatedData,
      userId: user.id,
      createdAt: new Date().toISOString()
    }
    
    return NextResponse.json(result, { status: 201 })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}`

    return {
      id: 'nextjs-api-endpoint',
      name: 'Next.js API Endpoint',
      description: 'Production-ready API endpoint with error handling, validation, and security',
      code,
      explanation: 'This template provides a robust API endpoint structure with proper error handling, request validation, rate limiting, and authentication.',
      dependencies: complexity === 'advanced' 
        ? ['zod', '@/lib/rate-limit', '@/lib/auth'] 
        : [],
      setup: complexity === 'advanced' 
        ? [
            'npm install zod',
            'Create rate limiting middleware',
            'Set up authentication system'
          ] 
        : [],
      usage: 'Place this file in your app/api/[endpoint]/route.ts directory',
      variations: [
        {
          name: 'With Database',
          code: '// Add database operations\nimport { db } from "@/lib/database"\n\nconst users = await db.user.findMany()',
          description: 'Include database operations'
        },
        {
          name: 'With Caching',
          code: '// Add Redis caching\nimport { redis } from "@/lib/redis"\n\nconst cached = await redis.get(key)',
          description: 'Add caching layer'
        }
      ],
      relatedPatterns: ['middleware', 'database-connection', 'authentication'],
      bestPractices: [
        'Always validate input data',
        'Implement proper error handling',
        'Use rate limiting for public endpoints',
        'Log errors for debugging',
        'Return consistent response formats'
      ]
    }
  }

  // Add more language/framework combinations...
  return generateGenericTemplate(request)
}

function generateCRUDTemplate(request: TemplateRequest): SmartTemplate {
  const { language, framework } = request

  if (language === 'JavaScript' && framework === 'React') {
    const code = `// React CRUD Operations Hook
import { useState, useEffect } from 'react'

interface Item {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export function useCRUD<T extends { id: string }>(endpoint: string) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Read - Fetch all items
  const fetchItems = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(endpoint)
      if (!response.ok) throw new Error('Failed to fetch items')
      const data = await response.json()
      setItems(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Create - Add new item
  const createItem = async (item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
      if (!response.ok) throw new Error('Failed to create item')
      const newItem = await response.json()
      setItems(prev => [...prev, newItem])
      return newItem
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Update - Modify existing item
  const updateItem = async (id: string, updates: Partial<T>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(\`\${endpoint}/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      if (!response.ok) throw new Error('Failed to update item')
      const updatedItem = await response.json()
      setItems(prev => prev.map(item => item.id === id ? updatedItem : item))
      return updatedItem
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Delete - Remove item
  const deleteItem = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(\`\${endpoint}/\${id}\`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete item')
      setItems(prev => prev.filter(item => item.id !== id))
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [endpoint])

  return {
    items,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
  }
}

// Usage Example Component
export function ItemManager() {
  const { items, loading, error, createItem, updateItem, deleteItem } = useCRUD<Item>('/api/items')
  const [newItem, setNewItem] = useState({ name: '', description: '' })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createItem(newItem)
      setNewItem({ name: '', description: '' })
    } catch (error) {
      console.error('Failed to create item:', error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <form onSubmit={handleCreate}>
        <input
          value={newItem.name}
          onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Item name"
          required
        />
        <input
          value={newItem.description}
          onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Description"
        />
        <button type="submit">Create Item</button>
      </form>

      <div>
        {items.map(item => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <button onClick={() => updateItem(item.id, { name: 'Updated Name' })}>
              Update
            </button>
            <button onClick={() => deleteItem(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}`

    return {
      id: 'react-crud-hook',
      name: 'React CRUD Operations Hook',
      description: 'Reusable React hook for Create, Read, Update, Delete operations',
      code,
      explanation: 'This template provides a complete CRUD operations hook that can be reused across your React application for managing any type of data.',
      dependencies: ['react'],
      usage: 'Import and use the useCRUD hook in your React components',
      relatedPatterns: ['api-endpoint', 'form-handling', 'state-management'],
      bestPractices: [
        'Use TypeScript for type safety',
        'Handle loading and error states',
        'Implement optimistic updates for better UX',
        'Add proper error boundaries',
        'Consider pagination for large datasets'
      ]
    }
  }

  return generateGenericTemplate(request)
}

function generateGenericTemplate(request: TemplateRequest): SmartTemplate {
  return {
    id: 'generic-template',
    name: `${request.pattern} Template`,
    description: `A basic template for ${request.pattern} in ${request.language}`,
    code: `// ${request.pattern} template for ${request.language}\n// TODO: Implement your ${request.pattern} logic here\n\nconsole.log('Template generated for ${request.useCase}');`,
    explanation: `This is a basic template structure for ${request.pattern}. Customize it according to your specific needs.`,
    usage: 'Modify this template to fit your specific use case',
    bestPractices: [
      'Follow language-specific conventions',
      'Add proper error handling',
      'Include comprehensive documentation',
      'Write tests for your implementation'
    ]
  }
}

export async function POST(request: NextRequest) {
  try {
    const templateRequest: TemplateRequest = await request.json()

    if (!templateRequest.pattern || !templateRequest.language) {
      return NextResponse.json(
        { error: 'Pattern and language are required' },
        { status: 400 }
      )
    }

    console.log('Generating smart template for:', templateRequest.pattern, templateRequest.language)

    const template = await generateSmartTemplate(templateRequest)

    return NextResponse.json({
      template,
      generated_at: new Date().toISOString(),
      request: templateRequest
    })

  } catch (error: any) {
    console.error('Error generating smart template:', error)
    
    return NextResponse.json({
      template: generateGenericTemplate({
        pattern: 'basic',
        language: 'JavaScript',
        useCase: 'general',
        complexity: 'simple'
      }),
      generated_at: new Date().toISOString(),
      error: 'Using fallback template'
    })
  }
}

export async function GET() {
  // Return available patterns and languages
  const availablePatterns = [
    'api-endpoint',
    'crud-operations', 
    'authentication',
    'state-management',
    'data-fetching',
    'form-handling',
    'error-handling',
    'testing',
    'deployment',
    'database-connection'
  ]

  const supportedLanguages = [
    'JavaScript',
    'TypeScript', 
    'Python',
    'Java',
    'Go',
    'Rust',
    'PHP'
  ]

  const frameworks = {
    JavaScript: ['React', 'Next.js', 'Express', 'Node.js'],
    TypeScript: ['React', 'Next.js', 'NestJS', 'Angular'],
    Python: ['FastAPI', 'Django', 'Flask'],
    Java: ['Spring Boot', 'Spring MVC'],
    Go: ['Gin', 'Echo', 'Fiber'],
    Rust: ['Actix', 'Warp', 'Rocket'],
    PHP: ['Laravel', 'Symfony', 'CodeIgniter']
  }

  return NextResponse.json({
    availablePatterns,
    supportedLanguages,
    frameworks,
    complexityLevels: ['simple', 'intermediate', 'advanced']
  })
}
