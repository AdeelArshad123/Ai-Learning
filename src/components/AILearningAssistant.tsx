'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaRobot, 
  FaTimes, 
  FaPaperPlane, 
  FaLightbulb,
  FaCode,
  FaQuestionCircle,
  FaBookOpen,
  FaSpinner
} from 'react-icons/fa'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  type?: 'text' | 'code' | 'suggestion'
}

interface AILearningAssistantProps {
  currentTopic?: string
  currentSection?: string
}

export default function AILearningAssistant({ currentTopic, currentSection }: AILearningAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm your AI Learning Assistant 🤖 I can help you with programming questions, explain concepts, debug code, and guide your learning journey. What would you like to learn today?`,
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickSuggestions = [
    { icon: FaCode, text: "Explain this code", topic: "code-help" },
    { icon: FaLightbulb, text: "Learning tips", topic: "study-tips" },
    { icon: FaQuestionCircle, text: "Debug my code", topic: "debugging" },
    { icon: FaBookOpen, text: "Recommend resources", topic: "resources" }
  ]

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response - In production, integrate with OpenAI API
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    const responses = {
      'code-help': `I'd be happy to help explain code! Please share the code snippet you'd like me to explain, and I'll break it down step by step, explaining the syntax, logic, and best practices.`,
      'study-tips': `Here are some effective learning strategies:
      
🎯 **Active Learning**: Practice coding daily, even if just 30 minutes
📚 **Spaced Repetition**: Review concepts regularly to improve retention
🔨 **Build Projects**: Apply what you learn in real projects
👥 **Join Communities**: Engage with other learners and developers
📝 **Document Learning**: Keep notes and create your own explanations`,
      'debugging': `I can help debug your code! Please share:
      
1. **The code** that's not working
2. **Error messages** you're seeing
3. **Expected behavior** vs actual behavior
4. **What you've already tried**

I'll analyze it and provide step-by-step debugging guidance.`,
      'resources': `Based on your current learning path, here are some recommendations:

📚 **For ${currentTopic || 'Programming'}**:
• Interactive coding platforms (CodePen, JSFiddle)
• Documentation and official guides
• YouTube tutorials and coding channels
• GitHub repositories with example projects
• Online coding challenges and practice sites

Would you like specific recommendations for any particular technology?`
    }

    // Context-aware responses based on current section
    if (currentSection === 'trending-languages') {
      return `I see you're exploring trending languages! ${currentTopic ? `Since you're looking at ${currentTopic}, ` : ''}here are some insights:

🚀 **Why learn trending languages?**
• Better job opportunities
• Modern development practices
• Active community support
• Future-proof skills

Would you like me to suggest a learning path for any specific language?`
    }

    if (currentSection === 'resources') {
      return `Great choice exploring learning resources! Here's how to make the most of them:

✅ **Resource Selection Tips**:
• Start with official documentation
• Choose interactive over passive learning
• Mix different resource types (videos, articles, practice)
• Focus on one resource at a time to avoid overwhelm

Need help choosing the right resources for your skill level?`
    }

    // Default intelligent responses based on keywords
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
      return `JavaScript is an excellent choice! 🚀

**Learning Path Suggestion**:
1. **Basics**: Variables, functions, arrays, objects
2. **DOM Manipulation**: Interactive web pages
3. **Async Programming**: Promises, async/await
4. **Frameworks**: React, Vue, or Angular
5. **Backend**: Node.js and Express

Would you like specific resources for any of these topics?`
    }

    if (lowerMessage.includes('python')) {
      return `Python is perfect for beginners! 🐍

**Why Python?**
• Clean, readable syntax
• Versatile (web, data science, AI, automation)
• Huge community and libraries
• Great job market

**Learning Path**:
1. Basic syntax and data structures
2. Object-oriented programming
3. Libraries (requests, pandas, numpy)
4. Web frameworks (Django, Flask)
5. Specialized areas (data science, AI)

What aspect of Python interests you most?`
    }

    if (lowerMessage.includes('react')) {
      return `React is a fantastic choice for modern web development! ⚛️

**React Learning Path**:
1. **Prerequisites**: HTML, CSS, JavaScript ES6+
2. **React Basics**: Components, JSX, props, state
3. **Hooks**: useState, useEffect, custom hooks
4. **State Management**: Context API, Redux
5. **Routing**: React Router
6. **Advanced**: Performance optimization, testing

Currently learning React? I can help with specific concepts or debugging!`
    }

    // Fallback responses
    const fallbackResponses = [
      `That's a great question! Let me help you with that. Could you provide more specific details about what you're trying to learn or accomplish?`,
      `I'd love to help you learn! Can you tell me more about your current skill level and what specific topic you'd like to explore?`,
      `Excellent question! To give you the most helpful answer, could you share more context about what you're working on?`,
      `I'm here to help with your learning journey! What specific programming concept or technology would you like to dive into?`
    ]

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
  }

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(messageText)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again in a moment!",
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes className="w-5 h-5" /> : <FaRobot className="w-5 h-5" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center gap-3">
              <FaRobot className="w-6 h-6" />
              <div>
                <h3 className="font-bold">AI Learning Assistant</h3>
                <p className="text-sm opacity-90">Always here to help you learn!</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                    <FaSpinner className="w-4 h-4 animate-spin text-blue-500" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2 mb-3 overflow-x-auto">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion.text)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap"
                  >
                    <suggestion.icon className="w-3 h-3" />
                    {suggestion.text}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about programming..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isLoading}
                  className="px-3 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
