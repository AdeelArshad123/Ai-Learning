import { NextRequest, NextResponse } from 'next/server'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'tutorial' | 'documentation' | 'video' | 'tool' | 'course' | 'article' | 'repository'
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  url: string
  rating: number
  duration?: string
  author: string
  tags: string[]
  isPopular?: boolean
  isFree?: boolean
}

// Comprehensive learning resources database
const learningResources: SearchResult[] = [
  // React Resources
  {
    id: 'react-docs',
    title: 'React Official Documentation',
    description: 'The official React documentation with comprehensive guides, API reference, and interactive examples',
    type: 'documentation',
    category: 'Frontend',
    difficulty: 'Intermediate',
    url: 'https://react.dev/learn',
    rating: 4.9,
    author: 'React Team',
    tags: ['react', 'javascript', 'frontend', 'components', 'hooks'],
    isPopular: true,
    isFree: true
  },
  {
    id: 'react-tutorial',
    title: 'React Tutorial for Beginners',
    description: 'Complete React tutorial covering components, state, props, and modern React patterns',
    type: 'tutorial',
    category: 'Frontend',
    difficulty: 'Beginner',
    url: 'https://react.dev/learn/tutorial-tic-tac-toe',
    rating: 4.8,
    duration: '2 hours',
    author: 'React Team',
    tags: ['react', 'beginner', 'tutorial', 'components'],
    isPopular: true,
    isFree: true
  },

  // JavaScript Resources
  {
    id: 'mdn-javascript',
    title: 'JavaScript Guide - MDN',
    description: 'Comprehensive JavaScript guide covering fundamentals to advanced concepts',
    type: 'documentation',
    category: 'Programming',
    difficulty: 'Intermediate',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
    rating: 4.9,
    author: 'MDN Contributors',
    tags: ['javascript', 'programming', 'web-development', 'es6'],
    isPopular: true,
    isFree: true
  },
  {
    id: 'javascript-info',
    title: 'The Modern JavaScript Tutorial',
    description: 'Modern JavaScript tutorial with detailed explanations and practical examples',
    type: 'tutorial',
    category: 'Programming',
    difficulty: 'Beginner',
    url: 'https://javascript.info/',
    rating: 4.8,
    duration: '40 hours',
    author: 'Ilya Kantor',
    tags: ['javascript', 'modern-js', 'tutorial', 'comprehensive'],
    isPopular: true,
    isFree: true
  },

  // Python Resources
  {
    id: 'python-docs',
    title: 'Python Official Documentation',
    description: 'Official Python documentation with tutorials, library reference, and language reference',
    type: 'documentation',
    category: 'Programming',
    difficulty: 'Intermediate',
    url: 'https://docs.python.org/3/',
    rating: 4.7,
    author: 'Python Software Foundation',
    tags: ['python', 'programming', 'documentation', 'official'],
    isFree: true
  },
  {
    id: 'automate-boring-stuff',
    title: 'Automate the Boring Stuff with Python',
    description: 'Practical programming for total beginners - learn Python by automating everyday tasks',
    type: 'course',
    category: 'Programming',
    difficulty: 'Beginner',
    url: 'https://automatetheboringstuff.com/',
    rating: 4.8,
    duration: '15 hours',
    author: 'Al Sweigart',
    tags: ['python', 'automation', 'beginner', 'practical'],
    isPopular: true,
    isFree: true
  },

  // TypeScript Resources
  {
    id: 'typescript-handbook',
    title: 'TypeScript Handbook',
    description: 'Official TypeScript handbook covering types, interfaces, generics, and advanced patterns',
    type: 'documentation',
    category: 'Programming',
    difficulty: 'Intermediate',
    url: 'https://www.typescriptlang.org/docs/',
    rating: 4.8,
    author: 'Microsoft',
    tags: ['typescript', 'javascript', 'types', 'static-typing'],
    isPopular: true,
    isFree: true
  },

  // Next.js Resources
  {
    id: 'nextjs-docs',
    title: 'Next.js Documentation',
    description: 'Complete Next.js documentation with guides for app router, API routes, and deployment',
    type: 'documentation',
    category: 'Framework',
    difficulty: 'Intermediate',
    url: 'https://nextjs.org/docs',
    rating: 4.9,
    author: 'Vercel Team',
    tags: ['nextjs', 'react', 'fullstack', 'ssr', 'app-router'],
    isPopular: true,
    isFree: true
  },

  // Node.js Resources
  {
    id: 'nodejs-docs',
    title: 'Node.js Documentation',
    description: 'Official Node.js documentation with API reference and guides',
    type: 'documentation',
    category: 'Backend',
    difficulty: 'Intermediate',
    url: 'https://nodejs.org/en/docs/',
    rating: 4.7,
    author: 'Node.js Foundation',
    tags: ['nodejs', 'javascript', 'backend', 'server'],
    isFree: true
  },

  // CSS Resources
  {
    id: 'css-tricks',
    title: 'CSS-Tricks Complete Guide',
    description: 'Comprehensive CSS guides, tricks, and modern techniques for web styling',
    type: 'article',
    category: 'Frontend',
    difficulty: 'Intermediate',
    url: 'https://css-tricks.com/guides/',
    rating: 4.6,
    author: 'CSS-Tricks Team',
    tags: ['css', 'styling', 'frontend', 'flexbox', 'grid'],
    isPopular: true,
    isFree: true
  },

  // Git Resources
  {
    id: 'git-handbook',
    title: 'Git Handbook',
    description: 'Learn Git version control with practical examples and best practices',
    type: 'tutorial',
    category: 'Tools',
    difficulty: 'Beginner',
    url: 'https://guides.github.com/introduction/git-handbook/',
    rating: 4.7,
    duration: '1 hour',
    author: 'GitHub',
    tags: ['git', 'version-control', 'github', 'collaboration'],
    isPopular: true,
    isFree: true
  },

  // Docker Resources
  {
    id: 'docker-docs',
    title: 'Docker Documentation',
    description: 'Official Docker documentation covering containers, images, and orchestration',
    type: 'documentation',
    category: 'DevOps',
    difficulty: 'Intermediate',
    url: 'https://docs.docker.com/',
    rating: 4.6,
    author: 'Docker Inc.',
    tags: ['docker', 'containers', 'devops', 'deployment'],
    isFree: true
  },

  // Machine Learning Resources
  {
    id: 'ml-course',
    title: 'Machine Learning Course - Andrew Ng',
    description: 'Stanford\'s machine learning course covering algorithms, neural networks, and practical applications',
    type: 'course',
    category: 'AI/ML',
    difficulty: 'Advanced',
    url: 'https://www.coursera.org/learn/machine-learning',
    rating: 4.9,
    duration: '60 hours',
    author: 'Andrew Ng',
    tags: ['machine-learning', 'ai', 'algorithms', 'neural-networks'],
    isPopular: true,
    isFree: false
  },

  // Web Development Resources
  {
    id: 'freecodecamp',
    title: 'freeCodeCamp Full Stack Curriculum',
    description: 'Complete full-stack web development curriculum with projects and certifications',
    type: 'course',
    category: 'Web Development',
    difficulty: 'Beginner',
    url: 'https://www.freecodecamp.org/',
    rating: 4.8,
    duration: '300+ hours',
    author: 'freeCodeCamp',
    tags: ['web-development', 'fullstack', 'html', 'css', 'javascript'],
    isPopular: true,
    isFree: true
  },

  // Database Resources
  {
    id: 'mongodb-docs',
    title: 'MongoDB Documentation',
    description: 'Complete MongoDB documentation with tutorials, reference, and best practices',
    type: 'documentation',
    category: 'Database',
    difficulty: 'Intermediate',
    url: 'https://docs.mongodb.com/',
    rating: 4.5,
    author: 'MongoDB Inc.',
    tags: ['mongodb', 'database', 'nosql', 'backend'],
    isFree: true
  }
]

// AI-powered search suggestions
const generateAISuggestions = (query: string): string[] => {
  const suggestions = [
    'React hooks tutorial',
    'JavaScript ES6 features',
    'Python data structures',
    'TypeScript for beginners',
    'Next.js app router',
    'Node.js REST API',
    'CSS Grid layout',
    'Git workflow best practices',
    'Docker containerization',
    'Machine learning basics'
  ]

  // Filter suggestions based on query
  const filtered = suggestions.filter(s => 
    s.toLowerCase().includes(query.toLowerCase()) ||
    query.toLowerCase().split(' ').some(word => s.toLowerCase().includes(word))
  )

  return filtered.length > 0 ? filtered.slice(0, 5) : suggestions.slice(0, 5)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, type = 'all', difficulty = 'all', includeAISuggestions = false } = body

    if (!query || !query.trim()) {
      return NextResponse.json({
        results: [],
        total: 0,
        aiSuggestions: includeAISuggestions ? generateAISuggestions('') : []
      })
    }

    // Filter results based on query
    let filteredResults = learningResources.filter(resource => {
      const searchText = `${resource.title} ${resource.description} ${resource.tags.join(' ')} ${resource.category}`.toLowerCase()
      const queryWords = query.toLowerCase().split(' ')
      
      return queryWords.some(word => searchText.includes(word))
    })

    // Apply type filter
    if (type !== 'all') {
      filteredResults = filteredResults.filter(resource => resource.type === type)
    }

    // Apply difficulty filter
    if (difficulty !== 'all') {
      filteredResults = filteredResults.filter(resource => resource.difficulty === difficulty)
    }

    // Sort by relevance (rating and popularity)
    filteredResults.sort((a, b) => {
      const aScore = (a.rating * 10) + (a.isPopular ? 5 : 0) + (a.isFree ? 2 : 0)
      const bScore = (b.rating * 10) + (b.isPopular ? 5 : 0) + (b.isFree ? 2 : 0)
      return bScore - aScore
    })

    // Generate AI suggestions
    const aiSuggestions = includeAISuggestions ? generateAISuggestions(query) : []

    return NextResponse.json({
      success: true,
      results: filteredResults.slice(0, 20),
      total: filteredResults.length,
      aiSuggestions,
      query,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Error in AI search:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to perform search',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'AI Search API',
    description: 'AI-powered search for learning resources',
    usage: 'POST with query, type, difficulty, and includeAISuggestions parameters',
    availableTypes: ['tutorial', 'documentation', 'video', 'tool', 'course', 'article', 'repository'],
    availableDifficulties: ['Beginner', 'Intermediate', 'Advanced'],
    totalResources: learningResources.length
  })
}
