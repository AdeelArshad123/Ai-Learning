import { NextRequest, NextResponse } from 'next/server'

interface UserSkills {
  technical: string[]
  experience: 'entry' | 'junior' | 'mid' | 'senior'
  interests: string[]
  currentRole?: string
  goals: string[]
  timeframe: '3months' | '6months' | '1year' | '2years'
}

interface CareerPath {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'moderate' | 'challenging'
  timeToAchieve: string
  averageSalary: string
  growthRate: string
  requiredSkills: string[]
  recommendedSteps: Step[]
  pros: string[]
  cons: string[]
  marketDemand: 'low' | 'medium' | 'high' | 'very-high'
}

interface Step {
  id: string
  title: string
  description: string
  duration: string
  resources: string[]
  priority: 'high' | 'medium' | 'low'
}

// AI-powered career path generator
async function generateCareerPaths(userSkills: UserSkills): Promise<CareerPath[]> {
  const careerPaths: CareerPath[] = []

  // Frontend Development Path
  if (userSkills.technical.some(skill => ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular'].includes(skill)) ||
      userSkills.interests.includes('frontend')) {
    careerPaths.push({
      id: 'frontend-dev',
      title: 'Frontend Developer',
      description: 'Create engaging user interfaces and experiences for web applications',
      difficulty: userSkills.experience === 'entry' ? 'easy' : 'moderate',
      timeToAchieve: userSkills.experience === 'entry' ? '6-12 months' : '3-6 months',
      averageSalary: '$65,000 - $120,000',
      growthRate: '+13% (faster than average)',
      requiredSkills: ['HTML/CSS', 'JavaScript', 'React/Vue/Angular', 'Responsive Design', 'Git'],
      recommendedSteps: [
        {
          id: 'step1',
          title: 'Master Modern JavaScript',
          description: 'Learn ES6+, async/await, modules, and modern JavaScript patterns',
          duration: '4-6 weeks',
          resources: ['JavaScript.info', 'MDN Web Docs', 'FreeCodeCamp'],
          priority: 'high'
        },
        {
          id: 'step2',
          title: 'Learn a Frontend Framework',
          description: 'Choose React, Vue, or Angular and build projects',
          duration: '6-8 weeks',
          resources: ['Official Documentation', 'Udemy Courses', 'YouTube Tutorials'],
          priority: 'high'
        },
        {
          id: 'step3',
          title: 'Build Portfolio Projects',
          description: 'Create 3-5 impressive projects showcasing your skills',
          duration: '8-10 weeks',
          resources: ['GitHub', 'Netlify', 'Vercel'],
          priority: 'high'
        }
      ],
      pros: ['High demand', 'Creative work', 'Remote opportunities', 'Good entry point'],
      cons: ['Rapidly changing technologies', 'Browser compatibility issues'],
      marketDemand: 'very-high'
    })
  }

  // Full-Stack Development Path
  if (userSkills.technical.some(skill => ['JavaScript', 'Node.js', 'Python', 'Java'].includes(skill)) ||
      userSkills.interests.includes('fullstack')) {
    careerPaths.push({
      id: 'fullstack-dev',
      title: 'Full-Stack Developer',
      description: 'Work on both frontend and backend systems, handling complete web applications',
      difficulty: 'moderate',
      timeToAchieve: userSkills.experience === 'entry' ? '12-18 months' : '6-12 months',
      averageSalary: '$75,000 - $140,000',
      growthRate: '+22% (much faster than average)',
      requiredSkills: ['Frontend Framework', 'Backend Language', 'Database', 'API Design', 'DevOps Basics'],
      recommendedSteps: [
        {
          id: 'step1',
          title: 'Master Frontend Development',
          description: 'Become proficient in React/Vue/Angular and modern CSS',
          duration: '8-10 weeks',
          resources: ['Frontend Masters', 'React Documentation', 'CSS Grid/Flexbox'],
          priority: 'high'
        },
        {
          id: 'step2',
          title: 'Learn Backend Development',
          description: 'Master Node.js/Python/Java and database management',
          duration: '10-12 weeks',
          resources: ['Node.js Documentation', 'Express.js', 'MongoDB/PostgreSQL'],
          priority: 'high'
        },
        {
          id: 'step3',
          title: 'Build Full-Stack Projects',
          description: 'Create complete applications with authentication, databases, and deployment',
          duration: '12-16 weeks',
          resources: ['AWS', 'Docker', 'CI/CD Pipelines'],
          priority: 'high'
        }
      ],
      pros: ['Versatile skill set', 'High salary potential', 'Startup opportunities', 'Complete ownership'],
      cons: ['Need to stay updated on multiple technologies', 'Can be overwhelming initially'],
      marketDemand: 'very-high'
    })
  }

  // Data Science Path
  if (userSkills.technical.some(skill => ['Python', 'R', 'SQL', 'Statistics'].includes(skill)) ||
      userSkills.interests.includes('data')) {
    careerPaths.push({
      id: 'data-scientist',
      title: 'Data Scientist',
      description: 'Extract insights from data using statistical analysis and machine learning',
      difficulty: 'challenging',
      timeToAchieve: '12-24 months',
      averageSalary: '$95,000 - $165,000',
      growthRate: '+31% (much faster than average)',
      requiredSkills: ['Python/R', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
      recommendedSteps: [
        {
          id: 'step1',
          title: 'Master Python for Data Science',
          description: 'Learn pandas, numpy, matplotlib, and scikit-learn',
          duration: '8-10 weeks',
          resources: ['Kaggle Learn', 'DataCamp', 'Coursera'],
          priority: 'high'
        },
        {
          id: 'step2',
          title: 'Learn Statistics and ML',
          description: 'Understand statistical concepts and machine learning algorithms',
          duration: '12-16 weeks',
          resources: ['Khan Academy', 'Andrew Ng Course', 'StatQuest'],
          priority: 'high'
        },
        {
          id: 'step3',
          title: 'Build Data Projects',
          description: 'Complete end-to-end data science projects and competitions',
          duration: '16-20 weeks',
          resources: ['Kaggle', 'GitHub', 'Jupyter Notebooks'],
          priority: 'high'
        }
      ],
      pros: ['High salary', 'Intellectually stimulating', 'Growing field', 'Remote work'],
      cons: ['Requires strong math background', 'Competitive field', 'Long learning curve'],
      marketDemand: 'very-high'
    })
  }

  // DevOps Engineer Path
  if (userSkills.technical.some(skill => ['Linux', 'Docker', 'AWS', 'Kubernetes'].includes(skill)) ||
      userSkills.interests.includes('devops')) {
    careerPaths.push({
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      description: 'Bridge development and operations, focusing on automation and infrastructure',
      difficulty: 'moderate',
      timeToAchieve: '8-15 months',
      averageSalary: '$85,000 - $150,000',
      growthRate: '+21% (much faster than average)',
      requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms', 'Infrastructure as Code'],
      recommendedSteps: [
        {
          id: 'step1',
          title: 'Master Linux and Scripting',
          description: 'Become proficient in Linux administration and bash scripting',
          duration: '6-8 weeks',
          resources: ['Linux Academy', 'OverTheWire', 'Bash Scripting Guide'],
          priority: 'high'
        },
        {
          id: 'step2',
          title: 'Learn Containerization',
          description: 'Master Docker and Kubernetes for container orchestration',
          duration: '8-10 weeks',
          resources: ['Docker Documentation', 'Kubernetes.io', 'Play with Docker'],
          priority: 'high'
        },
        {
          id: 'step3',
          title: 'Cloud and Infrastructure',
          description: 'Learn AWS/Azure/GCP and Infrastructure as Code tools',
          duration: '10-12 weeks',
          resources: ['AWS Free Tier', 'Terraform', 'Ansible'],
          priority: 'high'
        }
      ],
      pros: ['High demand', 'Good salary', 'Automation focus', 'Critical role'],
      cons: ['On-call responsibilities', 'Complex troubleshooting', 'Continuous learning required'],
      marketDemand: 'very-high'
    })
  }

  // Mobile Development Path
  if (userSkills.technical.some(skill => ['Swift', 'Kotlin', 'React Native', 'Flutter'].includes(skill)) ||
      userSkills.interests.includes('mobile')) {
    careerPaths.push({
      id: 'mobile-dev',
      title: 'Mobile Developer',
      description: 'Create mobile applications for iOS and Android platforms',
      difficulty: 'moderate',
      timeToAchieve: '8-12 months',
      averageSalary: '$70,000 - $130,000',
      growthRate: '+19% (much faster than average)',
      requiredSkills: ['Swift/Kotlin', 'React Native/Flutter', 'Mobile UI/UX', 'App Store Guidelines'],
      recommendedSteps: [
        {
          id: 'step1',
          title: 'Choose Your Platform',
          description: 'Decide between native (iOS/Android) or cross-platform development',
          duration: '2-3 weeks',
          resources: ['Platform Documentation', 'Developer Surveys', 'Market Research'],
          priority: 'high'
        },
        {
          id: 'step2',
          title: 'Master Mobile Development',
          description: 'Learn your chosen platform and build several apps',
          duration: '12-16 weeks',
          resources: ['Official Tutorials', 'Udacity', 'Ray Wenderlich'],
          priority: 'high'
        },
        {
          id: 'step3',
          title: 'Publish and Iterate',
          description: 'Launch apps on app stores and gather user feedback',
          duration: '8-10 weeks',
          resources: ['App Store Connect', 'Google Play Console', 'Analytics Tools'],
          priority: 'high'
        }
      ],
      pros: ['Growing mobile market', 'Creative opportunities', 'App store revenue potential'],
      cons: ['Platform-specific knowledge', 'App store approval process', 'Device fragmentation'],
      marketDemand: 'high'
    })
  }

  // Sort by relevance to user's current skills and interests
  return careerPaths.sort((a, b) => {
    const aRelevance = calculateRelevance(a, userSkills)
    const bRelevance = calculateRelevance(b, userSkills)
    return bRelevance - aRelevance
  }).slice(0, 4) // Return top 4 most relevant paths
}

function calculateRelevance(path: CareerPath, userSkills: UserSkills): number {
  let score = 0
  
  // Check technical skill overlap
  const skillOverlap = path.requiredSkills.filter(skill => 
    userSkills.technical.some(userSkill => 
      skill.toLowerCase().includes(userSkill.toLowerCase()) ||
      userSkill.toLowerCase().includes(skill.toLowerCase())
    )
  ).length
  score += skillOverlap * 10
  
  // Check interest alignment
  const interestMatch = userSkills.interests.some(interest =>
    path.title.toLowerCase().includes(interest.toLowerCase()) ||
    path.description.toLowerCase().includes(interest.toLowerCase())
  )
  if (interestMatch) score += 20
  
  // Adjust for experience level
  if (userSkills.experience === 'entry' && path.difficulty === 'easy') score += 15
  if (userSkills.experience === 'junior' && path.difficulty === 'moderate') score += 15
  if (userSkills.experience === 'mid' && path.difficulty === 'challenging') score += 15
  
  return score
}

export async function POST(request: NextRequest) {
  try {
    const userSkills: UserSkills = await request.json()

    if (!userSkills.technical || !userSkills.experience) {
      return NextResponse.json(
        { error: 'Technical skills and experience level are required' },
        { status: 400 }
      )
    }

    console.log('Generating career paths for user skills:', userSkills)

    const careerPaths = await generateCareerPaths(userSkills)

    return NextResponse.json({
      careerPaths,
      generated_at: new Date().toISOString(),
      user_experience: userSkills.experience,
      total_paths: careerPaths.length
    })

  } catch (error: any) {
    console.error('Error generating career paths:', error)
    
    // Fallback career paths
    const fallbackPaths: CareerPath[] = [
      {
        id: 'fallback-frontend',
        title: 'Frontend Developer',
        description: 'Create user interfaces for web applications',
        difficulty: 'easy',
        timeToAchieve: '6-12 months',
        averageSalary: '$65,000 - $120,000',
        growthRate: '+13%',
        requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
        recommendedSteps: [],
        pros: ['High demand', 'Creative work'],
        cons: ['Rapidly changing tech'],
        marketDemand: 'very-high'
      }
    ]

    return NextResponse.json({
      careerPaths: fallbackPaths,
      generated_at: new Date().toISOString(),
      fallback: true,
      error: 'Using fallback career paths'
    })
  }
}

export async function GET() {
  // Return sample career guidance for testing
  const sampleSkills: UserSkills = {
    technical: ['JavaScript', 'React', 'Node.js'],
    experience: 'junior',
    interests: ['frontend', 'fullstack'],
    goals: ['Senior Developer', 'Tech Lead'],
    timeframe: '1year'
  }

  const careerPaths = await generateCareerPaths(sampleSkills)
  
  return NextResponse.json({
    careerPaths,
    sample: true,
    generated_at: new Date().toISOString()
  })
}
