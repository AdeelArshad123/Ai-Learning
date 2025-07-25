import { NextRequest, NextResponse } from 'next/server'

interface UserProfile {
  level: 'beginner' | 'intermediate' | 'advanced'
  interests: string[]
  recentTopics: string[]
  weakAreas: string[]
  strongAreas: string[]
  goals: string[]
  timeSpent: number
  quizScores: { topic: string; score: number; date: string }[]
}

interface Recommendation {
  id: string
  type: 'quiz' | 'tutorial' | 'project' | 'video' | 'article'
  title: string
  description: string
  difficulty: string
  estimatedTime: string
  priority: 'high' | 'medium' | 'low'
  reason: string
  url?: string
  tags: string[]
  isNew?: boolean
  isTrending?: boolean
  completionRate?: number
}

// AI-powered recommendation engine
async function generateRecommendations(userProfile: UserProfile): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = []

  // Analyze user's weak areas and suggest improvement
  if (userProfile.weakAreas && userProfile.weakAreas.length > 0) {
    userProfile.weakAreas.forEach((area, index) => {
      recommendations.push({
        id: `weak-${index}`,
        type: 'quiz',
        title: `Master ${area} Fundamentals`,
        description: `Focused practice on ${area} to strengthen your understanding`,
        difficulty: userProfile.level,
        estimatedTime: '15 min',
        priority: 'high',
        reason: `You scored below average in ${area}. Let's improve this!`,
        tags: [area, 'improvement', 'practice']
      })
    })
  }

  // Suggest next level content based on strong areas
  if (userProfile.strongAreas && userProfile.strongAreas.length > 0) {
    userProfile.strongAreas.forEach((area, index) => {
      const nextLevel = userProfile.level === 'beginner' ? 'intermediate' : 'advanced'
      recommendations.push({
        id: `strong-${index}`,
        type: 'tutorial',
        title: `Advanced ${area} Techniques`,
        description: `Take your ${area} skills to the next level`,
        difficulty: nextLevel,
        estimatedTime: '30 min',
        priority: 'medium',
        reason: `You're doing great with ${area}! Ready for more advanced concepts?`,
        tags: [area, 'advanced', 'growth']
      })
    })
  }

  // Trending topics based on user interests
  if (userProfile.interests && userProfile.interests.length > 0) {
    const trendingTopics = ['AI/ML', 'Web3', 'Cloud Computing', 'DevOps', 'Mobile Development']
    const relevantTrending = trendingTopics.filter(topic => 
      userProfile.interests.some(interest => 
        topic.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(topic.toLowerCase())
      )
    )

    relevantTrending.forEach((topic, index) => {
      recommendations.push({
        id: `trending-${index}`,
        type: 'article',
        title: `Latest Trends in ${topic}`,
        description: `Stay updated with the newest developments in ${topic}`,
        difficulty: userProfile.level,
        estimatedTime: '10 min',
        priority: 'medium',
        reason: `Based on your interest in ${userProfile.interests.join(', ')}`,
        tags: [topic, 'trending', 'industry']
      })
    })
  }

  // Project suggestions based on skill level
  const projectSuggestions = {
    beginner: [
      { title: 'Build a Todo App', description: 'Practice CRUD operations and state management', time: '2 hours' },
      { title: 'Create a Calculator', description: 'Learn event handling and basic logic', time: '1 hour' },
      { title: 'Weather App', description: 'Work with APIs and async programming', time: '3 hours' }
    ],
    intermediate: [
      { title: 'E-commerce Dashboard', description: 'Complex state management and routing', time: '8 hours' },
      { title: 'Chat Application', description: 'Real-time features with WebSockets', time: '6 hours' },
      { title: 'Task Management System', description: 'Full-stack development with database', time: '12 hours' }
    ],
    advanced: [
      { title: 'Microservices Architecture', description: 'Design scalable distributed systems', time: '20 hours' },
      { title: 'AI-Powered App', description: 'Integrate machine learning models', time: '15 hours' },
      { title: 'DevOps Pipeline', description: 'CI/CD, containerization, and deployment', time: '10 hours' }
    ]
  }

  const levelProjects = projectSuggestions[userProfile.level] || projectSuggestions.beginner
  levelProjects.forEach((project, index) => {
    recommendations.push({
      id: `project-${index}`,
      type: 'project',
      title: project.title,
      description: project.description,
      difficulty: userProfile.level,
      estimatedTime: project.time,
      priority: 'medium',
      reason: `Perfect project for your ${userProfile.level} level`,
      tags: ['project', 'hands-on', userProfile.level]
    })
  })

  // Learning path suggestions based on goals
  if (userProfile.goals && userProfile.goals.length > 0) {
    userProfile.goals.forEach((goal, index) => {
      recommendations.push({
        id: `goal-${index}`,
        type: 'tutorial',
        title: `Path to ${goal}`,
        description: `Structured learning path to achieve your goal of ${goal}`,
        difficulty: userProfile.level,
        estimatedTime: '45 min',
        priority: 'high',
        reason: `Aligned with your goal: ${goal}`,
        tags: [goal, 'learning-path', 'goal-oriented']
      })
    })
  }

  // Sort by priority and return top recommendations
  const priorityOrder = { high: 3, medium: 2, low: 1 }
  return recommendations
    .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
    .slice(0, 8) // Return top 8 recommendations
}

export async function POST(request: NextRequest) {
  try {
    const userProfile: UserProfile = await request.json()

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile is required' },
        { status: 400 }
      )
    }

    console.log('Generating personalized recommendations for user profile:', userProfile)

    const recommendations = await generateRecommendations(userProfile)

    return NextResponse.json({
      recommendations,
      generated_at: new Date().toISOString(),
      user_level: userProfile.level,
      total_recommendations: recommendations.length
    })

  } catch (error: any) {
    console.error('Error generating recommendations:', error)
    
    // Fallback recommendations
    const fallbackRecommendations: Recommendation[] = [
      {
        id: 'fallback-1',
        type: 'quiz',
        title: 'JavaScript Fundamentals Quiz',
        description: 'Test your basic JavaScript knowledge',
        difficulty: 'beginner',
        estimatedTime: '10 min',
        priority: 'high',
        reason: 'Great starting point for any developer',
        tags: ['javascript', 'fundamentals']
      },
      {
        id: 'fallback-2',
        type: 'tutorial',
        title: 'React Getting Started',
        description: 'Learn the basics of React development',
        difficulty: 'beginner',
        estimatedTime: '30 min',
        priority: 'medium',
        reason: 'Popular framework for modern web development',
        tags: ['react', 'frontend']
      }
    ]

    return NextResponse.json({
      recommendations: fallbackRecommendations,
      generated_at: new Date().toISOString(),
      fallback: true,
      error: 'Using fallback recommendations'
    })
  }
}

export async function GET(request: NextRequest) {
  // Return enhanced sample recommendations for testing
  const fastRecommendations: Recommendation[] = [
    {
      id: 'quick-1',
      type: 'quiz',
      title: 'JavaScript Fundamentals Quiz',
      description: 'Test your basic JavaScript knowledge with interactive questions covering variables, functions, and control structures',
      difficulty: 'beginner',
      estimatedTime: '10 min',
      priority: 'high',
      reason: 'Perfect starting point for any developer - build a solid foundation',
      tags: ['javascript', 'fundamentals', 'variables', 'functions'],
      isNew: true,
      completionRate: 85
    },
    {
      id: 'quick-2',
      type: 'tutorial',
      title: 'React Hooks Deep Dive',
      description: 'Master useState, useEffect, useContext, and learn to create custom hooks for reusable logic',
      difficulty: 'intermediate',
      estimatedTime: '25 min',
      priority: 'high',
      reason: 'Based on your React interest - take your skills to the next level',
      tags: ['react', 'hooks', 'useState', 'useEffect'],
      isTrending: true,
      completionRate: 92
    },
    {
      id: 'quick-3',
      type: 'project',
      title: 'Build a Weather App',
      description: 'Create a responsive weather application using APIs, geolocation, and modern JavaScript features',
      difficulty: 'intermediate',
      estimatedTime: '2 hours',
      priority: 'medium',
      reason: 'Great for practicing API integration and async programming',
      tags: ['project', 'api', 'javascript', 'geolocation'],
      isNew: false,
      completionRate: 78
    },
    {
      id: 'quick-4',
      type: 'video',
      title: 'CSS Grid Layout Masterclass',
      description: 'Learn modern CSS Grid techniques for complex layouts, responsive design, and advanced positioning',
      difficulty: 'intermediate',
      estimatedTime: '45 min',
      priority: 'medium',
      reason: 'Essential for modern web layouts - highly requested by employers',
      tags: ['css', 'grid', 'layout', 'responsive'],
      isTrending: true,
      completionRate: 89
    },
    {
      id: 'quick-5',
      type: 'article',
      title: 'TypeScript Best Practices 2024',
      description: 'Learn advanced TypeScript patterns, utility types, and modern development techniques',
      difficulty: 'advanced',
      estimatedTime: '15 min',
      priority: 'medium',
      reason: 'Next step in your JavaScript journey - industry standard',
      tags: ['typescript', 'best-practices', 'patterns'],
      isNew: true,
      isTrending: true,
      completionRate: 94
    },
    {
      id: 'quick-6',
      type: 'tutorial',
      title: 'Node.js API Development',
      description: 'Build RESTful APIs with Express.js, MongoDB, authentication, and error handling',
      difficulty: 'intermediate',
      estimatedTime: '35 min',
      priority: 'medium',
      reason: 'Essential for backend development - complete the full-stack picture',
      tags: ['nodejs', 'api', 'backend', 'express'],
      completionRate: 87
    },
    {
      id: 'quick-7',
      type: 'quiz',
      title: 'React Performance Optimization',
      description: 'Test your knowledge of React performance patterns, memoization, and optimization techniques',
      difficulty: 'advanced',
      estimatedTime: '12 min',
      priority: 'high',
      reason: 'Critical for building scalable React applications',
      tags: ['react', 'performance', 'optimization', 'memoization'],
      isTrending: true,
      completionRate: 91
    },
    {
      id: 'quick-8',
      type: 'project',
      title: 'Full-Stack E-commerce App',
      description: 'Build a complete e-commerce application with React, Node.js, payment integration, and admin panel',
      difficulty: 'advanced',
      estimatedTime: '8 hours',
      priority: 'high',
      reason: 'Portfolio project that showcases full-stack skills to employers',
      tags: ['fullstack', 'ecommerce', 'react', 'nodejs', 'portfolio'],
      isNew: true,
      completionRate: 73
    }
  ]

  return NextResponse.json({
    recommendations: fastRecommendations,
    sample: true,
    generated_at: new Date().toISOString(),
    cached: true
  })
}
