import { NextRequest, NextResponse } from 'next/server'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatbotRequest {
  message: string
  userSkillLevel?: 'beginner' | 'intermediate' | 'advanced'
  preferredLanguage?: string
  currentTopic?: string
  userPreferences?: {
    voiceEnabled: boolean
    autoRead: boolean
    detailedExplanations: boolean
    includeCodeExamples: boolean
    adaptiveDifficulty: boolean
  }
  conversationHistory: Message[]
}

// Enhanced system prompt for intelligent AI chatbot
const ENHANCED_SYSTEM_PROMPT = `You are an expert AI Learning Assistant, designed to help students master programming with personalized guidance. Your role is to:

**Core Capabilities:**
1. **Adaptive Teaching**: Adjust explanations based on user skill level (beginner/intermediate/advanced)
2. **Context-Aware Responses**: Consider user's preferred language and current topic
3. **Interactive Learning**: Provide hands-on examples and practical projects
4. **Progressive Guidance**: Build from basics to advanced concepts
5. **Encouraging Support**: Be patient, supportive, and motivating

**Response Guidelines:**
- Keep explanations clear and engaging
- Include relevant code examples when appropriate
- Provide 2-3 key learning points for each response
- Suggest related topics for further exploration
- Use emojis and formatting to make responses friendly
- Adapt complexity based on user skill level
- Include practical project suggestions when relevant

**Language Expertise:** JavaScript, Python, TypeScript, React, Node.js, Java, C++, Go, Rust, PHP, Ruby, Swift, Kotlin, and more.

**Response Format:**
- Main explanation (clear and engaging)
- Code examples (if applicable)
- Key learning points (bullet points)
- Related topics (for further learning)
- Project suggestions (when relevant)

Always be encouraging and make learning fun!`

// Intelligent response patterns for different scenarios
const RESPONSE_PATTERNS = {
  greeting: {
    beginner: "Welcome to your programming journey! 🚀 I'm here to make learning fun and accessible. What would you like to explore today?",
    intermediate: "Great to see you advancing your skills! 💪 I'm here to help you master more complex concepts. What's your focus today?",
    advanced: "Excellent! You're diving deep into programming mastery! 🎯 I'm here to help you with advanced concepts and optimization. What challenges are you tackling?"
  },
  
  javascript: {
    beginner: "JavaScript is perfect for beginners! 🎯 It's the language of the web and very forgiving. Let's start with the basics and build up your confidence.",
    intermediate: "JavaScript has incredible depth! ⚡ You're ready to explore advanced concepts like closures, promises, and modern ES6+ features.",
    advanced: "JavaScript mastery opens endless possibilities! 🚀 You're ready for advanced patterns, optimization, and cutting-edge frameworks."
  },
  
  react: {
    beginner: "React is amazing for building interfaces! ⚛️ Let's start with components and gradually build your understanding.",
    intermediate: "React's power lies in its ecosystem! 🔧 You're ready to explore hooks, context, and state management patterns.",
    advanced: "React mastery means understanding the entire ecosystem! 🎯 You're ready for advanced patterns, performance optimization, and architecture."
  },
  
  python: {
    beginner: "Python is incredibly beginner-friendly! 🐍 Its clean syntax makes learning programming concepts much easier.",
    intermediate: "Python's versatility is unmatched! 🔧 You're ready to explore web frameworks, data science, and automation.",
    advanced: "Python mastery means understanding its ecosystem deeply! 🚀 You're ready for advanced topics like async programming, optimization, and system design."
  }
}

// Enhanced fallback system with intelligent responses
function generateIntelligentResponse(userMessage: string, userSkillLevel: string, preferredLanguage: string): any {
  const message = userMessage.toLowerCase().trim()
  
  // Greeting patterns
  if (message.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    return {
      response: RESPONSE_PATTERNS.greeting[userSkillLevel as keyof typeof RESPONSE_PATTERNS.greeting] || RESPONSE_PATTERNS.greeting.beginner,
      codeExamples: [],
      relatedTopics: ['JavaScript Basics', 'React Fundamentals', 'Python Introduction', 'Web Development'],
      learningPoints: [
        'Start with small, achievable goals',
        'Practice coding daily, even for 30 minutes',
        'Build projects to apply what you learn',
        'Join communities to learn with others'
      ],
      difficulty: userSkillLevel,
      language: preferredLanguage,
      type: 'text'
    }
  }

  // Language-specific responses
  if (message.includes('javascript') || message.includes('js')) {
    const pattern = RESPONSE_PATTERNS.javascript[userSkillLevel as keyof typeof RESPONSE_PATTERNS.javascript]
    return {
      response: pattern,
      codeExamples: [
        `// JavaScript basics - variables and functions
let greeting = "Hello, World!";
const userName = "Developer";

function welcomeUser(name) {
  return \`Welcome, \${name}! Ready to code?\`;
}

console.log(welcomeUser(userName));`
      ],
      relatedTopics: ['Variables', 'Functions', 'Objects', 'DOM Manipulation', 'ES6 Features'],
      learningPoints: [
        'JavaScript is dynamically typed',
        'Functions are first-class citizens',
        'Modern ES6+ syntax makes code cleaner',
        'DOM manipulation is key for web development'
      ],
      difficulty: userSkillLevel,
      language: 'JavaScript',
      type: 'explanation'
    }
  }

  if (message.includes('react')) {
    const pattern = RESPONSE_PATTERNS.react[userSkillLevel as keyof typeof RESPONSE_PATTERNS.react]
    return {
      response: pattern,
      codeExamples: [
        `// Your first React component
import React from 'react';

function Welcome({ name }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to React development!</p>
    </div>
  );
}

export default Welcome;`
      ],
      relatedTopics: ['Components', 'JSX', 'Props', 'State', 'Event Handling'],
      learningPoints: [
        'React components are reusable UI pieces',
        'JSX combines JavaScript and HTML-like syntax',
        'Props pass data from parent to child components',
        'State manages component data and triggers re-renders'
      ],
      difficulty: userSkillLevel,
      language: 'JavaScript',
      type: 'explanation'
    }
  }

  if (message.includes('python')) {
    const pattern = RESPONSE_PATTERNS.python[userSkillLevel as keyof typeof RESPONSE_PATTERNS.python]
    return {
      response: pattern,
      codeExamples: [
        `# Python basics - clean and readable
def greet_learner(name, topic="programming"):
    return f"Hello {name}! Let's learn {topic} together!"

# List comprehension - Python's elegant feature
numbers = [1, 2, 3, 4, 5]
squares = [n**2 for n in numbers]

print(greet_learner("Developer", "Python"))
print(f"Squares: {squares}")`
      ],
      relatedTopics: ['Python Syntax', 'Data Structures', 'Functions', 'Object-Oriented Programming'],
      learningPoints: [
        'Python emphasizes code readability',
        'Indentation is part of the syntax',
        'Python has extensive standard library',
        'List comprehensions are powerful and concise'
      ],
      difficulty: userSkillLevel,
      language: 'Python',
      type: 'explanation'
    }
  }

  // Learning requests
  if (message.includes('learn') || message.includes('teach') || message.includes('explain')) {
    return {
      response: `I'd love to help you learn! 🎯 

Based on your skill level (${userSkillLevel}), I can guide you through:

**For Beginners:**
• Basic syntax and concepts
• Simple projects to build confidence
• Step-by-step explanations
• Interactive examples

**For Intermediate:**
• Advanced concepts and patterns
• Real-world project examples
• Best practices and optimization
• Framework-specific guidance

**For Advanced:**
• System architecture and design
• Performance optimization
• Advanced patterns and techniques
• Industry best practices

What specific topic would you like to explore?`,
      codeExamples: [],
      relatedTopics: ['Programming Basics', 'Web Development', 'Data Science', 'Mobile Development'],
      learningPoints: [
        'Learning programming is a journey, not a destination',
        'Practice is more important than memorization',
        'Build projects to reinforce learning',
        'Stay curious and keep exploring new technologies'
      ],
      difficulty: userSkillLevel,
      language: preferredLanguage,
      type: 'text'
    }
  }

  // Help requests
  if (message.includes('help') || message.includes('stuck') || message.includes('problem')) {
    return {
      response: `I'm here to help! 💪 Getting stuck is completely normal and actually a sign that you're challenging yourself!

**When you're stuck:**
1. **Break it down** - What exactly isn't working?
2. **Check the basics** - Syntax, variables, logic flow
3. **Use debugging tools** - Console logs, debugger, browser dev tools
4. **Take a break** - Sometimes stepping away helps
5. **Ask for help** - That's what I'm here for!

Can you share more details about what you're working on? The more specific you are, the better I can help!`,
      codeExamples: [],
      relatedTopics: ['Debugging Tips', 'Problem Solving', 'Code Review', 'Best Practices'],
      learningPoints: [
        'Debugging is a crucial programming skill',
        'Console.log() is your friend for debugging',
        'Reading error messages carefully helps solve problems',
        'Breaking problems into smaller parts makes them manageable'
      ],
      difficulty: userSkillLevel,
      language: preferredLanguage,
      type: 'text'
    }
  }

  // Project suggestions
  if (message.includes('project') || message.includes('build') || message.includes('create')) {
    const projects = {
      beginner: [
        'Todo app with local storage',
        'Calculator with basic operations',
        'Simple quiz game',
        'Personal portfolio website',
        'Weather app using APIs'
      ],
      intermediate: [
        'Full-stack blog with CRUD operations',
        'E-commerce product catalog',
        'Real-time chat application',
        'Task management system',
        'Social media clone'
      ],
      advanced: [
        'Microservices architecture',
        'Real-time collaborative editor',
        'Advanced data visualization dashboard',
        'AI-powered recommendation system',
        'Scalable web application'
      ]
    }

    return {
      response: `Great idea to build projects! 🚀 Projects are the best way to learn and showcase your skills.

**Project Ideas for ${userSkillLevel} level:**

${projects[userSkillLevel as keyof typeof projects]?.map(project => `• ${project}`).join('\n')}

**Tips for successful projects:**
• Start small and add features gradually
• Focus on functionality over perfection
• Use version control (Git) from the start
• Document your learning process
• Share your projects with the community

Which type of project interests you most?`,
      codeExamples: [],
      relatedTopics: ['Git Version Control', 'API Integration', 'Database Design', 'User Experience'],
      learningPoints: [
        'Projects help you apply theoretical knowledge',
        'Real-world projects teach you problem-solving',
        'Building projects builds your portfolio',
        'Projects reveal gaps in your knowledge'
      ],
      difficulty: userSkillLevel,
      language: preferredLanguage,
      type: 'suggestion'
    }
  }

  // Default encouraging response
  return {
    response: `I understand you're asking about "${userMessage}". While I'm having some connectivity issues with my main AI service, I'm still here to help! 🤖

I can assist with:
• Programming concepts and explanations
• Code debugging and optimization
• Learning path guidance
• Project suggestions and implementation
• Best practices and industry standards

Could you rephrase your question or let me know what specific programming topic you'd like to explore? I'm excited to help you learn and grow as a developer!`,
    codeExamples: [],
    relatedTopics: ['JavaScript', 'React', 'Python', 'Web Development', 'Programming Concepts'],
    learningPoints: [
      'Programming is a skill that improves with practice',
      'Every expert was once a beginner',
      'Asking questions is a sign of growth',
      'Learning to code opens many opportunities'
    ],
    difficulty: userSkillLevel,
    language: preferredLanguage,
    type: 'text'
  }
}

async function callAI(messages: any[]) {
  const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY
  const baseURL = process.env.DEEPSEEK_API_KEY 
    ? 'https://api.deepseek.com/v1' 
    : 'https://api.openai.com/v1'
  
  if (!apiKey) {
    throw new Error('No AI API key configured')
  }

  const response = await fetch(`${baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-3.5-turbo',
      messages,
      max_tokens: 800,
      temperature: 0.7,
      stream: false,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`AI API error: ${response.status} - ${errorData.error?.message || response.statusText}`)
  }

  return response.json()
}

function extractCodeExamples(content: string): string[] {
  const codeBlocks = content.match(/```[\s\S]*?```/g) || []
  return codeBlocks.map(block => 
    block.replace(/```\w*\n?/, '').replace(/```$/, '').trim()
  )
}

function extractLearningPoints(content: string): string[] {
  // Look for patterns like "Key points:", "Learning points:", etc.
  const pointsSection = content.match(/(?:key points?|learning points?|takeaways?):\s*([^\n]*(?:\n-[^\n]*)*)/i)
  if (pointsSection) {
    const points = pointsSection[1]
      .split(/[,\n-]/)
      .map(point => point.trim())
      .filter(point => point.length > 0 && point.length < 100)
      .slice(0, 4)
    return points
  }
  return []
}

function extractRelatedTopics(content: string): string[] {
  // Look for patterns like "Related topics:", "You might also want to learn:", etc.
  const relatedSection = content.match(/(?:related topics?|you might also|also explore|next steps?):\s*([^\n]*(?:\n-[^\n]*)*)/i)
  if (relatedSection) {
    const topics = relatedSection[1]
      .split(/[,\n-]/)
      .map(topic => topic.trim())
      .filter(topic => topic.length > 0 && topic.length < 50)
      .slice(0, 3)
    return topics
  }
  return []
}

export async function POST(request: NextRequest) {
  let body: ChatbotRequest | null = null

  try {
    body = await request.json()
    const { 
      message, 
      userSkillLevel = 'beginner',
      preferredLanguage = 'JavaScript',
      currentTopic,
      userPreferences,
      conversationHistory = [] 
    } = body

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    console.log('Enhanced AI chatbot request:', {
      message: message.trim(),
      userSkillLevel,
      preferredLanguage,
      currentTopic
    })

    // Build conversation context
    const messages = [
      { role: 'system', content: ENHANCED_SYSTEM_PROMPT },
      ...conversationHistory.slice(-5), // Keep last 5 messages for context
      { role: 'user', content: message.trim() }
    ]

    try {
      const aiResponse = await callAI(messages)
      const responseContent = aiResponse.choices[0]?.message?.content || 'I apologize, but I cannot provide a response right now.'

      // Extract structured data from response
      const codeExamples = extractCodeExamples(responseContent)
      const relatedTopics = extractRelatedTopics(responseContent)
      const learningPoints = extractLearningPoints(responseContent)

      // Clean up the response content
      const cleanContent = responseContent.replace(/```[\s\S]*?```/g, '').trim()

      console.log('Enhanced AI chatbot response generated successfully')

      return NextResponse.json({
        response: cleanContent,
        codeExamples,
        relatedTopics,
        learningPoints,
        difficulty: userSkillLevel,
        language: preferredLanguage,
        type: 'text',
        timestamp: new Date().toISOString()
      })

    } catch (error) {
      console.error('AI API error, using intelligent fallback:', error)
      
      // Use intelligent fallback system
      const fallbackResponse = generateIntelligentResponse(
        message.trim(), 
        userSkillLevel, 
        preferredLanguage
      )

      return NextResponse.json({
        ...fallbackResponse,
        timestamp: new Date().toISOString(),
        fallback: true
      })
    }

  } catch (error: any) {
    console.error('Error in enhanced AI chatbot:', error)

    // Final fallback
    const userMessage = body?.message?.toLowerCase() || ''
    const userSkillLevel = body?.userSkillLevel || 'beginner'
    const preferredLanguage = body?.preferredLanguage || 'JavaScript'

    const response = generateIntelligentResponse(userMessage, userSkillLevel, preferredLanguage)

    return NextResponse.json({
      ...response,
      timestamp: new Date().toISOString(),
      fallback: true
    })
  }
}
