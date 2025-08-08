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
  FaSpinner,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVolumeUp,
  FaVolumeMute,
  FaBrain,
  FaGraduationCap,
  FaUsers,
  FaChartLine,
  FaRocket,
  FaStar,
  FaHeart,
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaCopy,
  FaDownload,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa'
import { 
  FiSend, 
  FiUser, 
  FiCode, 
  FiBookOpen, 
  FiHelpCircle, 
  FiX, 
  FiMinimize2, 
  FiMaximize2,
  FiSettings,
  FiMessageSquare,
  FiTrendingUp,
  FiTarget,
  FiZap,
  FiAward,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  codeExamples?: string[]
  relatedTopics?: string[]
  learningPoints?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  language?: string
  type?: 'text' | 'code' | 'explanation' | 'suggestion' | 'error'
  userFeedback?: 'helpful' | 'not-helpful' | null
  isTyping?: boolean
}

interface EnhancedAIChatbotProps {
  isOpen: boolean
  onToggle: () => void
  userSkillLevel?: 'beginner' | 'intermediate' | 'advanced'
  preferredLanguage?: string
  currentTopic?: string
}

const QUICK_ACTIONS = [
  { icon: FaCode, text: "Explain Code", category: "code-help", color: "blue" },
  { icon: FaLightbulb, text: "Learning Tips", category: "study-tips", color: "yellow" },
  { icon: FaQuestionCircle, text: "Debug Code", category: "debugging", color: "red" },
  { icon: FaBookOpen, text: "Resources", category: "resources", color: "green" },
  { icon: FaBrain, text: "AI Concepts", category: "ai-concepts", color: "purple" },
  { icon: FaRocket, text: "Project Ideas", category: "projects", color: "orange" }
]

const LEARNING_PATHS = {
  beginner: [
    "JavaScript Basics",
    "HTML & CSS Fundamentals", 
    "Python Introduction",
    "Web Development Basics"
  ],
  intermediate: [
    "React Development",
    "Node.js Backend",
    "Database Design",
    "API Development"
  ],
  advanced: [
    "System Architecture",
    "Performance Optimization",
    "Security Best Practices",
    "Advanced Algorithms"
  ]
}

export default function EnhancedAIChatbot({ 
  isOpen, 
  onToggle, 
  userSkillLevel = 'beginner',
  preferredLanguage = 'JavaScript',
  currentTopic 
}: EnhancedAIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm your AI Learning Assistant 🤖 

I'm here to help you master programming with personalized guidance. I can:

• Explain complex concepts in simple terms
• Debug your code and suggest improvements  
• Provide hands-on examples and projects
• Recommend learning resources
• Track your progress and adapt to your level

What would you like to learn today?`,
      timestamp: new Date(),
      type: 'text'
    }
  ])
  
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [userPreferences, setUserPreferences] = useState({
    voiceEnabled: false,
    autoRead: false,
    detailedExplanations: true,
    includeCodeExamples: true,
    adaptiveDifficulty: true
  })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }
      
      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  // Voice Synthesis
  const speak = (text: string) => {
    if (!userPreferences.autoRead) return
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      setIsSpeaking(true)
      
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  // Enhanced AI Response Generation
  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/enhanced-ai-chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          userSkillLevel,
          preferredLanguage,
          currentTopic,
          userPreferences,
          conversationHistory: messages.slice(-5)
        })
      })

      if (!response.ok) throw new Error('API request failed')
      
      const data = await response.json()
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        codeExamples: data.codeExamples,
        relatedTopics: data.relatedTopics,
        learningPoints: data.learningPoints,
        difficulty: data.difficulty,
        language: data.language,
        type: data.type || 'text'
      }

      // Auto-read response if enabled
      if (userPreferences.autoRead) {
        speak(data.response)
      }

      return aiMessage
    } catch (error) {
      console.error('AI response error:', error)
      
      // Intelligent fallback response
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: generateFallbackResponse(userMessage),
        timestamp: new Date(),
        type: 'text',
        difficulty: userSkillLevel
      }
    } finally {
      setIsLoading(false)
    }
  }

  const generateFallbackResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
      return `JavaScript is fantastic! 🚀 It's the language of the web and perfect for beginners. 

**Key Concepts to Learn:**
• Variables and data types
• Functions and scope
• DOM manipulation
• Async programming (Promises, async/await)
• Modern ES6+ features

Would you like me to explain any of these concepts in detail?`
    }
    
    if (lowerMessage.includes('react')) {
      return `React is amazing for building user interfaces! ⚛️

**React Learning Path:**
1. **Components** - Building blocks of React apps
2. **Props** - Passing data between components
3. **State** - Managing component data
4. **Hooks** - useState, useEffect, custom hooks
5. **Routing** - Navigation between pages

Ready to build your first React component?`
    }
    
    if (lowerMessage.includes('python')) {
      return `Python is perfect for beginners! 🐍

**Why Python?**
• Clean, readable syntax
• Versatile (web, data science, AI, automation)
• Huge community and libraries
• Great job market

**Start with:**
• Basic syntax and data structures
• Functions and modules
• Object-oriented programming
• Popular libraries (requests, pandas)

What aspect of Python interests you most?`
    }
    
    return `I'd love to help you learn! 🎯 

Could you tell me more about:
• What programming language you're learning?
• What specific concept you're struggling with?
• What type of project you're working on?

I'm here to make your learning journey easier and more enjoyable!`
  }

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputMessage.trim()
    if (!messageText || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    try {
      const aiMessage = await generateAIResponse(messageText)
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleQuickAction = (action: any) => {
    const messages = {
      'code-help': 'I can help explain any code! Please share the code snippet you\'d like me to break down.',
      'study-tips': 'Here are some proven learning strategies:\n\n🎯 **Active Practice**: Code daily, even 30 minutes\n📚 **Spaced Repetition**: Review concepts regularly\n🔨 **Build Projects**: Apply what you learn\n👥 **Join Communities**: Learn with others\n📝 **Document Learning**: Keep notes and explanations',
      'debugging': 'I can help debug your code! Please share:\n\n1. The code that\'s not working\n2. Error messages you\'re seeing\n3. Expected vs actual behavior\n4. What you\'ve already tried',
      'resources': `Based on your level (${userSkillLevel}), here are recommended resources:\n\n📚 **For ${preferredLanguage}**:\n• Official documentation\n• Interactive platforms (CodePen, JSFiddle)\n• YouTube tutorials\n• GitHub example projects\n• Online practice sites`,
      'ai-concepts': 'AI and Machine Learning are fascinating! 🤖\n\n**Key Concepts**:\n• Machine Learning basics\n• Neural Networks\n• Data preprocessing\n• Model training\n• Python libraries (TensorFlow, PyTorch)',
      'projects': 'Great idea to build projects! 🚀\n\n**Project Ideas for ${userSkillLevel}**:\n• Todo app with local storage\n• Weather app with API integration\n• Portfolio website\n• Simple game (Tic-tac-toe, Snake)\n• Blog with CRUD operations'
    }
    
    handleSendMessage(messages[action.category as keyof typeof messages] || action.text)
  }

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return
    
    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const handleUserFeedback = (messageId: string, feedback: 'helpful' | 'not-helpful') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, userFeedback: feedback } : msg
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage()
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className={`fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 ${
        isMinimized ? 'w-80 h-16' : 'w-[450px] h-[700px]'
      } transition-all duration-300`}
    >
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <FaRobot className="text-sm" />
            </div>
            {isSpeaking && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Learning Assistant</h3>
            <p className="text-xs opacity-75">Personalized learning support</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <FiSettings size={16} />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            {isMinimized ? <FiMaximize2 size={16} /> : <FiMinimize2 size={16} />}
          </button>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
              >
                <h4 className="font-semibold mb-3 text-sm">Preferences</h4>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={userPreferences.voiceEnabled}
                      onChange={(e) => setUserPreferences(prev => ({ ...prev, voiceEnabled: e.target.checked }))}
                    />
                    Voice Input
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={userPreferences.autoRead}
                      onChange={(e) => setUserPreferences(prev => ({ ...prev, autoRead: e.target.checked }))}
                    />
                    Auto-read Responses
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={userPreferences.detailedExplanations}
                      onChange={(e) => setUserPreferences(prev => ({ ...prev, detailedExplanations: e.target.checked }))}
                    />
                    Detailed Explanations
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaRobot className="text-white text-sm" />
                  </div>
                )}
                
                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white ml-auto'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {/* Learning Points */}
                    {message.learningPoints && message.learningPoints.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                          Key Learning Points:
                        </p>
                        <ul className="text-xs space-y-1">
                          {message.learningPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <FiCheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Code Examples */}
                  {message.codeExamples && message.codeExamples.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.codeExamples.map((code, index) => (
                        <div key={index} className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs font-mono overflow-x-auto">
                          <pre>{code}</pre>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Related Topics */}
                  {message.relatedTopics && message.relatedTopics.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {message.relatedTopics.map((topic, index) => (
                        <button
                          key={index}
                          onClick={() => handleSendMessage(`Tell me about ${topic}`)}
                          className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* User Feedback */}
                  {message.role === 'assistant' && !message.userFeedback && (
                    <div className="mt-2 flex gap-1">
                      <button
                        onClick={() => handleUserFeedback(message.id, 'helpful')}
                        className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                      >
                        <FaThumbsUp className="w-3 h-3 inline mr-1" />
                        Helpful
                      </button>
                      <button
                        onClick={() => handleUserFeedback(message.id, 'not-helpful')}
                        className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      >
                        <FaThumbsDown className="w-3 h-3 inline mr-1" />
                        Not Helpful
                      </button>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiUser className="text-white text-sm" />
                  </div>
                )}
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaRobot className="text-white text-sm" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick actions to get started:</p>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className={`text-xs px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      action.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30' :
                      action.color === 'yellow' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30' :
                      action.color === 'red' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30' :
                      action.color === 'green' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30' :
                      action.color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30' :
                      'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                    }`}
                  >
                    <action.icon className="w-3 h-3" />
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-2 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {isListening ? <FaMicrophoneSlash size={16} /> : <FaMicrophone size={16} />}
              </button>
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about programming..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiSend size={16} />
              </button>
            </div>
          </form>
        </>
      )}
    </motion.div>
  )
}
