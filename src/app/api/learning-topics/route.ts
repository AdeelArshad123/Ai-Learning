import { NextRequest, NextResponse } from 'next/server'

// Mock database - replace with your actual database
const learningTopics = [
  {
    id: 'javascript-basics',
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming',
    difficulty: 'Beginner',
    duration: '2-3 hours',
    topics: [
      'Variables and Data Types',
      'Functions and Scope',
      'Arrays and Objects',
      'Control Flow',
      'Error Handling'
    ],
    resources: [
      {
        type: 'video',
        title: 'JavaScript Crash Course',
        url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
        duration: '1:12:00'
      },
      {
        type: 'article',
        title: 'JavaScript Tutorial for Beginners',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
        duration: '30 min read'
      }
    ],
    quizCount: 5,
    completedCount: 0
  },
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Master React.js for building modern web applications',
    difficulty: 'Intermediate',
    duration: '4-5 hours',
    topics: [
      'Components and Props',
      'State and Lifecycle',
      'Hooks (useState, useEffect)',
      'Event Handling',
      'Conditional Rendering'
    ],
    resources: [
      {
        type: 'video',
        title: 'React Tutorial for Beginners',
        url: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
        duration: '2:25:00'
      },
      {
        type: 'article',
        title: 'React Documentation',
        url: 'https://react.dev/learn',
        duration: '45 min read'
      }
    ],
    quizCount: 8,
    completedCount: 0
  },
  {
    id: 'python-basics',
    title: 'Python Programming',
    description: 'Learn Python programming from scratch',
    difficulty: 'Beginner',
    duration: '3-4 hours',
    topics: [
      'Variables and Data Types',
      'Control Structures',
      'Functions and Modules',
      'File Handling',
      'Object-Oriented Programming'
    ],
    resources: [
      {
        type: 'video',
        title: 'Python for Beginners',
        url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
        duration: '6:14:00'
      },
      {
        type: 'article',
        title: 'Python Tutorial',
        url: 'https://docs.python.org/3/tutorial/',
        duration: '40 min read'
      }
    ],
    quizCount: 6,
    completedCount: 0
  },
  {
    id: 'ai-ml-basics',
    title: 'AI & Machine Learning',
    description: 'Introduction to artificial intelligence and machine learning',
    difficulty: 'Advanced',
    duration: '6-8 hours',
    topics: [
      'Machine Learning Basics',
      'Neural Networks',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision'
    ],
    resources: [
      {
        type: 'video',
        title: 'Machine Learning Course',
        url: 'https://www.youtube.com/watch?v=KNAWp2S3w94',
        duration: '3:53:00'
      },
      {
        type: 'article',
        title: 'AI Fundamentals',
        url: 'https://www.tensorflow.org/tutorials',
        duration: '60 min read'
      }
    ],
    quizCount: 10,
    completedCount: 0
  },
  {
    id: 'web-development',
    title: 'Full-Stack Web Development',
    description: 'Complete guide to modern web development',
    difficulty: 'Intermediate',
    duration: '8-10 hours',
    topics: [
      'HTML5 and CSS3',
      'JavaScript ES6+',
      'Node.js and Express',
      'Database Design',
      'Deployment and DevOps'
    ],
    resources: [
      {
        type: 'video',
        title: 'Web Development Course',
        url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc',
        duration: '6:31:00'
      },
      {
        type: 'article',
        title: 'Web Development Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Learn',
        duration: '90 min read'
      }
    ],
    quizCount: 12,
    completedCount: 0
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const difficulty = searchParams.get('difficulty')
    const search = searchParams.get('search')

    let filteredTopics = learningTopics

    // Filter by difficulty
    if (difficulty && difficulty !== 'all') {
      filteredTopics = filteredTopics.filter(topic => topic.difficulty === difficulty)
    }

    // Filter by search term
    if (search) {
      filteredTopics = filteredTopics.filter(topic =>
        topic.title.toLowerCase().includes(search.toLowerCase()) ||
        topic.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    return NextResponse.json(filteredTopics)
  } catch (error) {
    console.error('Error fetching learning topics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topicId, completed } = body

    // Find the topic and update completion status
    const topic = learningTopics.find(t => t.id === topicId)
    if (topic) {
      topic.completedCount = completed ? topic.completedCount + 1 : Math.max(0, topic.completedCount - 1)
    }

    return NextResponse.json({ success: true, topic })
  } catch (error) {
    console.error('Error updating topic completion:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 