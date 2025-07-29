import { NextRequest, NextResponse } from 'next/server'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface TutorRequest {
  message: string
  conversationHistory: Message[]
}

// Enhanced system prompt for AI tutor
const TUTOR_SYSTEM_PROMPT = `You are an expert programming tutor and mentor. Your role is to:

1. **Explain concepts clearly**: Break down complex programming topics into digestible parts
2. **Provide practical examples**: Always include relevant code examples when explaining concepts
3. **Encourage learning**: Be supportive and encouraging, adapting to the student's level
4. **Debug and review code**: Help identify issues and suggest improvements
5. **Suggest related topics**: Recommend related concepts to explore further

Guidelines:
- Keep explanations concise but thorough
- Use simple language for beginners, technical terms for advanced users
- Always provide working code examples when relevant
- Suggest 2-3 related topics for further learning
- Be patient and encouraging
- If asked about non-programming topics, gently redirect to programming

Format your responses as:
- Main explanation
- Code example (if applicable)
- Key points or tips
- Related topics to explore

Languages you excel in: JavaScript, Python, TypeScript, React, Node.js, Java, C++, Go, Rust, PHP, Ruby, Swift, Kotlin, and more.`

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
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-3.5-turbo', // Use faster model
      messages,
      max_tokens: 500, // Reduce token limit for faster response
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

// Intelligent fallback system that acts like a conversational AI tutor
function generateIntelligentFallback(userMessage: string) {
  const message = userMessage.toLowerCase().trim()

  // Greeting patterns
  if (message.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    return {
      text: "Hello! 👋 I'm your AI programming tutor. I'm here to help you learn and understand programming concepts. What would you like to learn about today? I can help with JavaScript, React, Python, web development, and much more!",
      codeExamples: [],
      relatedTopics: ['JavaScript Basics', 'React Fundamentals', 'Python Introduction', 'Web Development']
    }
  }

  // Question patterns
  if (message.match(/^(what|how|why|when|where|can you|could you|would you)/)) {
    if (message.includes('closure')) {
      return {
        text: "Great question about closures! 🎯 A closure in JavaScript is when a function 'remembers' variables from its outer scope even after that outer function has finished running. Think of it like a backpack that the inner function carries around with all the variables it needs. This is super useful for creating private variables and function factories. Would you like me to show you a practical example?",
        codeExamples: [
          `function createCounter() {
  let count = 0; // This variable is 'closed over'

  return function() {
    count++; // Inner function can access 'count'
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`
        ],
        relatedTopics: ['Scope', 'Function Factories', 'Private Variables', 'Higher-Order Functions']
      }
    }

    if (message.includes('react') && message.includes('hook')) {
      return {
        text: "Excellent question about React hooks! 🪝 Hooks are special functions that let you 'hook into' React features like state and lifecycle methods from functional components. The most common ones are useState (for managing state) and useEffect (for side effects). They make your code cleaner and more reusable. What specific hook would you like to learn about?",
        codeExamples: [
          `import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`
        ],
        relatedTopics: ['useState', 'useEffect', 'Custom Hooks', 'Component Lifecycle']
      }
    }

    if (message.includes('async') || message.includes('promise')) {
      return {
        text: "Great question about asynchronous JavaScript! ⏰ Async programming lets your code do other things while waiting for slow operations (like API calls) to complete. Think of it like ordering food - you don't just stand there waiting, you can do other things until your order is ready. We use Promises, async/await, or callbacks to handle this. Which approach interests you most?",
        codeExamples: [
          `// Using async/await (modern approach)
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}`
        ],
        relatedTopics: ['Promises', 'Fetch API', 'Error Handling', 'Callbacks']
      }
    }
  }

  // Learning requests
  if (message.includes('learn') || message.includes('teach') || message.includes('explain')) {
    if (message.includes('javascript')) {
      return {
        text: "I'd love to help you learn JavaScript! 🚀 JavaScript is the language of the web - it makes websites interactive and dynamic. We can start with the basics like variables, functions, and objects, or dive into more advanced topics like closures, promises, and modern ES6+ features. What's your current experience level, and what specific area interests you most?",
        codeExamples: [
          `// JavaScript basics - variables and functions
let greeting = "Hello, World!";
const userName = "Developer";

function welcomeUser(name) {
  return \`Welcome, \${name}! Ready to code?\`;
}

console.log(welcomeUser(userName));`
        ],
        relatedTopics: ['Variables', 'Functions', 'Objects', 'DOM Manipulation', 'ES6 Features']
      }
    }

    if (message.includes('react')) {
      return {
        text: "Fantastic choice learning React! ⚛️ React is a powerful library for building user interfaces. It's all about breaking your UI into reusable components and managing state efficiently. We can start with creating your first component, understanding JSX, or explore hooks and state management. What would you like to focus on first?",
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
        relatedTopics: ['Components', 'JSX', 'Props', 'State', 'Event Handling']
      }
    }

    if (message.includes('python')) {
      return {
        text: "Python is an excellent choice for learning programming! 🐍 It's known for its clean, readable syntax that makes it perfect for beginners. Python is used everywhere - web development, data science, AI, automation, and more. We can start with basic syntax, data structures, or jump into specific areas like web frameworks or data analysis. What interests you most?",
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
        relatedTopics: ['Python Syntax', 'Data Structures', 'Functions', 'Object-Oriented Programming']
      }
    }
  }

  // Help requests
  if (message.includes('help') || message.includes('stuck') || message.includes('problem')) {
    return {
      text: "I'm here to help! 💪 Don't worry, getting stuck is a normal part of learning to code - it means you're challenging yourself! Can you tell me more about what you're working on or what specific concept is giving you trouble? The more details you share, the better I can assist you. Remember, every expert was once a beginner!",
      codeExamples: [],
      relatedTopics: ['Debugging Tips', 'Problem Solving', 'Code Review', 'Best Practices']
    }
  }

  // Encouragement for short messages
  if (message.length < 10) {
    const encouragements = [
      "I'm here and ready to help! What programming topic would you like to explore?",
      "Great to see you're learning! What can I help you understand better today?",
      "Ready to code? What programming concept interests you right now?",
      "Let's learn together! What programming question do you have for me?"
    ]
    return {
      text: encouragements[Math.floor(Math.random() * encouragements.length)] + " 🚀",
      codeExamples: [],
      relatedTopics: ['JavaScript', 'React', 'Python', 'Web Development', 'Programming Basics']
    }
  }

  // Default conversational response
  return {
    text: `I understand you're asking about "${userMessage}". While I'm having some connectivity issues with my main AI service, I'm still here to help! 🤖 I can assist with JavaScript, React, Python, web development concepts, debugging, and much more. Could you rephrase your question or let me know what specific programming topic you'd like to explore? I'm excited to help you learn!`,
    codeExamples: [],
    relatedTopics: ['JavaScript', 'React', 'Python', 'Web Development', 'Programming Concepts']
  }
}

export async function POST(request: NextRequest) {
  let body: TutorRequest | null = null

  try {
    body = await request.json()
    const { message, conversationHistory = [] } = body

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Build conversation context
    const messages = [
      { role: 'system', content: TUTOR_SYSTEM_PROMPT },
      ...conversationHistory.slice(-5), // Keep last 5 messages for context
      { role: 'user', content: message.trim() }
    ]

    console.log('Sending request to AI tutor with message:', message.trim())
    console.log('Using intelligent fallback system')

    const aiResponse = await callAI(messages)
    const responseContent = aiResponse.choices[0]?.message?.content || 'I apologize, but I cannot provide a response right now.'

    // Extract code examples and related topics
    const codeExamples = extractCodeExamples(responseContent)
    const relatedTopics = extractRelatedTopics(responseContent)

    // Clean up the response content (remove code blocks since they're extracted separately)
    const cleanContent = responseContent.replace(/```[\s\S]*?```/g, '').trim()

    console.log('AI tutor response generated successfully')

    return NextResponse.json({
      response: cleanContent,
      codeExamples,
      relatedTopics,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Error in AI tutor:', error)

    // Use the message from the already parsed body if available
    const userMessage = body?.message?.toLowerCase() || ''

    // Generate intelligent fallback response
    const response = generateIntelligentFallback(userMessage)

    return NextResponse.json({
      response: response.text,
      codeExamples: response.codeExamples,
      relatedTopics: response.relatedTopics,
      timestamp: new Date().toISOString(),
      fallback: true
    })
  }
}
