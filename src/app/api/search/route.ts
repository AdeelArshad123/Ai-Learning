import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

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
    const query = searchParams.get('q')
    const type = searchParams.get('type') || 'all'
    const category = searchParams.get('category') || 'all'
    const difficulty = searchParams.get('difficulty') || 'all'

    if (!query) {
      return NextResponse.json({ results: [], total: 0 })
    }

    if (!query.trim()) {
      return NextResponse.json({ results: [], total: 0 })
    }

    // Use OpenAI to enhance search
    const prompt = `
      You are a search assistant. Given the query: "${query}", rank and filter the following items by relevance. Return a JSON array of item ids in order of relevance.
      Items:
      ${JSON.stringify(searchData)}
    `

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 500
    })

    const rankedIds = JSON.parse(completion.choices[0].message.content)

    // Flatten all items for lookup
    const allItems = [
      ...searchData.topics,
      ...searchData.tools,
      ...searchData.channels,
      ...searchData.articles
    ]

    // Filter and order results by rankedIds
    let results = rankedIds
      .map((id: string) => allItems.find((item: any) => item.id === id))
      .filter(Boolean)

    // Apply type, category, difficulty filters
    results = results.filter((item: any) => {
      if (!item) return false
      if (type !== 'all' && item.type !== type) return false
      if (category !== 'all' && item.category !== category) return false
      if (difficulty !== 'all' && item.difficulty !== difficulty) return false
      return true
    })

    // Generate AI-based suggestions (simple example)
    const suggestions = results.slice(0, 5).map((item: any) => item.title)

    return NextResponse.json({
      results: results.slice(0, 20),
      total: results.length,
      suggestions,
      query
    })
  } catch (error) {
    console.error('Error performing AI-powered search:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
