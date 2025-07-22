import { NextRequest, NextResponse } from 'next/server'

// Mock data for search
const searchData = {
  topics: [
    { id: 'javascript-basics', title: 'JavaScript Fundamentals', type: 'topic', difficulty: 'Beginner' },
    { id: 'react-fundamentals', title: 'React Fundamentals', type: 'topic', difficulty: 'Intermediate' },
    { id: 'python-basics', title: 'Python Programming', type: 'topic', difficulty: 'Beginner' },
    { id: 'ai-ml-basics', title: 'AI & Machine Learning', type: 'topic', difficulty: 'Advanced' },
    { id: 'web-development', title: 'Full-Stack Web Development', type: 'topic', difficulty: 'Intermediate' }
  ],
  tools: [
    { id: 'vscode', title: 'Visual Studio Code', type: 'tool', category: 'IDE' },
    { id: 'github', title: 'GitHub', type: 'tool', category: 'Version Control' },
    { id: 'docker', title: 'Docker', type: 'tool', category: 'DevOps' },
    { id: 'react', title: 'React.js', type: 'tool', category: 'Frontend' },
    { id: 'nodejs', title: 'Node.js', type: 'tool', category: 'Backend' },
    { id: 'python', title: 'Python', type: 'tool', category: 'Programming Language' },
    { id: 'typescript', title: 'TypeScript', type: 'tool', category: 'Programming Language' },
    { id: 'tailwind', title: 'Tailwind CSS', type: 'tool', category: 'CSS Framework' }
  ],
  channels: [
    { id: 'traversy', title: 'Traversy Media', type: 'channel', category: 'Web Development' },
    { id: 'freecodecamp', title: 'freeCodeCamp', type: 'channel', category: 'Programming' },
    { id: 'thecodingtrain', title: 'The Coding Train', type: 'channel', category: 'Creative Coding' },
    { id: 'sentdex', title: 'Sentdex', type: 'channel', category: 'Machine Learning' },
    { id: 'techwithtim', title: 'Tech With Tim', type: 'channel', category: 'Python' }
  ],
  articles: [
    { id: 'js-guide', title: 'JavaScript Complete Guide', type: 'article', category: 'Programming' },
    { id: 'react-hooks', title: 'React Hooks Explained', type: 'article', category: 'Frontend' },
    { id: 'python-basics', title: 'Python for Beginners', type: 'article', category: 'Programming' },
    { id: 'ai-intro', title: 'Introduction to AI', type: 'article', category: 'AI/ML' }
  ]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'all'
    const category = searchParams.get('category') || 'all'
    const difficulty = searchParams.get('difficulty') || 'all'

    if (!query.trim()) {
      return NextResponse.json({ results: [], total: 0 })
    }

    let results = []

    // Search in topics
    if (type === 'all' || type === 'topics') {
      const topicResults = searchData.topics.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) &&
        (difficulty === 'all' || item.difficulty === difficulty)
      )
      results.push(...topicResults)
    }

    // Search in tools
    if (type === 'all' || type === 'tools') {
      const toolResults = searchData.tools.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) &&
        (category === 'all' || item.category === category)
      )
      results.push(...toolResults)
    }

    // Search in channels
    if (type === 'all' || type === 'channels') {
      const channelResults = searchData.channels.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) &&
        (category === 'all' || item.category === category)
      )
      results.push(...channelResults)
    }

    // Search in articles
    if (type === 'all' || type === 'articles') {
      const articleResults = searchData.articles.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) &&
        (category === 'all' || item.category === category)
      )
      results.push(...articleResults)
    }

    // Sort results by relevance (exact matches first)
    results.sort((a, b) => {
      const aExact = a.title.toLowerCase() === query.toLowerCase()
      const bExact = b.title.toLowerCase() === query.toLowerCase()
      
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      
      return a.title.toLowerCase().indexOf(query.toLowerCase()) - b.title.toLowerCase().indexOf(query.toLowerCase())
    })

    // Add search suggestions
    const suggestions = generateSuggestions(query, searchData)

    return NextResponse.json({
      results: results.slice(0, 20), // Limit to 20 results
      total: results.length,
      suggestions,
      query
    })
  } catch (error) {
    console.error('Error performing search:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateSuggestions(query: string, data: any) {
  const allItems = [
    ...data.topics.map((item: any) => ({ ...item, suggestion: item.title })),
    ...data.tools.map((item: any) => ({ ...item, suggestion: item.title })),
    ...data.channels.map((item: any) => ({ ...item, suggestion: item.title })),
    ...data.articles.map((item: any) => ({ ...item, suggestion: item.title }))
  ]

  const suggestions = allItems
    .filter((item: any) => 
      item.title.toLowerCase().includes(query.toLowerCase()) &&
      item.title.toLowerCase() !== query.toLowerCase()
    )
    .slice(0, 5)
    .map((item: any) => item.suggestion)

  return suggestions
} 