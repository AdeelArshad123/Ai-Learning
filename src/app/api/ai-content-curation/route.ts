import { NextRequest, NextResponse } from 'next/server'

// 🤖 AI Content Curation API - Intelligently curates and ranks content
interface ContentItem {
  id: string
  title: string
  description: string
  url: string
  type: 'tutorial' | 'course' | 'article' | 'video' | 'tool' | 'repository'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  topics: string[]
  author: string
  rating: number
  views: number
  lastUpdated: string
  estimatedTime: string
  aiScore: number
  personalizedScore?: number
  reasons: string[]
}

interface UserProfile {
  skillLevel: string
  interests: string[]
  learningStyle: string
  completedTopics: string[]
  weakAreas: string[]
  goals: string[]
}

// Mock content database with AI scoring
const contentDatabase: ContentItem[] = [
  {
    id: '1',
    title: 'React Hooks Complete Guide',
    description: 'Master useState, useEffect, useContext, and custom hooks with practical examples',
    url: 'https://example.com/react-hooks-guide',
    type: 'tutorial',
    difficulty: 'intermediate',
    topics: ['React', 'JavaScript', 'Hooks', 'Frontend'],
    author: 'React Expert',
    rating: 4.8,
    views: 125000,
    lastUpdated: '2024-01-15',
    estimatedTime: '45 minutes',
    aiScore: 95,
    reasons: ['Comprehensive coverage', 'Practical examples', 'Up-to-date content']
  },
  {
    id: '2',
    title: 'Building REST APIs with Node.js',
    description: 'Learn to build scalable REST APIs using Node.js, Express, and MongoDB',
    url: 'https://example.com/nodejs-api-tutorial',
    type: 'course',
    difficulty: 'intermediate',
    topics: ['Node.js', 'Express', 'MongoDB', 'Backend', 'API'],
    author: 'Backend Guru',
    rating: 4.7,
    views: 89000,
    lastUpdated: '2024-01-10',
    estimatedTime: '3 hours',
    aiScore: 92,
    reasons: ['Industry best practices', 'Real-world examples', 'Complete project']
  },
  {
    id: '3',
    title: 'CSS Grid Layout Mastery',
    description: 'Master CSS Grid with interactive examples and real-world layouts',
    url: 'https://example.com/css-grid-mastery',
    type: 'tutorial',
    difficulty: 'beginner',
    topics: ['CSS', 'Layout', 'Frontend', 'Design'],
    author: 'CSS Wizard',
    rating: 4.9,
    views: 156000,
    lastUpdated: '2024-01-20',
    estimatedTime: '30 minutes',
    aiScore: 88,
    reasons: ['Visual learning approach', 'Interactive examples', 'Beginner-friendly']
  },
  {
    id: '4',
    title: 'TypeScript for JavaScript Developers',
    description: 'Transition from JavaScript to TypeScript with confidence',
    url: 'https://example.com/typescript-guide',
    type: 'course',
    difficulty: 'intermediate',
    topics: ['TypeScript', 'JavaScript', 'Types', 'Development'],
    author: 'Type Master',
    rating: 4.6,
    views: 78000,
    lastUpdated: '2024-01-12',
    estimatedTime: '2 hours',
    aiScore: 90,
    reasons: ['Smooth transition guide', 'Practical examples', 'Industry relevance']
  },
  {
    id: '5',
    title: 'Next.js Full-Stack Development',
    description: 'Build full-stack applications with Next.js, including API routes and deployment',
    url: 'https://example.com/nextjs-fullstack',
    type: 'course',
    difficulty: 'advanced',
    topics: ['Next.js', 'React', 'Full-Stack', 'Deployment'],
    author: 'Full-Stack Pro',
    rating: 4.8,
    views: 92000,
    lastUpdated: '2024-01-18',
    estimatedTime: '4 hours',
    aiScore: 94,
    reasons: ['Complete full-stack coverage', 'Modern practices', 'Production-ready']
  },
  {
    id: '6',
    title: 'Python Data Science Fundamentals',
    description: 'Learn data analysis and visualization with Python, Pandas, and Matplotlib',
    url: 'https://example.com/python-data-science',
    type: 'course',
    difficulty: 'beginner',
    topics: ['Python', 'Data Science', 'Pandas', 'Visualization'],
    author: 'Data Scientist',
    rating: 4.7,
    views: 134000,
    lastUpdated: '2024-01-14',
    estimatedTime: '3.5 hours',
    aiScore: 91,
    reasons: ['Hands-on approach', 'Real datasets', 'Career-focused']
  }
]

// AI-powered content scoring algorithm
function calculatePersonalizedScore(content: ContentItem, userProfile: UserProfile): number {
  let score = content.aiScore

  // Skill level matching
  if (content.difficulty === userProfile.skillLevel) {
    score += 10
  } else if (
    (userProfile.skillLevel === 'beginner' && content.difficulty === 'intermediate') ||
    (userProfile.skillLevel === 'intermediate' && content.difficulty === 'advanced')
  ) {
    score += 5 // Slight preference for next level up
  } else if (
    (userProfile.skillLevel === 'intermediate' && content.difficulty === 'beginner') ||
    (userProfile.skillLevel === 'advanced' && content.difficulty === 'intermediate')
  ) {
    score -= 5 // Slight penalty for lower level
  } else {
    score -= 10 // Significant penalty for mismatched difficulty
  }

  // Interest matching
  const matchingInterests = content.topics.filter(topic => 
    userProfile.interests.some(interest => 
      interest.toLowerCase().includes(topic.toLowerCase()) ||
      topic.toLowerCase().includes(interest.toLowerCase())
    )
  )
  score += matchingInterests.length * 8

  // Goal alignment
  const goalAlignment = userProfile.goals.filter(goal =>
    content.topics.some(topic => 
      goal.toLowerCase().includes(topic.toLowerCase()) ||
      topic.toLowerCase().includes(goal.toLowerCase())
    )
  )
  score += goalAlignment.length * 12

  // Weak area improvement
  const addressesWeakAreas = content.topics.filter(topic =>
    userProfile.weakAreas.some(weak => 
      weak.toLowerCase().includes(topic.toLowerCase()) ||
      topic.toLowerCase().includes(weak.toLowerCase())
    )
  )
  score += addressesWeakAreas.length * 15

  // Avoid already completed topics (but don't penalize too much for review)
  const alreadyCompleted = content.topics.filter(topic =>
    userProfile.completedTopics.some(completed => 
      completed.toLowerCase().includes(topic.toLowerCase())
    )
  )
  score -= alreadyCompleted.length * 3

  // Content quality factors
  score += (content.rating - 4) * 5 // Bonus for high ratings
  score += Math.min(content.views / 10000, 10) // Popularity bonus (capped at 10)
  
  // Recency bonus
  const daysSinceUpdate = Math.floor(
    (Date.now() - new Date(content.lastUpdated).getTime()) / (1000 * 60 * 60 * 24)
  )
  if (daysSinceUpdate < 30) score += 5
  else if (daysSinceUpdate < 90) score += 2
  else if (daysSinceUpdate > 365) score -= 5

  return Math.max(0, Math.min(100, score)) // Clamp between 0-100
}

// Generate AI reasons for recommendation
function generateRecommendationReasons(content: ContentItem, userProfile: UserProfile): string[] {
  const reasons = [...content.reasons]

  // Add personalized reasons
  const matchingInterests = content.topics.filter(topic => 
    userProfile.interests.includes(topic)
  )
  if (matchingInterests.length > 0) {
    reasons.push(`Matches your interest in ${matchingInterests.join(', ')}`)
  }

  const addressesWeakAreas = content.topics.filter(topic =>
    userProfile.weakAreas.includes(topic)
  )
  if (addressesWeakAreas.length > 0) {
    reasons.push(`Helps strengthen your ${addressesWeakAreas.join(', ')} skills`)
  }

  if (content.difficulty === userProfile.skillLevel) {
    reasons.push('Perfect match for your current skill level')
  } else if (
    (userProfile.skillLevel === 'beginner' && content.difficulty === 'intermediate') ||
    (userProfile.skillLevel === 'intermediate' && content.difficulty === 'advanced')
  ) {
    reasons.push('Great next step to advance your skills')
  }

  if (content.rating >= 4.7) {
    reasons.push('Highly rated by the community')
  }

  if (content.views > 100000) {
    reasons.push('Popular choice among learners')
  }

  return reasons.slice(0, 4) // Limit to 4 reasons
}

// Main API endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      userProfile, 
      contentType, 
      difficulty, 
      topics, 
      limit = 10,
      sortBy = 'personalized' 
    } = body

    // Default user profile for demo
    const defaultProfile: UserProfile = {
      skillLevel: 'intermediate',
      interests: ['JavaScript', 'React', 'Web Development'],
      learningStyle: 'visual',
      completedTopics: ['HTML', 'CSS', 'JavaScript Basics'],
      weakAreas: ['Async Programming', 'Testing'],
      goals: ['Master React', 'Build Full-Stack Apps', 'Get a Developer Job']
    }

    const profile = userProfile || defaultProfile

    // Filter content based on criteria
    let filteredContent = contentDatabase

    if (contentType) {
      filteredContent = filteredContent.filter(item => item.type === contentType)
    }

    if (difficulty) {
      filteredContent = filteredContent.filter(item => item.difficulty === difficulty)
    }

    if (topics && topics.length > 0) {
      filteredContent = filteredContent.filter(item =>
        topics.some((topic: string) => 
          item.topics.some(itemTopic => 
            itemTopic.toLowerCase().includes(topic.toLowerCase())
          )
        )
      )
    }

    // Calculate personalized scores and add reasons
    const personalizedContent = filteredContent.map(item => ({
      ...item,
      personalizedScore: calculatePersonalizedScore(item, profile),
      reasons: generateRecommendationReasons(item, profile)
    }))

    // Sort content
    let sortedContent = personalizedContent
    switch (sortBy) {
      case 'personalized':
        sortedContent = personalizedContent.sort((a, b) => b.personalizedScore! - a.personalizedScore!)
        break
      case 'rating':
        sortedContent = personalizedContent.sort((a, b) => b.rating - a.rating)
        break
      case 'popularity':
        sortedContent = personalizedContent.sort((a, b) => b.views - a.views)
        break
      case 'recent':
        sortedContent = personalizedContent.sort((a, b) => 
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        )
        break
      default:
        sortedContent = personalizedContent.sort((a, b) => b.aiScore - a.aiScore)
    }

    // Limit results
    const limitedContent = sortedContent.slice(0, limit)

    // Generate AI insights about the curation
    const insights = {
      totalContent: contentDatabase.length,
      filteredCount: filteredContent.length,
      personalizedCount: limitedContent.length,
      averagePersonalizedScore: Math.round(
        limitedContent.reduce((sum, item) => sum + (item.personalizedScore || 0), 0) / limitedContent.length
      ),
      topRecommendationReason: limitedContent[0]?.reasons[0] || 'No content found',
      skillLevelDistribution: {
        beginner: limitedContent.filter(item => item.difficulty === 'beginner').length,
        intermediate: limitedContent.filter(item => item.difficulty === 'intermediate').length,
        advanced: limitedContent.filter(item => item.difficulty === 'advanced').length
      },
      contentTypeDistribution: {
        tutorial: limitedContent.filter(item => item.type === 'tutorial').length,
        course: limitedContent.filter(item => item.type === 'course').length,
        article: limitedContent.filter(item => item.type === 'article').length,
        video: limitedContent.filter(item => item.type === 'video').length
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        content: limitedContent,
        insights,
        userProfile: profile,
        filters: { contentType, difficulty, topics, sortBy, limit }
      },
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Error in AI content curation:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to curate content',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// GET endpoint for content categories and filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'categories') {
      // Return available categories and filters
      const categories = {
        contentTypes: ['tutorial', 'course', 'article', 'video', 'tool', 'repository'],
        difficulties: ['beginner', 'intermediate', 'advanced'],
        topics: [...new Set(contentDatabase.flatMap(item => item.topics))].sort(),
        sortOptions: ['personalized', 'rating', 'popularity', 'recent', 'aiScore']
      }

      return NextResponse.json({
        success: true,
        data: categories
      })
    }

    // Return sample curated content
    const sampleContent = contentDatabase.slice(0, 6).map(item => ({
      ...item,
      personalizedScore: Math.floor(Math.random() * 20) + 80, // Random score 80-100
      reasons: item.reasons.slice(0, 2)
    }))

    return NextResponse.json({
      success: true,
      data: {
        content: sampleContent,
        message: 'Sample AI-curated content',
        totalAvailable: contentDatabase.length
      }
    })

  } catch (error: any) {
    console.error('Error fetching content categories:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch categories',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
