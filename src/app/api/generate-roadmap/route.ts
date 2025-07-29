import { NextRequest, NextResponse } from 'next/server'

interface UserProfile {
  name: string
  experience: 'complete-beginner' | 'some-coding' | 'career-change'
  interests: string[]
  goals: string[]
  timeCommitment: string
  preferredLearning: string[]
  background: string
}

interface RoadmapStep {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  type: 'theory' | 'practice' | 'project' | 'assessment'
  resources: {
    type: 'video' | 'article' | 'course' | 'practice' | 'project'
    title: string
    url: string
    duration: string
  }[]
  skills: string[]
  prerequisites: string[]
  isCompleted: boolean
}

interface LearningRoadmap {
  title: string
  description: string
  totalDuration: string
  difficulty: string
  steps: RoadmapStep[]
  milestones: {
    week: number
    title: string
    description: string
    skills: string[]
  }[]
}

// AI-powered roadmap generation
async function generatePersonalizedRoadmap(userProfile: UserProfile): Promise<LearningRoadmap> {
  const primaryInterest = userProfile.interests[0] || 'Programming'
  const isFullTime = userProfile.timeCommitment.includes('Full-time') || userProfile.timeCommitment.includes('8+')
  const totalDuration = isFullTime ? '3-4 months' : '6-8 months'
  
  // Generate roadmap based on user's primary interest
  let roadmapSteps: RoadmapStep[] = []
  
  if (primaryInterest === 'Web Development') {
    roadmapSteps = [
      {
        id: '1',
        title: 'Web Development Fundamentals',
        description: 'Learn the basics of how the web works and essential concepts',
        duration: '1-2 weeks',
        difficulty: 'beginner',
        type: 'theory',
        resources: [
          { type: 'video', title: 'How the Web Works', url: 'https://www.youtube.com/watch?v=hJHvdBlSxug', duration: '2 hours' },
          { type: 'article', title: 'Web Development Roadmap', url: 'https://roadmap.sh/frontend', duration: '1 hour' },
          { type: 'course', title: 'HTML & CSS Basics', url: 'https://www.freecodecamp.org/learn', duration: '10 hours' }
        ],
        skills: ['HTML', 'CSS', 'Web Concepts', 'Browser DevTools'],
        prerequisites: [],
        isCompleted: false
      },
      {
        id: '2',
        title: 'HTML & CSS Mastery',
        description: 'Build solid foundation in HTML structure and CSS styling',
        duration: '2-3 weeks',
        difficulty: 'beginner',
        type: 'practice',
        resources: [
          { type: 'course', title: 'Responsive Web Design', url: 'https://www.freecodecamp.org/learn/responsive-web-design/', duration: '20 hours' },
          { type: 'practice', title: 'CSS Grid & Flexbox', url: 'https://flexboxfroggy.com/', duration: '5 hours' },
          { type: 'project', title: 'Personal Portfolio Website', url: '#', duration: '10 hours' }
        ],
        skills: ['Semantic HTML', 'CSS Grid', 'Flexbox', 'Responsive Design'],
        prerequisites: ['Web Development Fundamentals'],
        isCompleted: false
      },
      {
        id: '3',
        title: 'JavaScript Fundamentals',
        description: 'Learn programming logic and JavaScript basics',
        duration: '3-4 weeks',
        difficulty: 'beginner',
        type: 'practice',
        resources: [
          { type: 'course', title: 'JavaScript Algorithms and Data Structures', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', duration: '30 hours' },
          { type: 'practice', title: 'JavaScript30 Challenge', url: 'https://javascript30.com/', duration: '15 hours' },
          { type: 'video', title: 'JavaScript Crash Course', url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c', duration: '3 hours' }
        ],
        skills: ['Variables', 'Functions', 'DOM Manipulation', 'Event Handling', 'ES6+'],
        prerequisites: ['HTML & CSS Mastery'],
        isCompleted: false
      },
      {
        id: '4',
        title: 'Interactive Web Projects',
        description: 'Build dynamic websites with JavaScript',
        duration: '3-4 weeks',
        difficulty: 'intermediate',
        type: 'project',
        resources: [
          { type: 'project', title: 'Todo List App', url: '#', duration: '8 hours' },
          { type: 'project', title: 'Weather App with API', url: '#', duration: '12 hours' },
          { type: 'project', title: 'Calculator App', url: '#', duration: '6 hours' }
        ],
        skills: ['API Integration', 'Local Storage', 'Form Validation', 'Project Structure'],
        prerequisites: ['JavaScript Fundamentals'],
        isCompleted: false
      },
      {
        id: '5',
        title: 'Modern Frontend Framework',
        description: userProfile.interests.includes('React') ? 'Learn React.js' : 'Choose and learn a modern framework (React/Vue/Angular)',
        duration: '4-6 weeks',
        difficulty: 'intermediate',
        type: 'practice',
        resources: [
          { type: 'course', title: 'React - The Complete Guide', url: 'https://reactjs.org/tutorial/tutorial.html', duration: '40 hours' },
          { type: 'practice', title: 'React Hooks Practice', url: '#', duration: '10 hours' },
          { type: 'project', title: 'React Portfolio Project', url: '#', duration: '20 hours' }
        ],
        skills: ['React Components', 'State Management', 'Props', 'Hooks', 'JSX'],
        prerequisites: ['Interactive Web Projects'],
        isCompleted: false
      },
      {
        id: '6',
        title: 'Backend Basics',
        description: 'Learn server-side development with Node.js',
        duration: '4-5 weeks',
        difficulty: 'intermediate',
        type: 'practice',
        resources: [
          { type: 'course', title: 'Node.js & Express.js Course', url: '#', duration: '25 hours' },
          { type: 'practice', title: 'REST API Development', url: '#', duration: '15 hours' },
          { type: 'project', title: 'Full-Stack CRUD App', url: '#', duration: '20 hours' }
        ],
        skills: ['Node.js', 'Express.js', 'REST APIs', 'Database Integration', 'Authentication'],
        prerequisites: ['Modern Frontend Framework'],
        isCompleted: false
      }
    ]
  } else if (primaryInterest === 'Data Science') {
    roadmapSteps = [
      {
        id: '1',
        title: 'Python Programming Basics',
        description: 'Learn Python fundamentals for data science',
        duration: '2-3 weeks',
        difficulty: 'beginner',
        type: 'practice',
        resources: [
          { type: 'course', title: 'Python for Everybody', url: 'https://www.coursera.org/specializations/python', duration: '20 hours' },
          { type: 'practice', title: 'Python Exercises', url: 'https://www.hackerrank.com/domains/python', duration: '10 hours' }
        ],
        skills: ['Python Syntax', 'Data Types', 'Control Structures', 'Functions'],
        prerequisites: [],
        isCompleted: false
      },
      {
        id: '2',
        title: 'Data Analysis Libraries',
        description: 'Master pandas, numpy, and matplotlib',
        duration: '3-4 weeks',
        difficulty: 'intermediate',
        type: 'practice',
        resources: [
          { type: 'course', title: 'Data Analysis with Python', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/', duration: '30 hours' },
          { type: 'practice', title: 'Pandas Exercises', url: '#', duration: '15 hours' }
        ],
        skills: ['Pandas', 'NumPy', 'Matplotlib', 'Data Cleaning', 'Data Visualization'],
        prerequisites: ['Python Programming Basics'],
        isCompleted: false
      },
      {
        id: '3',
        title: 'Statistics & Mathematics',
        description: 'Essential statistics for data science',
        duration: '3-4 weeks',
        difficulty: 'intermediate',
        type: 'theory',
        resources: [
          { type: 'course', title: 'Statistics for Data Science', url: '#', duration: '25 hours' },
          { type: 'practice', title: 'Statistical Analysis Projects', url: '#', duration: '10 hours' }
        ],
        skills: ['Descriptive Statistics', 'Probability', 'Hypothesis Testing', 'Correlation'],
        prerequisites: ['Data Analysis Libraries'],
        isCompleted: false
      }
    ]
  } else if (primaryInterest === 'Mobile Apps') {
    roadmapSteps = [
      {
        id: '1',
        title: 'Mobile Development Fundamentals',
        description: 'Understand mobile app development concepts',
        duration: '1-2 weeks',
        difficulty: 'beginner',
        type: 'theory',
        resources: [
          { type: 'video', title: 'Mobile App Development Overview', url: '#', duration: '3 hours' },
          { type: 'article', title: 'Native vs Cross-platform', url: '#', duration: '1 hour' }
        ],
        skills: ['Mobile Concepts', 'Platform Differences', 'Development Options'],
        prerequisites: [],
        isCompleted: false
      },
      {
        id: '2',
        title: 'React Native Basics',
        description: 'Learn cross-platform mobile development',
        duration: '4-5 weeks',
        difficulty: 'intermediate',
        type: 'practice',
        resources: [
          { type: 'course', title: 'React Native - The Practical Guide', url: '#', duration: '35 hours' },
          { type: 'project', title: 'First Mobile App', url: '#', duration: '15 hours' }
        ],
        skills: ['React Native', 'Mobile UI', 'Navigation', 'Device APIs'],
        prerequisites: ['Mobile Development Fundamentals'],
        isCompleted: false
      }
    ]
  } else {
    // Default programming roadmap
    roadmapSteps = [
      {
        id: '1',
        title: 'Programming Fundamentals',
        description: 'Learn basic programming concepts and logic',
        duration: '2-3 weeks',
        difficulty: 'beginner',
        type: 'theory',
        resources: [
          { type: 'video', title: 'Programming Basics Course', url: '#', duration: '10 hours' },
          { type: 'practice', title: 'Logic Building Exercises', url: '#', duration: '8 hours' }
        ],
        skills: ['Variables', 'Functions', 'Loops', 'Conditionals', 'Problem Solving'],
        prerequisites: [],
        isCompleted: false
      },
      {
        id: '2',
        title: 'Choose Your Language',
        description: 'Learn your first programming language thoroughly',
        duration: '4-5 weeks',
        difficulty: 'beginner',
        type: 'practice',
        resources: [
          { type: 'course', title: 'Python/JavaScript Fundamentals', url: '#', duration: '25 hours' },
          { type: 'practice', title: 'Coding Challenges', url: '#', duration: '15 hours' }
        ],
        skills: ['Language Syntax', 'Data Structures', 'Object-Oriented Programming'],
        prerequisites: ['Programming Fundamentals'],
        isCompleted: false
      }
    ]
  }

  // Generate milestones based on steps
  const milestones = [
    {
      week: 4,
      title: 'Foundation Complete',
      description: 'You\'ve mastered the basics and ready for intermediate concepts',
      skills: roadmapSteps.slice(0, 2).flatMap(step => step.skills.slice(0, 2))
    },
    {
      week: 8,
      title: 'Practical Skills',
      description: 'You can build basic projects and solve real problems',
      skills: roadmapSteps.slice(2, 4).flatMap(step => step.skills.slice(0, 2))
    },
    {
      week: 12,
      title: 'Advanced Concepts',
      description: 'You\'re ready for complex projects and advanced topics',
      skills: roadmapSteps.slice(4).flatMap(step => step.skills.slice(0, 2))
    }
  ]

  return {
    title: `${primaryInterest} Learning Path for ${userProfile.name}`,
    description: `Personalized ${primaryInterest.toLowerCase()} roadmap designed for ${userProfile.experience} level, focusing on ${userProfile.goals.slice(0, 2).join(' and ')}`,
    totalDuration,
    difficulty: userProfile.experience === 'complete-beginner' ? 'Beginner-Friendly' : 'Progressive',
    steps: roadmapSteps,
    milestones: milestones.slice(0, Math.ceil(roadmapSteps.length / 2))
  }
}

export async function POST(request: NextRequest) {
  try {
    const userProfile: UserProfile = await request.json()

    if (!userProfile.name || !userProfile.interests.length || !userProfile.goals.length) {
      return NextResponse.json(
        { error: 'Missing required profile information' },
        { status: 400 }
      )
    }

    console.log('Generating personalized roadmap for:', userProfile.name)

    const roadmap = await generatePersonalizedRoadmap(userProfile)

    return NextResponse.json({
      success: true,
      roadmap,
      generated_at: new Date().toISOString(),
      user_profile: {
        name: userProfile.name,
        experience: userProfile.experience,
        primary_interest: userProfile.interests[0],
        time_commitment: userProfile.timeCommitment
      }
    })

  } catch (error: any) {
    console.error('Error generating roadmap:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate roadmap',
        message: error.message || 'Internal server error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Roadmap Generator API',
    description: 'POST your user profile to generate a personalized learning roadmap',
    required_fields: [
      'name',
      'experience',
      'interests',
      'goals',
      'timeCommitment',
      'preferredLearning'
    ],
    supported_interests: [
      'Web Development',
      'Mobile Apps', 
      'Data Science',
      'AI/Machine Learning',
      'Game Development',
      'Desktop Applications',
      'DevOps',
      'Cybersecurity'
    ]
  })
}
